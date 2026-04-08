---
sidebar_label: Icons
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<span className="foundation-header__label">Styles</span>

# Icons

Arch UI ships a curated set of 43 icons sourced from Material Design Icons. Every icon is a `forwardRef`-compatible React component that inherits color from its parent and supports three deliberate sizes.

<Tabs>
<TabItem value="overview" label="Overview" default>

**Common alternative names**

Iconography, glyphs, pictograms, symbols

---

## Principles

### Clarity over decoration

Every icon in the set earns its place by solving a real recognition problem. If a text label alone communicates the action clearly, skip the icon. When an icon is used, it should be immediately recognizable without requiring a tooltip to explain itself.

### Consistent optical weight

All icons share a 24 &times; 24 unit grid with filled paths, giving them uniform visual density at any of the three supported sizes. This prevents one icon from appearing heavier or lighter than its neighbors when they sit side by side in a toolbar or navigation rail.

### Inherit, don't override

Icons use `currentColor` by default, so they automatically match the text color of their parent element. This keeps icon color in sync with surrounding content and ensures contrast ratios are maintained without extra work.

---

## The icon set

Arch UI includes **43 icons** from the `@mdi/svg` library, wrapped as typed React components in the `@arch-ui/icons` package. Each icon follows the naming pattern `{Name}Icon` — for example, `SearchIcon`, `ChevronDownIcon`, or `AlertTriangleIcon`.

The set covers five broad categories:

| Category | Examples |
|---|---|
| **Navigation** | `ArrowUpIcon`, `ChevronLeftIcon`, `MenuIcon`, `ExternalLinkIcon` |
| **Actions** | `EditIcon`, `TrashIcon`, `DownloadIcon`, `UploadIcon`, `CopyIcon` |
| **Status** | `CheckCircleIcon`, `AlertTriangleIcon`, `WarningIcon`, `InfoIcon` |
| **Objects** | `FileIcon`, `FolderIcon`, `ImageIcon`, `CalendarIcon`, `UserIcon` |
| **Controls** | `PlusIcon`, `MinusIcon`, `XIcon`, `FilterIcon`, `SearchIcon` |

---

## Usage

### Basic import

```tsx
import { SearchIcon } from "@arch-ui/icons";

function SearchField() {
  return (
    <label>
      <SearchIcon size={20} />
      <input type="search" placeholder="Search..." />
    </label>
  );
}
```

### Color inheritance

Because icons default to `currentColor`, wrapping an icon in a colored container is all you need:

```tsx
<span style={{ color: "var(--color-content-negative)" }}>
  <AlertTriangleIcon />
</span>
```

You can also pass the `color` prop directly when you need to break from the parent color:

```tsx
<StarIcon color="var(--color-content-warning)" />
```

### Icons alongside text

When an icon sits next to a label, use flexbox with a consistent gap. The icon should be vertically centered with the first line of text:

```tsx
<button style={{ display: "flex", alignItems: "center", gap: "var(--spacing-8)" }}>
  <DownloadIcon size={20} />
  Download report
</button>
```

### RTL support

Directional icons — arrows, chevrons, and similar — should flip in right-to-left layouts. Pass the `rtl` prop to opt in:

```tsx
<ArrowRightIcon rtl />
```

The underlying CSS uses `[dir="rtl"] .arch-icon--rtl { transform: scaleX(-1); }` to handle the flip automatically.

---

## Accessibility

### Decorative vs. meaningful icons

Every icon in Arch UI renders with `aria-hidden="true"` by default. This is correct when the icon accompanies visible text that already communicates the meaning. If the icon is the **only** element conveying information — for example, an icon-only button — you must provide an `aria-label`:

```tsx
{/* Decorative — label is visible */}
<button>
  <TrashIcon /> Delete
</button>

{/* Meaningful — icon is the only content */}
<button aria-label="Delete item">
  <TrashIcon aria-label="Delete" />
</button>
```

When `aria-label` is provided, the component automatically sets `role="img"` and removes `aria-hidden`, making the icon visible to assistive technology.

### Minimum touch target

Icon-only buttons must meet a 44 &times; 44 px minimum touch target (WCAG 2.5.8). The icon itself can be 16, 20, or 24 px — pad the clickable area with spacing or a transparent border to reach the target size.

### Focus indicators

Interactive icons wrapped in buttons inherit the button's `:focus-visible` ring. Never place a click handler directly on an `<svg>` element — always wrap it in a `<button>` or `<a>`.

<div className="do-dont-grid">
  <div className="do-block">
    <strong>Do</strong><br/>
    Wrap interactive icons in a <code>&lt;button&gt;</code> and provide <code>aria-label</code> when there is no visible text.
  </div>
  <div className="dont-block">
    <strong>Don't</strong><br/>
    Attach <code>onClick</code> directly to the icon SVG or rely on a tooltip as the only accessible name.
  </div>
</div>

</TabItem>
<TabItem value="specs" label="Specs">

<h2>Sizes</h2>

Arch UI supports three icon sizes. Each maps to a specific use case — do not scale icons to arbitrary pixel values.

| Token | Pixels | Use case |
|---|---|---|
| `size={16}` | 16 &times; 16 | Inline with small text, compact UI, table cells |
| `size={20}` | 20 &times; 20 | Default for form controls, buttons, input adornments |
| `size={24}` | 24 &times; 24 | Navigation, page headers, standalone icon buttons |

All icons share a `viewBox="0 0 24 24"` and are scaled via the `width` and `height` attributes, so they remain crisp at every size.

---

<h2>Color</h2>

Icons do not define their own color tokens. They inherit from the surrounding text context through `currentColor`. This means an icon placed inside a disabled button automatically picks up the disabled text color without any extra props.

When you need to override color explicitly, pass a semantic token — never a raw hex value:

| Context | Recommended approach |
|---|---|
| Default content | Inherit from parent (`currentColor`) |
| Semantic meaning | `color="var(--color-content-negative)"` for errors, `var(--color-content-positive)` for success |
| Disabled state | Let the parent's disabled styling cascade |
| Inverted background | Inherit from a container using `var(--color-content-inverse-primary)` |

---

<h2>Spacing</h2>

When icons sit adjacent to text or other icons, use spacing tokens for the gap — not padding on the icon itself.

| Pairing | Recommended gap |
|---|---|
| Icon + label in a button | `var(--spacing-8)` (8 px) |
| Icon + body text inline | `var(--spacing-4)` (4 px) |
| Stacked icon buttons | `var(--spacing-4)` between targets |
| Icon within an input field | `var(--spacing-12)` from the field edge |

---

<h2>Grid and alignment</h2>

All icons are drawn on a 24-unit grid with 2 units of internal padding, giving a 20-unit live area. Paths use filled shapes (no strokes) for consistent rendering across browsers and pixel densities.

When aligning icons with text, use `align-items: center` on a flex container. The icons are designed to optically center alongside text set in Inter at the corresponding size.

---

<h2>Component API</h2>

Every icon component accepts the same props through the shared `IconProps` interface:

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `16 \| 20 \| 24` | `24` | Icon dimensions in pixels |
| `color` | `string` | `"currentColor"` | Fill color — use semantic tokens |
| `aria-label` | `string` | `undefined` | Accessible label for standalone icons |
| `rtl` | `boolean` | `false` | Flip horizontally in RTL layouts |
| `className` | `string` | `undefined` | Additional CSS class |
| `style` | `CSSProperties` | `undefined` | Inline style object (use sparingly) |

All standard SVG attributes are also forwarded via `SVGProps<SVGSVGElement>`.

---

<h2>Adding new icons</h2>

The icon set is auto-generated from `@mdi/svg` using the `pnpm generate` script in `packages/icons`. To request a new icon:

1. Confirm the icon exists in the [Material Design Icons](https://pictogrammers.com/library/mdi/) library.
2. Add the MDI name to the generation script at `packages/icons/scripts/generate.ts`.
3. Run `pnpm generate` inside the icons package.
4. Export the new component from `packages/icons/src/index.ts`.
5. Do **not** edit generated icon files by hand — they will be overwritten on the next generation run.

</TabItem>
</Tabs>
