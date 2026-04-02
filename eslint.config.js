import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";
import archPlugin from "./packages/eslint-plugin-arch/src/index.ts";

export default tseslint.config(
  {
    ignores: ["**/dist/", "**/build/", "**/node_modules/", "**/*.d.ts", "**/storybook-static/"],
  },
  js.configs.recommended,
  ...tseslint.configs.strict,
  eslintConfigPrettier,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // Everything error or off — no warnings.
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "no-console": "error",
    },
  },
  // Arch Design System — CSS rules (processed as JS by the arch/css processor)
  {
    files: ["packages/components/src/**/*.css"],
    plugins: { arch: archPlugin },
    processor: "arch/css",
    rules: {
      // Disable TS/JS rules that conflict with the CSS processor wrapper
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-require-imports": "off",
      "no-unused-vars": "off",
      // Arch CSS rules
      "arch/no-hardcoded-values": "error",
      "arch/no-unknown-token": "error",
      "arch/no-physical-properties": "error",
    },
  },
  // Arch Design System — TSX rules
  {
    files: ["packages/components/src/**/*.tsx"],
    plugins: { arch: archPlugin },
    rules: {
      "arch/no-inline-style": "error",
      "arch/no-direct-component-import": "error",
    },
  },
  // Arch Design System — manifest required
  {
    files: ["packages/components/src/*/index.ts"],
    plugins: { arch: archPlugin },
    rules: {
      "arch/manifest-required": "error",
    },
  },
);
