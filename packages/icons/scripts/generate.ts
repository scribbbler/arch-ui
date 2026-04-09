/**
 * Generates React icon components from Material Design Icons (@mdi/svg).
 * Uses MDI names directly — no custom mapping.
 * Outputs to src/icons/ and regenerates src/index.ts barrel export.
 */

import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync } from "node:fs";
import { resolve, dirname, basename } from "node:path";
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

// ~400 most commonly used Material Design Icons (MDI names)
const ICONS: string[] = [
  // Navigation
  "arrow-up", "arrow-down", "arrow-left", "arrow-right",
  "arrow-up-bold", "arrow-down-bold", "arrow-left-bold", "arrow-right-bold",
  "arrow-top-left", "arrow-top-right", "arrow-bottom-left", "arrow-bottom-right",
  "arrow-collapse", "arrow-expand", "arrow-expand-all",
  "chevron-up", "chevron-down", "chevron-left", "chevron-right",
  "chevron-double-up", "chevron-double-down", "chevron-double-left", "chevron-double-right",
  "menu", "menu-down", "menu-up", "menu-right", "menu-left",
  "dots-horizontal", "dots-vertical",
  "open-in-new", "subdirectory-arrow-left", "subdirectory-arrow-right",
  "swap-horizontal", "swap-vertical", "unfold-more-horizontal", "unfold-less-horizontal",
  "undo", "redo",

  // Actions
  "plus", "minus", "close", "check", "check-all",
  "pencil", "pencil-outline", "delete", "delete-outline",
  "content-copy", "content-cut", "content-paste", "content-save", "content-save-outline",
  "download", "upload", "import", "export-variant",
  "share", "share-variant", "share-outline",
  "send", "send-outline",
  "magnify", "magnify-plus", "magnify-minus",
  "refresh", "reload", "sync",
  "play", "pause", "stop", "skip-next", "skip-previous",
  "fast-forward", "rewind", "record",
  "volume-high", "volume-medium", "volume-low", "volume-off", "volume-mute",
  "fullscreen", "fullscreen-exit",
  "drag", "drag-horizontal", "drag-vertical",
  "sort-ascending", "sort-descending", "sort-variant",
  "filter", "filter-outline", "filter-variant",
  "tune", "tune-vertical",
  "pin", "pin-off", "pin-outline",
  "power", "power-off",
  "printer",
  "backup-restore", "history",

  // Status & Feedback
  "check-circle", "check-circle-outline",
  "close-circle", "close-circle-outline",
  "alert", "alert-outline", "alert-circle", "alert-circle-outline",
  "information", "information-outline",
  "help-circle", "help-circle-outline",
  "minus-circle", "minus-circle-outline",
  "plus-circle", "plus-circle-outline",
  "check-decagram",
  "progress-check", "progress-clock", "progress-alert",
  "loading", "timer-sand",
  "circle", "circle-outline", "circle-half-full",
  "checkbox-marked", "checkbox-blank-outline", "checkbox-intermediate",
  "radiobox-marked", "radiobox-blank",
  "toggle-switch", "toggle-switch-off",
  "thumb-up", "thumb-up-outline", "thumb-down", "thumb-down-outline",
  "flag", "flag-outline",

  // Objects & Content
  "file-document", "file-document-outline",
  "file-pdf-box", "file-image", "file-video", "file-music",
  "file-multiple", "file-plus", "file-remove",
  "folder", "folder-open", "folder-plus", "folder-remove", "folder-outline",
  "image", "image-outline", "image-multiple", "image-off",
  "camera", "camera-outline",
  "video", "video-outline", "video-off",
  "microphone", "microphone-off", "microphone-outline",
  "headphones",
  "book", "book-open-variant", "book-outline",
  "notebook", "notebook-outline",
  "bookmark", "bookmark-outline", "bookmark-plus", "bookmark-remove",
  "tag", "tag-outline", "tag-multiple", "tag-plus",
  "label", "label-outline",
  "link", "link-off", "link-variant",
  "attachment",
  "paperclip",
  "calendar", "calendar-blank", "calendar-today", "calendar-month", "calendar-range", "calendar-clock",
  "clock", "clock-outline", "clock-alert",
  "timer", "timer-outline",
  "alarm", "alarm-off",
  "map", "map-marker", "map-marker-outline", "map-outline",
  "earth", "web",
  "compass", "compass-outline",
  "navigation",
  "crosshairs", "crosshairs-gps",

  // People & Social
  "account", "account-outline", "account-circle", "account-circle-outline",
  "account-plus", "account-minus", "account-remove", "account-edit",
  "account-group", "account-multiple", "account-multiple-outline",
  "account-supervisor", "account-box", "account-box-outline",
  "face-man", "face-woman",
  "human", "human-male", "human-female",
  "emoticon", "emoticon-outline", "emoticon-happy", "emoticon-sad",
  "chat", "chat-outline", "chat-processing",
  "message", "message-outline", "message-text", "message-text-outline",
  "comment", "comment-outline", "comment-text", "comment-text-outline",
  "forum", "forum-outline",
  "phone", "phone-outline", "phone-in-talk",
  "email", "email-outline", "email-open",
  "bell", "bell-outline", "bell-off", "bell-ring",
  "heart", "heart-outline", "heart-off",
  "star", "star-outline", "star-half-full",

  // Interface & Layout
  "cog", "cog-outline",
  "wrench", "wrench-outline",
  "hammer", "tools",
  "palette", "palette-outline",
  "format-paint", "brush",
  "eye", "eye-off", "eye-outline", "eye-off-outline",
  "lock", "lock-open", "lock-outline", "lock-open-outline",
  "shield", "shield-outline", "shield-check", "shield-lock",
  "key", "key-variant",
  "login", "logout",
  "door-open", "door-closed",
  "home", "home-outline", "home-variant",
  "office-building", "store", "store-outline",
  "table", "table-large", "table-row",
  "view-grid", "view-grid-outline", "view-list", "view-module",
  "view-dashboard", "view-dashboard-outline",
  "apps", "grid",
  "window-maximize", "window-minimize", "window-restore", "window-close",
  "dock-window", "dock-bottom",
  "layers", "layers-outline",
  "crop", "crop-free",
  "aspect-ratio",
  "resize",
  "format-align-left", "format-align-center", "format-align-right", "format-align-justify",
  "format-bold", "format-italic", "format-underline", "format-strikethrough",
  "format-list-bulleted", "format-list-numbered", "format-list-checks",
  "format-quote-close", "format-header-1", "format-header-2", "format-header-3",
  "code-tags", "code-braces", "code-brackets",
  "console", "console-line",

  // Devices & Hardware
  "cellphone", "cellphone-link",
  "tablet", "laptop", "monitor", "desktop-classic",
  "keyboard", "mouse",
  "bluetooth", "wifi", "wifi-off",
  "signal", "signal-off",
  "battery", "battery-outline", "battery-charging",
  "flash", "flash-off", "flash-outline",
  "lightbulb", "lightbulb-outline", "lightbulb-on",
  "usb",
  "sd", "sim",
  "server", "database", "cloud", "cloud-outline", "cloud-upload", "cloud-download",

  // Commerce & Finance
  "cart", "cart-outline", "cart-plus", "cart-remove",
  "basket", "basket-outline",
  "cash", "cash-multiple",
  "credit-card", "credit-card-outline",
  "wallet", "wallet-outline",
  "currency-usd", "currency-eur",
  "receipt", "receipt-outline",
  "gift", "gift-outline",
  "trophy", "trophy-outline",
  "medal",
  "percent",
  "sale", "tag-text",

  // Misc
  "weather-sunny", "weather-night", "weather-cloudy",
  "theme-light-dark",
  "brightness-6", "brightness-4",
  "translate",
  "airplane", "car", "bus", "train", "bike",
  "walk", "run",
  "food", "food-apple", "coffee",
  "hospital-box", "medical-bag",
  "school", "library",
  "music", "music-note",
  "gamepad-variant",
  "puzzle", "puzzle-outline",
  "bulkhead-light",
  "lifebuoy",
  "fire",
  "water", "water-outline",
  "leaf", "flower", "tree",
  "paw",
  "bug", "bug-outline",
  "rocket", "rocket-launch",
  "telescope",
  "test-tube",
  "flask", "flask-outline",
  "atom",
  "dna",
  "infinity",
  "math-compass",
  "chart-bar", "chart-line", "chart-pie", "chart-arc", "chart-donut",
  "poll",
  "trending-up", "trending-down", "trending-neutral",
  "clipboard", "clipboard-outline", "clipboard-text", "clipboard-check",
  "note", "note-outline", "note-text",
  "square", "square-outline", "square-rounded", "square-rounded-outline",
  "circle-small", "circle-medium",
  "rhombus", "rhombus-outline",
  "triangle", "triangle-outline",
  "hexagon", "hexagon-outline",
  "octagon", "octagon-outline",
  "star-four-points", "star-four-points-outline",
];

// Icons that should flip in RTL layouts
const RTL_ICONS = new Set([
  "arrow-left", "arrow-right",
  "arrow-left-bold", "arrow-right-bold",
  "arrow-top-left", "arrow-top-right", "arrow-bottom-left", "arrow-bottom-right",
  "chevron-left", "chevron-right",
  "chevron-double-left", "chevron-double-right",
  "menu-left", "menu-right",
  "open-in-new",
  "subdirectory-arrow-left", "subdirectory-arrow-right",
  "undo", "redo",
  "format-align-left", "format-align-right",
  "skip-next", "skip-previous",
  "fast-forward", "rewind",
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

// Deduplicate and validate icon list
const uniqueIcons = [...new Set(ICONS)].sort();
const missing: string[] = [];

// Clean and recreate output directory
rmSync(iconsDir, { recursive: true, force: true });
mkdirSync(iconsDir, { recursive: true });

const exports: string[] = [];
let generated = 0;

for (const mdiName of uniqueIcons) {
  const componentName = kebabToPascal(mdiName) + "Icon";
  const isRtl = RTL_ICONS.has(mdiName);

  const svgPath = resolve(mdiSvgDir, `${mdiName}.svg`);
  let svgContent: string;
  try {
    svgContent = readFileSync(svgPath, "utf-8");
  } catch {
    missing.push(mdiName);
    continue;
  }
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
  generated++;
}

// Generate barrel export
const indexContent = `// @arch-ui/icons — auto-generated from Material Design Icons (@mdi/svg)
// Do not edit manually. Run "pnpm generate" to regenerate.

export { Icon, type IconProps, type IconSize } from "./Icon";
${exports.sort().join("\n")}
`;

writeFileSync(indexPath, indexContent);

// eslint-disable-next-line no-console
console.log(`✓ Generated ${generated} icon components from MDI`);
if (missing.length > 0) {
  // eslint-disable-next-line no-console
  console.warn(`⚠ ${missing.length} icons not found in @mdi/svg: ${missing.join(", ")}`);
}
