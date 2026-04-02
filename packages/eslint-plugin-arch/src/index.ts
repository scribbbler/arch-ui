/**
 * eslint-plugin-arch — Custom ESLint rules for the Arch Design System.
 *
 * CSS rules (no-hardcoded-values, no-unknown-token, no-physical-properties)
 * require a CSS processor to make CSS files lintable by ESLint. The processor
 * wraps CSS content in a tagged template literal so ESLint can parse it.
 */

import noHardcodedValues from './rules/no-hardcoded-values.ts';
import noUnknownToken from './rules/no-unknown-token.ts';
import manifestRequired from './rules/manifest-required.ts';
import noDirectComponentImport from './rules/no-direct-component-import.ts';
import noInlineStyle from './rules/no-inline-style.ts';
import noPhysicalProperties from './rules/no-physical-properties.ts';

const plugin = {
  meta: {
    name: 'eslint-plugin-arch',
    version: '0.1.0',
  },
  rules: {
    'no-hardcoded-values': noHardcodedValues,
    'no-unknown-token': noUnknownToken,
    'manifest-required': manifestRequired,
    'no-direct-component-import': noDirectComponentImport,
    'no-inline-style': noInlineStyle,
    'no-physical-properties': noPhysicalProperties,
  },
  processors: {
    /**
     * CSS processor — wraps CSS text as a JS module so ESLint can lint it.
     * CSS rules read the raw text from sourceCode.getText() and do their
     * own parsing.
     */
    css: {
      preprocess(text: string) {
        // Wrap CSS in a template literal to make it valid JS
        const escaped = text.replace(/\\/g, '\\\\').replace(/`/g, '\\`');
        return [`const css = \`${escaped}\`;`];
      },
      postprocess(messages: Array<Array<{ line: number; column: number; message: string }>>) {
        return messages[0] ?? [];
      },
      supportsAutofix: false,
    },
  },
};

export default plugin;
