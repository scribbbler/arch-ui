import { getComponents, getTokens } from '../data.js';

export const definition = {
  name: 'list_deprecated',
  description: 'List all deprecated components and tokens with their replacements.',
  inputSchema: {
    type: 'object' as const,
    properties: {},
  },
};

export function handler(): object {
  const components = getComponents();
  const tokens = getTokens();

  const deprecatedComponents = Object.values(components)
    .filter((m) => m.status === 'deprecated')
    .map((m) => ({
      name: m.name,
      description: m.description,
      replacement: (m as Record<string, unknown>).replacedBy ?? null,
    }));

  // Tokens don't currently have a deprecated flag in the JSON output,
  // but we check for it in case it's added later.
  const deprecatedTokens = Object.entries(tokens)
    .filter(([, t]) => (t as Record<string, unknown>).deprecated === true)
    .map(([name, t]) => ({
      name,
      replacement: (t as Record<string, unknown>).replacedBy ?? null,
    }));

  return {
    components: deprecatedComponents,
    tokens: deprecatedTokens,
    total: deprecatedComponents.length + deprecatedTokens.length,
  };
}
