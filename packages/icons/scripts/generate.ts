/**
 * Generates React icon components from Material Design Icons (@mdi/svg).
 * Maps Arch icon names to MDI icon names.
 * Outputs to src/icons/ and regenerates src/index.ts barrel export.
 */

import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const iconsDir = resolve(__dirname, "../src/icons");
const indexPath = resolve(__dirname, "../src/index.ts");

// Find @mdi/svg in node_modules
function findMdiSvgDir(): string {
  const paths = [
    resolve(__dirname, "../node_modules/@mdi/svg/svg"),
    resolve(__dirname, "../../../node_modules/@mdi/svg/svg"),
    resolve(__dirname, "../../../node_modules/.pnpm/@mdi+svg@7.4.47/node_modules/@mdi/svg/svg"),
  ];
  for (const p of paths) {
    try {
      readFileSync(resolve(p, "check.svg"));
      return p;
    } catch { /* try next */ }
  }
  // Glob fallback
  const { execSync } = require("node:child_process");
  const found = execSync(`find ${resolve(__dirname, "../../..")} -path "*/@mdi/svg/svg/check.svg" 2>/dev/null | head -1`, { encoding: "utf-8" }).trim();
  if (found) return dirname(found);
  throw new Error("Could not find @mdi/svg package");
}

// Arch icon name → MDI icon name mapping
const ICON_MAP: Record<string, string> = {
  "alert-triangle": "alert",
  "arrow-down": "arrow-down",
  "arrow-left": "arrow-left",
  "arrow-right": "arrow-right",
  "arrow-up": "arrow-up",
  "bookmark": "bookmark",
  "calendar": "calendar",
  "check-circle": "check-circle",
  "check": "check",
  "chevron-down": "chevron-down",
  "chevron-left": "chevron-left",
  "chevron-right": "chevron-right",
  "chevron-up": "chevron-up",
  "clock": "clock",
  "copy": "content-copy",
  "download": "download",
  "edit": "pencil",
  "external-link": "open-in-new",
  "eye-off": "eye-off",
  "eye": "eye",
  "file": "file-document",
  "filter": "filter",
  "folder": "folder",
  "heart": "heart",
  "image": "image",
  "info": "information",
  "lock": "lock",
  "menu": "menu",
  "minus": "minus",
  "more-horizontal": "dots-horizontal",
  "more-vertical": "dots-vertical",
  "plus": "plus",
  "search": "magnify",
  "settings": "cog",
  "star": "star",
  "trash": "delete",
  "unlock": "lock-open",
  "upload": "upload",
  "user": "account",
  "users": "account-multiple",
  "warning": "alert-circle",
  "x-circle": "close-circle",
  "x": "close",
};

// Icons that should flip in RTL layouts
const RTL_ICONS = new Set([
  "arrow-left",
  "arrow-right",
  "chevron-left",
  "chevron-right",
  "external-link",
]);

function kebabToPascal(str: string): string {
  return str
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function extractSvgPath(svgString: string): string {
  // Extract <path> elements from MDI SVG
  const paths = svgString.match(/<path[^/]*\/>/g);
  if (!paths) return "";
  return paths.join("\n    ");
}

// ─── Main ──────────────────────────────────────────────────────────────────────

const mdiSvgDir = findMdiSvgDir();

// Clean and recreate output directory
rmSync(iconsDir, { recursive: true, force: true });
mkdirSync(iconsDir, { recursive: true });

const exports: string[] = [];

for (const [archName, mdiName] of Object.entries(ICON_MAP)) {
  const componentName = kebabToPascal(archName) + "Icon";
  const isRtl = RTL_ICONS.has(archName);

  const svgPath = resolve(mdiSvgDir, `${mdiName}.svg`);
  const svgContent = readFileSync(svgPath, "utf-8");
  const pathElements = extractSvgPath(svgContent);

  const component = `import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const ${componentName} = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref}${isRtl ? " rtl" : ""} {...props}>
    ${pathElements}
  </Icon>
));

${componentName}.displayName = "${componentName}";

export { ${componentName} };
`;

  writeFileSync(resolve(iconsDir, `${componentName}.tsx`), component);
  exports.push(
    `export { ${componentName} } from "./icons/${componentName}";`,
  );
}

// Generate barrel export
const indexContent = `// @arch-ui/icons — auto-generated from Material Design Icons (@mdi/svg)
// Do not edit manually. Run "pnpm generate" to regenerate.

export { Icon, type IconProps, type IconSize } from "./Icon";
${exports.sort().join("\n")}
`;

writeFileSync(indexPath, indexContent);

// eslint-disable-next-line no-console
console.log(`✓ Generated ${Object.keys(ICON_MAP).length} icon components from MDI`);
