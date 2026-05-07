import StyleDictionary from "style-dictionary";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function tokenToCssVar(token) {
  return `--${token.path.join("-")}`;
}

// ---------------------------------------------------------------------------
// Custom format: flat CSS variables inside :root
// ---------------------------------------------------------------------------

StyleDictionary.registerFormat({
  name: "arch/css-variables",
  format: ({ dictionary }) => {
    return dictionary.allTokens
      .map((token) => `  ${tokenToCssVar(token)}: ${token.$value};`)
      .join("\n");
  },
});

// ---------------------------------------------------------------------------
// Custom format: JSON with alias chain preserved
// ---------------------------------------------------------------------------

StyleDictionary.registerFormat({
  name: "arch/json",
  format: ({ dictionary }) => {
    const output = {};
    for (const token of dictionary.allTokens) {
      const name = token.path.join("-");
      output[name] = {
        $value: token.$value,
        $type: token.$type,
        path: token.path,
      };
      if (token.original && token.original.$value !== token.$value) {
        output[name].original = token.original.$value;
      }
    }
    return JSON.stringify(output, null, 2) + "\n";
  },
});

// ---------------------------------------------------------------------------
// Custom format: TypeScript typed constants
// ---------------------------------------------------------------------------

StyleDictionary.registerFormat({
  name: "arch/typescript",
  format: ({ dictionary }) => {
    let ts = `/**\n * Arch Design System — Generated Token Constants\n * Do not edit manually.\n */\n\n`;
    ts += `export const tokens = {\n`;
    for (const token of dictionary.allTokens) {
      const name = token.path.join("-");
      const camelName = name.replace(/-([a-z0-9])/g, (_, c) =>
        c.toUpperCase(),
      );
      ts += `  "${camelName}": "var(--${name})",\n`;
    }
    ts += `} as const;\n\n`;
    ts += `export type TokenName = keyof typeof tokens;\n`;
    return ts;
  },
});

// ---------------------------------------------------------------------------
// Custom format: Brand template CSS
// ---------------------------------------------------------------------------

StyleDictionary.registerFormat({
  name: "arch/brand-template",
  format: ({ dictionary }) => {
    const semanticTokens = dictionary.allTokens.filter((t) =>
      t.filePath.includes("semantic/"),
    );

    let css = `/**\n * Arch Design System — Brand Template\n *\n * Override these semantic tokens to apply your brand.\n * Import this file AFTER @arch-ui/tokens/css.\n *\n * Usage:\n *   @import "@arch-ui/tokens/css";\n *   @import "./your-brand.css";\n */\n\n`;
    css += `:root {\n`;
    for (const token of semanticTokens) {
      const varName = tokenToCssVar(token);
      css += `  /* ${token.path.join(" > ")} — current: ${token.$value} */\n`;
      css += `  /* ${varName}: ; */\n`;
    }
    css += `}\n`;
    return css;
  },
});

// ---------------------------------------------------------------------------
// Build: Light tokens (primitives + semantic, excluding dark)
// ---------------------------------------------------------------------------

const lightConfig = {
  log: { verbosity: "silent" },
  source: [
    "src/primitive/**/*.json",
    "src/semantic/color.json",
    "src/semantic/spacing.json",
    "src/semantic/radius.json",
    "src/semantic/typography.json",
    "src/semantic/shadow.json",
    "src/semantic/motion.json",
    "src/semantic/z-index.json",
    "src/semantic/border-width.json",
  ],
  platforms: {
    internal: {
      transformGroup: "css",
      buildPath: "build/_internal/",
      files: [
        {
          destination: "light.css",
          format: "arch/css-variables",
        },
      ],
    },
    json: {
      transformGroup: "css",
      buildPath: "build/json/",
      files: [
        {
          destination: "tokens.json",
          format: "arch/json",
        },
      ],
    },
    ts: {
      transformGroup: "css",
      buildPath: "build/ts/",
      files: [
        {
          destination: "tokens.ts",
          format: "arch/typescript",
        },
      ],
    },
    brand: {
      transformGroup: "css",
      buildPath: "build/css/",
      files: [
        {
          destination: "brand-template.css",
          format: "arch/brand-template",
        },
      ],
    },
  },
};

const sdLight = new StyleDictionary(lightConfig);
await sdLight.buildAllPlatforms();

// ---------------------------------------------------------------------------
// Build: Dark tokens (primitives + dark overrides)
// ---------------------------------------------------------------------------

const darkConfig = {
  log: { verbosity: "silent" },
  source: ["src/primitive/**/*.json", "src/semantic/color-dark.json"],
  platforms: {
    internal: {
      transformGroup: "css",
      buildPath: "build/_internal/",
      files: [
        {
          destination: "dark.css",
          format: "arch/css-variables",
        },
      ],
    },
  },
};

const sdDark = new StyleDictionary(darkConfig);
await sdDark.buildAllPlatforms();

// ---------------------------------------------------------------------------
// Assemble final CSS: :root + [data-theme="dark"] + @media reduced-motion
// ---------------------------------------------------------------------------

const lightCSS = readFileSync(
  resolve(__dirname, "build/_internal/light.css"),
  "utf-8",
);
const darkCSS = readFileSync(
  resolve(__dirname, "build/_internal/dark.css"),
  "utf-8",
);

// Filter dark CSS to only include semantic tokens (skip primitives)
const darkLines = darkCSS
  .split("\n")
  .filter(
    (line) =>
      line.includes("--color-background-") ||
      line.includes("--color-text-") ||
      line.includes("--color-action-") ||
      line.includes("--color-border-") ||
      line.includes("--color-feedback-") ||
      line.includes("--color-surface-") ||
      line.includes("--color-icon-"),
  );

// Find motion duration tokens for reduced-motion block
const motionLines = lightCSS
  .split("\n")
  .filter(
    (line) =>
      (line.includes("--motion-duration-") ||
        line.includes("--motion-semantic-duration-")) &&
      !line.includes(": 0ms;"),
  );

let finalCSS = `/**\n * Arch Design System — Generated Tokens\n * Do not edit manually.\n */\n\n`;
finalCSS += `:root {\n${lightCSS}\n}\n`;
finalCSS += `\n[data-theme="dark"],\n.dark {\n${darkLines.join("\n")}\n}\n`;

if (motionLines.length > 0) {
  const reducedMotionLines = motionLines.map((line) =>
    line.replace(/: .+;/, ": 0ms;").replace(/^ {2}/, "    "),
  );
  finalCSS += `\n@media (prefers-reduced-motion: reduce) {\n  :root {\n${reducedMotionLines.join("\n")}\n  }\n}\n`;
}

mkdirSync(resolve(__dirname, "build/css"), { recursive: true });
writeFileSync(resolve(__dirname, "build/css/tokens.css"), finalCSS);

// eslint-disable-next-line no-console
console.log("✓ Token build complete");
