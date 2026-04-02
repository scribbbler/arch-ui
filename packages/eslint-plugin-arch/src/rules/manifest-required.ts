/**
 * arch/manifest-required
 *
 * Every component folder in packages/components/src/ must have a matching
 * ComponentName.manifest.json file.
 */

import type { Rule } from 'eslint';
import { existsSync } from 'node:fs';
import { dirname, basename, join } from 'node:path';

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Require a manifest JSON file for every component.',
    },
    messages: {
      missingManifest:
        'Component {{name}} is missing a manifest file. Create {{name}}.manifest.json before exporting.',
    },
    schema: [],
  },
  create(context) {
    const filename = context.filename ?? context.getFilename();

    // Only check index.ts barrel files in component folders
    if (!filename.endsWith('/index.ts') && !filename.endsWith('\\index.ts')) return {};
    if (!filename.includes('components/src/')) return {};

    const dir = dirname(filename);
    const componentName = basename(dir);
    const manifestPath = join(dir, `${componentName}.manifest.json`);

    if (!existsSync(manifestPath)) {
      return {
        Program(node) {
          context.report({
            node,
            messageId: 'missingManifest',
            data: { name: componentName },
          });
        },
      };
    }

    return {};
  },
};

export default rule;
