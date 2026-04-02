import { getTokens } from '../data.js';

export const definition = {
  name: 'get_token_alias_chain',
  description: 'Trace the full alias chain for a token: component token → semantic token → primitive token → resolved value.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      name: { type: 'string', description: 'Token name (e.g. "color-background-default").' },
    },
    required: ['name'],
  },
};

export function handler({ name }: { name: string }): object {
  const tokens = getTokens();
  const key = name.toLowerCase().replace(/^--/, '');
  const token = tokens[key];

  if (!token) {
    return { error: `Token "${name}" not found.` };
  }

  const chain: Array<{ name: string; value: string; layer: string }> = [];

  chain.push({
    name: key,
    value: token.original ?? token.$value,
    layer: inferLayer(key),
  });

  // Walk the alias chain
  if (token.original) {
    const refName = resolveRef(token.original);
    if (refName) {
      const refToken = tokens[refName];
      if (refToken) {
        chain.push({
          name: refName,
          value: refToken.original ?? refToken.$value,
          layer: inferLayer(refName),
        });

        // One more level if aliased
        if (refToken.original) {
          const deepRef = resolveRef(refToken.original);
          if (deepRef) {
            const deepToken = tokens[deepRef];
            if (deepToken) {
              chain.push({
                name: deepRef,
                value: deepToken.$value,
                layer: inferLayer(deepRef),
              });
            }
          }
        }
      }
    }
  }

  // Final resolved value
  chain.push({
    name: key,
    value: token.$value,
    layer: 'resolved',
  });

  return {
    token: key,
    type: token.$type,
    resolvedValue: token.$value,
    cssVariable: `var(--${key})`,
    chain,
  };
}

function resolveRef(ref: string): string | null {
  // Convert "{color.gray.50}" to "color-gray-50"
  const match = ref.match(/^\{(.+)\}$/);
  if (!match) return null;
  return match[1].replace(/\./g, '-');
}

function inferLayer(name: string): string {
  // Semantic tokens use intent-based names
  const semanticPrefixes = [
    'color-background', 'color-text', 'color-action', 'color-border',
    'color-feedback', 'color-surface', 'color-icon',
    'spacing-component', 'spacing-layout', 'spacing-inline',
    'shadow-component', 'shadow-overlay',
    'radius-component',
    'motion-semantic',
    'border-width-default', 'border-width-strong',
    'z-semantic',
    'typography-scale', 'typography-weight',
  ];

  for (const prefix of semanticPrefixes) {
    if (name.startsWith(prefix)) return 'semantic';
  }

  return 'primitive';
}
