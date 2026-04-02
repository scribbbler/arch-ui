/**
 * arch/no-hardcoded-values
 *
 * Disallows hardcoded hex colours, pixel values, and opacity in CSS files.
 * All values must use var(--token-name).
 *
 * Exceptions: 0, 100%, translate/scale/rotate geometric values, currentColor,
 * inherit, initial, unset, none, auto, transparent.
 */

import type { Rule } from 'eslint';

const HEX_COLOR = /#[0-9a-fA-F]{3,8}\b/;
const RGB_HSL = /\b(rgb|rgba|hsl|hsla)\s*\(/;
const PX_VALUE = /\b\d+(\.\d+)?px\b/;
const REM_VALUE = /\b\d+(\.\d+)?rem\b/;
const EM_VALUE = /\b\d+(\.\d+)?em\b/;
const OPACITY_VALUE = /^opacity:\s*0?\.\d+/;

const ALLOWED_VALUES = new Set([
  '0', '0px', '100%', 'none', 'auto', 'inherit', 'initial', 'unset',
  'transparent', 'currentColor', 'currentcolor',
]);

const SKIP_PROPERTIES = new Set([
  'transform', 'translate', 'scale', 'rotate', 'content',
  'animation-name', 'animation', 'transition', 'transition-property',
  'grid-template-columns', 'grid-template-rows', 'grid-area',
  'stroke-dasharray', 'stroke-dashoffset', 'stroke-width',
  'd', 'viewBox', 'points',
]);

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow hardcoded colour, pixel, and opacity values in CSS — use design tokens.',
    },
    messages: {
      hardcodedValue:
        'Hardcoded value "{{value}}" found. Use a design token via var(--token-name) instead.',
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

      // Skip empty lines and selectors
      if (!line.includes(':') || line.endsWith('{') || line.endsWith('}')) continue;

      const colonIndex = line.indexOf(':');
      if (colonIndex === -1) continue;

      const property = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).replace(/;$/, '').trim();

      // Skip properties that use geometric/non-token values
      if (SKIP_PROPERTIES.has(property)) continue;

      // Skip if value is entirely a var() or allowed value
      if (value.startsWith('var(') || ALLOWED_VALUES.has(value)) continue;

      // Check for hardcoded values
      let match: RegExpExecArray | null = null;
      const checks = [
        { pattern: HEX_COLOR, label: 'hex color' },
        { pattern: RGB_HSL, label: 'rgb/hsl color' },
        { pattern: PX_VALUE, label: 'pixel value' },
        { pattern: REM_VALUE, label: 'rem value' },
        { pattern: EM_VALUE, label: 'em value' },
      ];

      for (const check of checks) {
        match = check.pattern.exec(value);
        if (match) {
          context.report({
            loc: { line: i + 1, column: colonIndex + 1 + (match.index ?? 0) },
            messageId: 'hardcodedValue',
            data: { value: match[0] },
          });
        }
      }

      // Check for opacity with raw decimal
      if (OPACITY_VALUE.test(line)) {
        context.report({
          loc: { line: i + 1, column: colonIndex + 1 },
          messageId: 'hardcodedValue',
          data: { value: value },
        });
      }
    }

    return {};
  },
};

export default rule;
