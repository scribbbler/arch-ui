import { getTokens, levenshtein } from '../data.js';

export const definition = {
  name: 'get_token',
  description: 'Get the resolved value, type, and alias origin for a design token.',
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

  if (token) {
    return {
      name: key,
      value: token.$value,
      type: token.$type,
      cssVariable: `var(--${key})`,
      ...(token.original ? { rawValue: token.original } : {}),
    };
  }

  // Find closest matches
  const allNames = Object.keys(tokens);
  const ranked = allNames
    .map((n) => ({ name: n, distance: levenshtein(key, n) }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 5);

  return {
    error: `Token "${name}" not found.`,
    suggestion: `Did you mean: ${ranked.map((r) => r.name).join(', ')}?`,
  };
}
