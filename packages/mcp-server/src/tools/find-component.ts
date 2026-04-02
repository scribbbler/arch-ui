import { getComponents } from '../data.js';

export const definition = {
  name: 'find_component',
  description: 'Find components matching a user intent or description. Returns ranked matches.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      intent: { type: 'string', description: 'What you want to accomplish (e.g. "show a loading state", "collect user input").' },
    },
    required: ['intent'],
  },
};

export function handler({ intent }: { intent: string }): object {
  const components = getComponents();
  const terms = intent.toLowerCase().split(/\s+/);

  const scored = Object.values(components).map((manifest) => {
    const searchableText = [
      manifest.name,
      manifest.description,
      manifest.category ?? '',
      ...(manifest.usage?.do ?? []),
    ]
      .join(' ')
      .toLowerCase();

    let score = 0;
    for (const term of terms) {
      if (searchableText.includes(term)) score += 1;
      // Boost for name match
      if (manifest.name.toLowerCase().includes(term)) score += 2;
    }

    return {
      name: manifest.name,
      description: manifest.description,
      category: manifest.category ?? 'uncategorised',
      status: manifest.status ?? 'unknown',
      confidence: Math.min(score / terms.length, 1),
    };
  });

  const matches = scored
    .filter((s) => s.confidence > 0)
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 10);

  if (matches.length === 0) {
    return { matches: [], suggestion: 'No components matched. Try broader terms.' };
  }

  return { matches };
}
