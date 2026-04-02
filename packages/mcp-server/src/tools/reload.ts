import { loadAll } from '../data.js';

export const definition = {
  name: 'reload',
  description: 'Reload all token and component data from disk. Use during development after rebuilding tokens or modifying manifests.',
  inputSchema: {
    type: 'object' as const,
    properties: {},
  },
};

export function handler(): object {
  loadAll();
  return { success: true, message: 'All data reloaded from disk.' };
}
