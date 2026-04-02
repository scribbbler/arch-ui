import { getComponents } from '../data.js';

export const definition = {
  name: 'list_components',
  description: 'List all components, optionally filtered by category or status.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      category: { type: 'string', description: 'Filter by category (e.g. "layout", "form", "feedback").' },
      status: { type: 'string', description: 'Filter by status (e.g. "stable", "beta", "deprecated").' },
    },
  },
};

export function handler({ category, status }: { category?: string; status?: string }): object {
  const components = getComponents();
  let list = Object.values(components).map((m) => ({
    name: m.name,
    description: m.description,
    category: m.category ?? 'uncategorised',
    status: m.status ?? 'unknown',
  }));

  if (category) {
    const cat = category.toLowerCase();
    list = list.filter((c) => c.category.toLowerCase() === cat);
  }

  if (status) {
    const s = status.toLowerCase();
    list = list.filter((c) => c.status.toLowerCase() === s);
  }

  list.sort((a, b) => a.name.localeCompare(b.name));

  return { count: list.length, components: list };
}
