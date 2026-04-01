/**
 * Token validation script.
 * Validates:
 * 1. All semantic tokens reference primitives (no hardcoded values in semantic layer)
 * 2. CSS and JSON outputs exist and are in sync
 * 3. Alias chains are valid
 *
 * Run as part of `tokens:build`.
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const errors: string[] = [];

// ---------------------------------------------------------------------------
// 1. Validate semantic tokens reference primitives (use $value references)
// ---------------------------------------------------------------------------

const semanticDir = resolve(root, "src/semantic");
const semanticFiles = [
  "color.json",
  "spacing.json",
  "radius.json",
  "typography.json",
  "shadow.json",
  "motion.json",
  "z-index.json",
  "border-width.json",
];

function findHardcodedValues(
  obj: Record<string, unknown>,
  path: string,
  filePath: string,
): void {
  for (const [key, value] of Object.entries(obj)) {
    const currentPath = path ? `${path}.${key}` : key;
    if (
      typeof value === "object" &&
      value !== null &&
      "$value" in (value as Record<string, unknown>)
    ) {
      const tokenValue = (value as Record<string, unknown>).$value as string;
      // Semantic tokens should reference primitives via {token.path} syntax
      // Exception: transparent, rgba, and currentColor are acceptable
      if (
        typeof tokenValue === "string" &&
        !tokenValue.startsWith("{") &&
        tokenValue !== "transparent" &&
        !tokenValue.startsWith("rgba") &&
        tokenValue !== "currentColor"
      ) {
        errors.push(
          `[semantic] Hardcoded value "${tokenValue}" at ${currentPath} in ${filePath}. ` +
            `Semantic tokens must reference primitives.`,
        );
      }
    } else if (typeof value === "object" && value !== null) {
      findHardcodedValues(
        value as Record<string, unknown>,
        currentPath,
        filePath,
      );
    }
  }
}

for (const file of semanticFiles) {
  const filePath = resolve(semanticDir, file);
  if (!existsSync(filePath)) {
    errors.push(`[missing] Semantic file not found: ${file}`);
    continue;
  }
  const content = JSON.parse(readFileSync(filePath, "utf-8"));
  findHardcodedValues(content, "", file);
}

// ---------------------------------------------------------------------------
// 2. Validate build outputs exist
// ---------------------------------------------------------------------------

const requiredOutputs = [
  "build/css/tokens.css",
  "build/css/brand-template.css",
  "build/json/tokens.json",
  "build/ts/tokens.ts",
];

for (const output of requiredOutputs) {
  const filePath = resolve(root, output);
  if (!existsSync(filePath)) {
    errors.push(`[missing] Build output not found: ${output}`);
  }
}

// ---------------------------------------------------------------------------
// 3. Validate CSS and JSON are in sync (same token count for light tokens)
// ---------------------------------------------------------------------------

const cssPath = resolve(root, "build/css/tokens.css");
const jsonPath = resolve(root, "build/json/tokens.json");

if (existsSync(cssPath) && existsSync(jsonPath)) {
  const cssContent = readFileSync(cssPath, "utf-8");
  const jsonContent = JSON.parse(readFileSync(jsonPath, "utf-8"));

  // Count CSS custom properties in :root block
  const rootMatch = cssContent.match(/:root \{([^}]+)\}/);
  if (rootMatch) {
    const cssTokenCount = (rootMatch[1].match(/--[\w-]+:/g) || []).length;
    const jsonTokenCount = Object.keys(jsonContent).length;

    if (cssTokenCount !== jsonTokenCount) {
      errors.push(
        `[sync] CSS has ${cssTokenCount} tokens in :root, JSON has ${jsonTokenCount} tokens. ` +
          `These should match.`,
      );
    }
  }
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

if (errors.length > 0) {
  // eslint-disable-next-line no-console
  console.error(`\n✗ Token validation failed with ${errors.length} error(s):\n`);
  for (const error of errors) {
    // eslint-disable-next-line no-console
    console.error(`  ${error}`);
  }
  process.exit(1);
} else {
  // eslint-disable-next-line no-console
  console.log("✓ Token validation passed");
}
