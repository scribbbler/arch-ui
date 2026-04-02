/**
 * arch/no-direct-component-import
 *
 * Disallows imports from inside another component's folder — must use the
 * barrel export (index.ts) instead.
 */

import type { Rule } from 'eslint';
import { basename, dirname } from 'node:path';

const COMPONENT_PATH_PATTERN = /\.\.\/([A-Z][a-zA-Z]+)\/[A-Z]/;

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow direct imports from another component folder — use the barrel export.',
    },
    messages: {
      directImport:
        'Direct import from {{component}} folder. Import from the barrel index instead: import { ... } from \'../{{component}}\'',
    },
    schema: [],
  },
  create(context) {
    const filename = context.filename ?? context.getFilename();
    if (!filename.includes('components/src/')) return {};

    function checkImport(node: Rule.Node & { source?: { value?: string } }) {
      const source = node.source?.value;
      if (typeof source !== 'string') return;

      const match = COMPONENT_PATH_PATTERN.exec(source);
      if (match) {
        const currentDir = basename(dirname(filename));
        const importedComponent = match[1];

        // Allow imports within the same component folder
        if (currentDir === importedComponent) return;

        context.report({
          node,
          messageId: 'directImport',
          data: { component: importedComponent },
        });
      }
    }

    return {
      ImportDeclaration: checkImport,
    };
  },
};

export default rule;
