/**
 * Generates React icon components from SVG files in src/svg/.
 * Outputs to src/icons/ and regenerates src/index.ts barrel export.
 */

import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "node:fs";
import { resolve, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const svgDir = resolve(__dirname, "../src/svg");
const iconsDir = resolve(__dirname, "../src/icons");
const indexPath = resolve(__dirname, "../src/index.ts");

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

function extractSvgContent(svgString: string): string {
  // Extract the inner content between <svg> tags
  const match = svgString.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
  return match ? match[1].trim() : "";
}

function svgAttrToJsx(content: string): string {
  return content
    .replace(/stroke-width=/g, "strokeWidth=")
    .replace(/stroke-linecap=/g, "strokeLinecap=")
    .replace(/stroke-linejoin=/g, "strokeLinejoin=")
    .replace(/fill-rule=/g, "fillRule=")
    .replace(/clip-rule=/g, "clipRule=")
    .replace(/stroke-dasharray=/g, "strokeDasharray=")
    .replace(/stroke-dashoffset=/g, "strokeDashoffset=");
}

// Ensure output directory exists
mkdirSync(iconsDir, { recursive: true });

const svgFiles = readdirSync(svgDir).filter((f) => f.endsWith(".svg"));
const exports: string[] = [];

for (const file of svgFiles) {
  const iconName = basename(file, ".svg");
  const componentName = kebabToPascal(iconName) + "Icon";
  const isRtl = RTL_ICONS.has(iconName);

  const svgContent = readFileSync(resolve(svgDir, file), "utf-8");
  const innerContent = svgAttrToJsx(extractSvgContent(svgContent));

  const component = `import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const ${componentName} = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref}${isRtl ? " rtl" : ""} {...props}>
    ${innerContent}
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
const indexContent = `// @arch-ui/icons — auto-generated barrel export
// Do not edit manually. Run "pnpm generate" to regenerate.

export { Icon, type IconProps, type IconSize } from "./Icon";
${exports.sort().join("\n")}
`;

writeFileSync(indexPath, indexContent);

// eslint-disable-next-line no-console
console.log(`✓ Generated ${svgFiles.length} icon components`);
