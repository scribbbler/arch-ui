import { getTokens } from '../data.js';

export const definition = {
  name: 'list_tokens',
  description: 'List all design tokens, optionally filtered by category.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      category: { type: 'string', description: 'Filter by category (e.g. "color", "spacing", "typography", "shadow", "radius", "motion", "border", "z").' },
    },
  },
};

export function handler({ category }: { category?: string }): object {
  const tokens = getTokens();
  let entries = Object.entries(tokens).map(([name, token]) => ({
    name,
    value: token.$value,
    type: token.$type,
    cssVariable: `var(--${name})`,
  }));

  if (category) {
    const cat = category.toLowerCase();
    entries = entries.filter((e) => e.name.startsWith(cat));
  }

  return { count: entries.length, tokens: entries };
}
