---
sidebar_label: Icons
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Expression</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Icons</h1>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    Our icon system is built for clarity and consistency. It aims to be bold, communicative, and functional, complementing typography and fitting naturally within every component.
  </p>
</div>

<Tabs>
<TabItem value="usage" label="Usage" default>

<div className="doc-hero">
  <div style={{display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center'}}>
    {[
      'M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z',
      'M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z',
      'M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z',
      'M12,2C17.52,2 22,6.48 22,12C22,17.52 17.52,22 12,22C6.48,22 2,17.52 2,12C2,6.48 6.48,2 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z',
      'M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3Z',
      'M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z',
      'M19,13H5V11H19V13Z',
      'M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z',
      'M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z',
      'M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z',
      'M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z',
      'M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z',
      'M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z',
      'M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z',
      'M10,6L8.59,7.41L13.17,12L8.59,16.59L10,18L16,12L10,6Z',
      'M15.41,7.41L14,6L8,12L14,18L15.41,16.59L10.83,12L15.41,7.41Z',
      'M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z',
      'M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z',
      'M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z',
      'M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z',
      'M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z',
      'M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2Z',
      'M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z',
      'M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z',
      'M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1',
      'M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z',
      'M16,13C15.71,13 15.38,13 15.03,13.05C16.19,13.89 17,15 17,16.5V20H23V16.5C23,14.17 18.33,13 16,13M8,13C5.67,13 1,14.17 1,16.5V20H15V16.5C15,14.17 10.33,13 8,13M8,11A3,3 0 0,0 11,8A3,3 0 0,0 8,5A3,3 0 0,0 5,8A3,3 0 0,0 8,11M16,11A3,3 0 0,0 19,8A3,3 0 0,0 16,5A3,3 0 0,0 13,8A3,3 0 0,0 16,11Z',
      'M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z',
      'M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z',
      'M17,3H7A2,2 0 0,0 5,5V21L12,18L19,21V5A2,2 0 0,0 17,3Z',
      'M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z',
      'M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z',
      'M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z',
      'M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z',
      'M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10A2,2 0 0,1 6,8H7V6A5,5 0 0,1 12,1C14.76,1 17,3.24 17,6H15A3,3 0 0,0 12,3A3,3 0 0,0 9,6V8H18M12,17A2,2 0 0,0 14,15A2,2 0 0,0 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17Z',
      'M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z',
      'M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z',
      'M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z',
      'M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z',
      'M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.04 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.04 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z',
      'M14,17H17L19,13V7H13L11,11V17H14M4,17H7L9,13V7H3L1,11V17H4Z',
      'M3,17V19H9V17H3M3,5V7H13V5H3M13,21V19H21V17H13V15H11V21H13M7,9V11H3V13H7V15H9V9H7M21,13V11H11V13H21M15,9H17V7H21V5H17V3H15V9Z',
      'M14,17H7V15H14M17,13H7V11H17M17,9H7V7H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z',
    ].map((d, i) => (
      <div key={i} style={{width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#282828">
          <path d={d} />
        </svg>
      </div>
    ))}
  </div>
</div>

**Common alternative names**

Iconography, glyphs, pictograms, symbols

---

## Icon set

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

## Sizes

Arch UI supports three icon sizes. Each maps to a specific use case — do not scale icons to arbitrary pixel values.

<div style={{background: '#f3f3f3', borderRadius: '12px', padding: '48px 32px', margin: '24px 0', display: 'flex', justifyContent: 'center', gap: '48px', alignItems: 'flex-end', flexWrap: 'wrap'}}>
  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px'}}>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#282828"><path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3Z" /></svg>
    <span style={{fontSize: '13px', fontWeight: 600}}>16px</span>
    <span style={{fontSize: '12px', color: '#727272'}}>Compact UI</span>
  </div>
  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px'}}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#282828"><path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3Z" /></svg>
    <span style={{fontSize: '13px', fontWeight: 600}}>20px</span>
    <span style={{fontSize: '12px', color: '#727272'}}>Default</span>
  </div>
  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px'}}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#282828"><path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3Z" /></svg>
    <span style={{fontSize: '13px', fontWeight: 600}}>24px</span>
    <span style={{fontSize: '12px', color: '#727272'}}>Navigation</span>
  </div>
</div>

| Size | Pixels | Use case |
|---|---|---|
| `size={16}` | 16 &times; 16 | Inline with small text, compact UI, table cells |
| `size={20}` | 20 &times; 20 | Default for form controls, buttons, input adornments |
| `size={24}` | 24 &times; 24 | Navigation, page headers, standalone icon buttons |

All icons share a `viewBox="0 0 24 24"` and are scaled via the `width` and `height` attributes, so they remain crisp at every size.

---

## Grid and alignment

All icons are drawn on a 24-unit grid with 2 units of internal padding, giving a 20-unit live area. Paths use filled shapes (no strokes) for consistent rendering across browsers and pixel densities.

When aligning icons with text, use `align-items: center` on a flex container. The icons are designed to optically center alongside text set in Inter at the corresponding size.

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

---

## Do / Don't

<div className="do-dont-grid">
  <div className="do-block">
    <strong>Do</strong>
    <p>Wrap interactive icons in a <code>&lt;button&gt;</code> and provide <code>aria-label</code> when there is no visible text.</p>
  </div>
  <div className="dont-block">
    <strong>Don't</strong>
    <p>Attach <code>onClick</code> directly to the icon SVG or rely on a tooltip as the only accessible name.</p>
  </div>
</div>

<div className="do-dont-grid">
  <div className="do-block">
    <strong>Do</strong>
    <p>Use one of the three supported sizes (16, 20, 24). They are optimized for pixel-perfect rendering.</p>
  </div>
  <div className="dont-block">
    <strong>Don't</strong>
    <p>Scale icons to arbitrary values like 18 or 22. Off-grid sizes produce blurry edges.</p>
  </div>
</div>

<div className="do-dont-grid">
  <div className="do-block">
    <strong>Do</strong>
    <p>Let icons inherit <code>currentColor</code> from the parent or pass a semantic color token.</p>
  </div>
  <div className="dont-block">
    <strong>Don't</strong>
    <p>Hardcode hex values like <code>color="#333"</code>. They bypass the color system and break in dark mode.</p>
  </div>
</div>

</TabItem>
<TabItem value="tokens" label="Tokens">

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

<h2>Color</h2>

Icons do not define their own color tokens. They inherit from the surrounding text context through `currentColor`. This means an icon placed inside a disabled button automatically picks up the disabled text color without any extra props.

When you need to override color explicitly, pass a semantic token — never a raw hex value:

| Context | Recommended approach |
|---|---|
| Default content | Inherit from parent (`currentColor`) |
| Semantic meaning | `color="var(--color-content-negative)"` for errors, `var(--color-content-positive)` for success |
| Disabled state | Let the parent's disabled styling cascade |
| Inverted background | Inherit from a container using `var(--color-content-inverse-primary)` |

<h2>Spacing</h2>

When icons sit adjacent to text or other icons, use spacing tokens for the gap — not padding on the icon itself.

| Pairing | Recommended gap |
|---|---|
| Icon + label in a button | `var(--spacing-8)` (8 px) |
| Icon + body text inline | `var(--spacing-4)` (4 px) |
| Stacked icon buttons | `var(--spacing-4)` between targets |
| Icon within an input field | `var(--spacing-12)` from the field edge |

<h2>Full icon list</h2>

| Icon | Component name | Category |
|---|---|---|
| <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg> | `InfoIcon` | Status |
| <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z" /></svg> | `AlertTriangleIcon` | Status |
| <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z" /></svg> | `WarningIcon` | Status |
| <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12,2C17.52,2 22,6.48 22,12C22,17.52 17.52,22 12,22C6.48,22 2,17.52 2,12C2,6.48 6.48,2 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z" /></svg> | `CheckCircleIcon` | Status |
| <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" /></svg> | `CheckIcon` | Status |
| <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" /></svg> | `XCircleIcon` | Status |
| <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3Z" /></svg> | `SearchIcon` | Controls |
| <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg> | `PlusIcon` | Controls |
| <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19,13H5V11H19V13Z" /></svg> | `MinusIcon` | Controls |
| <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg> | `XIcon` | Controls |
| <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3,17V19H9V17H3M3,5V7H13V5H3M13,21V19H21V17H13V15H11V21H13M7,9V11H3V13H7V15H9V9H7M21,13V11H11V13H21M15,9H17V7H21V5H17V3H15V9Z" /></svg> | `FilterIcon` | Controls |
| <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" /></svg> | `ArrowLeftIcon` | Navigation |
| <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" /></svg> | `ArrowRightIcon` | Navigation |
| <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z" /></svg> | `ArrowUpIcon` | Navigation |
| <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z" /></svg> | `ArrowDownIcon` | Navigation |
| <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg> | `ChevronDownIcon` | Navigation |
| <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" /></svg> | `ChevronUpIcon` | Navigation |
| <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10,6L8.59,7.41L13.17,12L8.59,16.59L10,18L16,12L10,6Z" /></svg> | `ChevronRightIcon` | Navigation |
| <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41,7.41L14,6L8,12L14,18L15.41,16.59L10.83,12L15.41,7.41Z" /></svg> | `ChevronLeftIcon` | Navigation |
| <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" /></svg> | `MenuIcon` | Navigation |
| <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" /></svg> | `ExternalLinkIcon` | Navigation |
| <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" /></svg> | `EditIcon` | Actions |
| <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg> | `TrashIcon` | Actions |
| <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" /></svg> | `DownloadIcon` | Actions |
| <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z" /></svg> | `UploadIcon` | Actions |
| <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" /></svg> | `CopyIcon` | Actions |
| <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2Z" /></svg> | `FileIcon` | Objects |
| <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z" /></svg> | `FolderIcon` | Objects |
| <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z" /></svg> | `ImageIcon` | Objects |
| <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1" /></svg> | `CalendarIcon` | Objects |
| <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" /></svg> | `UserIcon` | Objects |
| <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16,13C15.71,13 15.38,13 15.03,13.05C16.19,13.89 17,15 17,16.5V20H23V16.5C23,14.17 18.33,13 16,13M8,13C5.67,13 1,14.17 1,16.5V20H15V16.5C15,14.17 10.33,13 8,13M8,11A3,3 0 0,0 11,8A3,3 0 0,0 8,5A3,3 0 0,0 5,8A3,3 0 0,0 8,11M16,11A3,3 0 0,0 19,8A3,3 0 0,0 16,5A3,3 0 0,0 13,8A3,3 0 0,0 16,11Z" /></svg> | `UsersIcon` | Objects |
| <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" /></svg> | `StarIcon` | Objects |
| <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z" /></svg> | `HeartIcon` | Objects |
| <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17,3H7A2,2 0 0,0 5,5V21L12,18L19,21V5A2,2 0 0,0 17,3Z" /></svg> | `BookmarkIcon` | Objects |
| <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" /></svg> | `ClockIcon` | Objects |
| <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" /></svg> | `EyeIcon` | Objects |
| <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z" /></svg> | `EyeOffIcon` | Objects |
| <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z" /></svg> | `LockIcon` | Objects |
| <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10A2,2 0 0,1 6,8H7V6A5,5 0 0,1 12,1C14.76,1 17,3.24 17,6H15A3,3 0 0,0 12,3A3,3 0 0,0 9,6V8H18M12,17A2,2 0 0,0 14,15A2,2 0 0,0 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17Z" /></svg> | `UnlockIcon` | Objects |
| <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.04 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.04 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" /></svg> | `SettingsIcon` | Objects |
| <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" /></svg> | `MoreVerticalIcon` | Controls |
| <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z" /></svg> | `MoreHorizontalIcon` | Controls |

</TabItem>
<TabItem value="code" label="Code">

<h2>Basic import</h2>

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

<h2>Color inheritance</h2>

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

<h2>Icons alongside text</h2>

When an icon sits next to a label, use flexbox with a consistent gap. The icon should be vertically centered with the first line of text:

```tsx
<button style={{ display: "flex", alignItems: "center", gap: "var(--spacing-8)" }}>
  <DownloadIcon size={20} />
  Download report
</button>
```

<h2>RTL support</h2>

Directional icons — arrows, chevrons, and similar — should flip in right-to-left layouts. Pass the `rtl` prop to opt in:

```tsx
<ArrowRightIcon rtl />
```

The underlying CSS uses `[dir="rtl"] .arch-icon--rtl { transform: scaleX(-1); }` to handle the flip automatically.

<h2>Adding new icons</h2>

The icon set is auto-generated from `@mdi/svg` using the `pnpm generate` script in `packages/icons`. To add a new icon:

1. Confirm the icon exists in the Material Design Icons library.
2. Add the MDI name to the generation script at `packages/icons/scripts/generate.ts`.
3. Run `pnpm generate` inside the icons package.
4. Export the new component from `packages/icons/src/index.ts`.

Do **not** edit generated icon files by hand — they will be overwritten on the next generation run.

</TabItem>
<TabItem value="changelog" label="Status & changelog">

Status & changelog coming soon.

</TabItem>
</Tabs>
