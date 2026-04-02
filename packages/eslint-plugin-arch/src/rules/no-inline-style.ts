/**
 * arch/no-inline-style
 *
 * Disallows the `style` prop with object literal values on JSX elements.
 * Allows `style={style}` where style is a variable (passthrough from props).
 */

import type { Rule } from 'eslint';

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow inline style={{}} object literals — use CSS classes and tokens.',
    },
    messages: {
      inlineStyle:
        'Inline style object literal is not allowed. Use CSS classes with design tokens instead.',
    },
    schema: [],
  },
  create(context) {
    const filename = context.filename ?? context.getFilename();
    if (!filename.endsWith('.tsx') && !filename.endsWith('.jsx')) return {};
    if (!filename.includes('components/src/')) return {};

    return {
      JSXAttribute(node: Rule.Node & { name?: { name?: string }; value?: { type?: string; expression?: { type?: string } } }) {
        if (node.name?.name !== 'style') return;

        const value = node.value;
        if (!value) return;

        // style={expr} — check if expr is an object literal
        if (
          value.type === 'JSXExpressionContainer' &&
          value.expression?.type === 'ObjectExpression'
        ) {
          context.report({
            node,
            messageId: 'inlineStyle',
          });
        }
      },
    };
  },
};

export default rule;
