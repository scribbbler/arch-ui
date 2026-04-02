import { getComponents } from '../data.js';

export const definition = {
  name: 'validate_usage',
  description: 'Validate component prop usage against the manifest. Reports errors for invalid props and warnings for missing recommended props.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      component: { type: 'string', description: 'Component name.' },
      props: {
        type: 'object',
        description: 'Object of prop names and their values to validate.',
        additionalProperties: true,
      },
    },
    required: ['component', 'props'],
  },
};

export function handler({ component, props }: { component: string; props: Record<string, unknown> }): object {
  const components = getComponents();
  const key = component.toLowerCase();
  const manifest = components[key];

  if (!manifest) {
    return { valid: false, errors: [`Component "${component}" not found.`], warnings: [] };
  }

  const manifestProps = manifest.props ?? {};
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check for unknown props
  for (const propName of Object.keys(props)) {
    if (propName === 'children' || propName === 'className' || propName === 'ref' || propName === 'labels') {
      continue; // Always allowed
    }
    if (propName.startsWith('aria-') || propName.startsWith('data-')) {
      continue; // HTML attributes always allowed
    }
    if (!manifestProps[propName]) {
      errors.push(`Unknown prop "${propName}" on ${manifest.name}.`);
    }
  }

  // Check prop value types where possible
  for (const [propName, propValue] of Object.entries(props)) {
    const spec = manifestProps[propName];
    if (!spec) continue;

    // Check union types (e.g. "'sm' | 'md' | 'lg'")
    const unionMatch = spec.type.match(/^'([^']+)'(?:\s*\|\s*'([^']+)')+$/);
    if (unionMatch && typeof propValue === 'string') {
      const allowed = spec.type
        .split('|')
        .map((s: string) => s.trim().replace(/^'|'$/g, ''));
      if (!allowed.includes(propValue)) {
        errors.push(
          `Invalid value "${propValue}" for prop "${propName}" on ${manifest.name}. Allowed: ${allowed.join(', ')}.`,
        );
      }
    }
  }

  // Warn about required props not provided
  for (const [propName, spec] of Object.entries(manifestProps)) {
    if (
      (spec as { required?: boolean }).required &&
      !(propName in props)
    ) {
      warnings.push(`Required prop "${propName}" is missing on ${manifest.name}.`);
    }
  }

  return { valid: errors.length === 0, errors, warnings };
}
