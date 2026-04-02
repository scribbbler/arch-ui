/**
 * arch/no-physical-properties
 *
 * Disallows directional CSS properties (left, right, top, bottom when used
 * in margin/padding/border/inset context) — use logical properties instead.
 */

import type { Rule } from 'eslint';

const PHYSICAL_TO_LOGICAL: Record<string, string> = {
  'margin-left': 'margin-inline-start',
  'margin-right': 'margin-inline-end',
  'margin-top': 'margin-block-start',
  'margin-bottom': 'margin-block-end',
  'padding-left': 'padding-inline-start',
  'padding-right': 'padding-inline-end',
  'padding-top': 'padding-block-start',
  'padding-bottom': 'padding-block-end',
  'border-left': 'border-inline-start',
  'border-right': 'border-inline-end',
  'border-top': 'border-block-start',
  'border-bottom': 'border-block-end',
  'border-left-width': 'border-inline-start-width',
  'border-right-width': 'border-inline-end-width',
  'border-top-width': 'border-block-start-width',
  'border-bottom-width': 'border-block-end-width',
  'border-left-color': 'border-inline-start-color',
  'border-right-color': 'border-inline-end-color',
  'border-left-style': 'border-inline-start-style',
  'border-right-style': 'border-inline-end-style',
  'border-top-left-radius': 'border-start-start-radius',
  'border-top-right-radius': 'border-start-end-radius',
  'border-bottom-left-radius': 'border-end-start-radius',
  'border-bottom-right-radius': 'border-end-end-radius',
  'left': 'inset-inline-start',
  'right': 'inset-inline-end',
  'top': 'inset-block-start',
  'bottom': 'inset-block-end',
  'text-align: left': 'text-align: start',
  'text-align: right': 'text-align: end',
  'float: left': 'float: inline-start',
  'float: right': 'float: inline-end',
  // width/height are not flagged — they are too broadly used and not
  // strictly directional. Only margin/padding/border/inset are enforced.
};

const PHYSICAL_PROPERTIES = new Set(Object.keys(PHYSICAL_TO_LOGICAL));

const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow physical directional CSS properties — use logical properties for RTL support.',
    },
    messages: {
      physicalProperty:
        'Physical property "{{property}}" found. Use "{{logical}}" instead for RTL support.',
    },
    schema: [],
  },
  create(context) {
    const filename = context.filename ?? context.getFilename();
    if (!filename.endsWith('.css')) return {};

    const sourceCode = context.sourceCode ?? context.getSourceCode();
    const text = sourceCode.getText();
    const lines = text.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Skip comments
      if (line.startsWith('/*') || line.startsWith('*') || line.startsWith('//')) continue;
      if (!line.includes(':') || line.endsWith('{') || line.endsWith('}')) continue;

      const colonIndex = line.indexOf(':');
      if (colonIndex === -1) continue;

      const property = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).replace(/;$/, '').trim();

      // Check property name
      if (PHYSICAL_PROPERTIES.has(property)) {
        const logical = PHYSICAL_TO_LOGICAL[property];
        context.report({
          loc: { line: i + 1, column: 0 },
          messageId: 'physicalProperty',
          data: { property, logical },
        });
        continue;
      }

      // Check property: value combinations (text-align: left, float: left)
      const fullDecl = `${property}: ${value}`;
      if (PHYSICAL_PROPERTIES.has(fullDecl)) {
        const logical = PHYSICAL_TO_LOGICAL[fullDecl];
        context.report({
          loc: { line: i + 1, column: 0 },
          messageId: 'physicalProperty',
          data: { property: fullDecl, logical },
        });
      }
    }

    return {};
  },
};

export default rule;
