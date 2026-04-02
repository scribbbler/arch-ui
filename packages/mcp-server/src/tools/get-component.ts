import { getComponents, levenshtein } from '../data.js';

export const definition = {
  name: 'get_component',
  description: 'Get the complete manifest and usage example for a component by name.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      name: { type: 'string', description: 'Component name (case-insensitive).' },
    },
    required: ['name'],
  },
};

export function handler({ name }: { name: string }): object {
  const components = getComponents();
  const key = name.toLowerCase();
  const manifest = components[key];

  if (manifest) {
    const example = generateExample(manifest);
    return { ...manifest, example };
  }

  // Find closest matches by Levenshtein distance
  const allNames = Object.values(components).map((c) => c.name);
  const ranked = allNames
    .map((n) => ({ name: n, distance: levenshtein(key, n.toLowerCase()) }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 5);

  return {
    error: `Component "${name}" not found.`,
    suggestion: `Did you mean: ${ranked.map((r) => r.name).join(', ')}?`,
  };
}

function generateExample(manifest: { name: string; props?: Record<string, { type: string; default?: string; description: string }> }): string {
  const { name, props } = manifest;

  const requiredProps = props
    ? Object.entries(props)
        .filter(([, p]) => !p.default && p.type !== 'ReactNode')
        .map(([propName, p]) => {
          if (p.type.includes('string')) return `${propName}="example"`;
          if (p.type.includes('number')) return `${propName}={1}`;
          if (p.type.includes('boolean')) return propName;
          if (p.type.includes('=>')) return `${propName}={() => {}}`;
          return `${propName}={/* ${p.type} */}`;
        })
    : [];

  const propsStr = requiredProps.length > 0 ? ' ' + requiredProps.join(' ') : '';
  return `<${name}${propsStr}>Content</${name}>`;
}
