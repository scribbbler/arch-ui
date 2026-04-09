---
sidebar_label: Text resizing
hide_title: true
---

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>ACCESSIBILITY</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Text resizing</h1>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    Support text resizing up to 200% without loss of content or functionality, as required by WCAG 1.4.4.
  </p>
</div>

---

## How users resize text

There are three primary mechanisms users employ, and your interface must handle all of them:

### Browser zoom

`Ctrl/Cmd + Plus` scales the entire viewport — text, images, and layout. At 200% zoom on a 1440px monitor, the effective viewport becomes 720px. Your layout must reflow to fit this narrower space without horizontal scrolling.

### Browser font size setting

Users can change the default font size in their browser settings (e.g., from 16px to 24px). This only affects text sized with relative units (`rem`, `em`, `%`). Text sized with `px` is unaffected, which is why Arch UI tokens use `rem` for all typography values.

### Operating system text scaling

Both macOS and Windows offer system-wide text scaling settings. These affect rendered font sizes at the OS level and behave similarly to browser font size changes.

---

## Relative units in Arch UI

### Why `rem` over `px`

Arch UI typography tokens are defined in `rem` units, not pixels. A `rem` is relative to the root element's font size (typically 16px by default). When a user increases their browser's base font size, all `rem`-based text scales proportionally.

| Token | Value | At default (16px) | At 150% (24px) |
|---|---|---|---|
| `--font-size-100` | `0.75rem` | 12px | 18px |
| `--font-size-200` | `0.875rem` | 14px | 21px |
| `--font-size-300` | `1rem` | 16px | 24px |
| `--font-size-400` | `1.25rem` | 20px | 30px |
| `--font-size-500` | `1.5rem` | 24px | 36px |

Pixel values do not scale with user preferences. If you hardcode `font-size: 14px`, that text stays at 14px regardless of what the user has configured — defeating their accessibility settings.

### When `em` is appropriate

Use `em` for values that should scale relative to their parent's font size, not the root. This is useful for:

- **Spacing within text blocks** — margins and padding that should grow with the text they surround
- **Icon sizing** — icons inline with text that should match the text size

```css
/* Icon scales with surrounding text */
.inline-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.125em;
}
```

### When `px` is acceptable

Some values should not scale with text size:

- **Borders** — a 1px border should remain 1px regardless of zoom level
- **Shadows** — box shadow offsets and blur radii are visual effects, not content
- **Focus outlines** — the 2px focus ring should remain consistent for visibility

Arch UI border and shadow tokens use `px` intentionally for these cases.

---

## Layout reflow

### The 320px rule

WCAG 1.4.10 (Reflow) requires that content reflows to fit a 320px-wide viewport without horizontal scrolling. This is equivalent to a 1280px viewport at 400% zoom. Arch UI's layout tokens and grid system are designed with this constraint in mind.

Practical implications:

- **Multi-column layouts must collapse** — a 3-column grid at normal zoom should stack to a single column at high zoom levels
- **Navigation must adapt** — horizontal nav bars should collapse into a hamburger menu or vertical layout
- **Tables may need horizontal scroll** — wide data tables are the one acceptable exception to the no-horizontal-scroll rule, provided they are wrapped in a container with `overflow-x: auto`

### Using the layout tokens

Arch UI's spacing and layout tokens use `rem` for values that should scale and `px` for fixed structural values:

```css
/* Padding scales with text — uses rem-based token */
.card {
  padding: var(--spacing-400); /* 1rem = scales */
}

/* Border does not scale — uses px-based token */
.card {
  border: var(--border-width-100) solid var(--color-border-default); /* 1px = fixed */
}
```

---

## Responsive typography

### Fluid type scaling

For display and heading text that needs to scale between viewport sizes, use CSS `clamp()` with `rem` units:

```css
.hero-title {
  font-size: clamp(var(--font-size-500), 4vw, var(--font-size-800));
}
```

This creates text that:
- Never shrinks below `--font-size-500` (protecting readability)
- Scales with the viewport width between breakpoints
- Never exceeds `--font-size-800` (preventing absurdly large text on wide screens)

### Line length

Long lines of text are harder to read, especially for users with cognitive disabilities or dyslexia. Arch UI recommends a maximum line length of 80 characters for body text:

```css
.prose {
  max-width: 65ch; /* approximately 65 characters */
}
```

The `ch` unit is relative to the width of the "0" character in the current font, making it a natural fit for line-length constraints that scale with text size.

---

## Testing text resizing

### Browser zoom test

1. Open your application in Chrome or Firefox
2. Press `Ctrl/Cmd + Plus` to zoom to 200%
3. Verify:
   - All text is visible without horizontal scrolling
   - No text is clipped or overlaps other elements
   - Interactive elements remain clickable and properly spaced
   - Images and icons scale appropriately
4. Continue to 400% and verify content reflows to a single column

### Font size override test

1. Open Chrome settings > Appearance > Font size
2. Set it to "Very large" (24px)
3. Navigate through your application and verify:
   - All text has actually grown (anything stuck at the same size is using `px` units)
   - Layout accommodates the larger text without breaking
   - Buttons and form controls expand to fit their text content

### Firefox font minimum test

1. Open Firefox settings > Language and Appearance > Fonts
2. Set a minimum font size (e.g., 20px)
3. Verify that no text appears smaller than the minimum

---

## Common mistakes

### Fixed-height containers with text

```css
/* Problem: text overflows at larger sizes */
.label {
  height: 32px;
  overflow: hidden;
}

/* Solution: use min-height or let height be auto */
.label {
  min-height: 32px;
}
```

When text grows, fixed-height containers clip content. Use `min-height` instead of `height`, and avoid `overflow: hidden` on containers that hold text.

### Pixel-based media queries

```css
/* Problem: doesn't account for user font size */
@media (max-width: 768px) {
  .sidebar { display: none; }
}

/* Better: rem-based breakpoint scales with user preferences */
@media (max-width: 48rem) {
  .sidebar { display: none; }
}
```

A `48rem` breakpoint triggers at 768px for users with a default 16px font size, but it triggers at 1152px for users with a 24px font size — which is correct, because those users need the mobile layout earlier.

### Truncation without access to full content

Text truncation (`text-overflow: ellipsis`) hides content. If the full text is important, provide a way to reveal it — a tooltip, an expandable region, or a "show more" control.

```jsx
// Problem: truncated text with no way to read the full label
<span className="truncate">{longLabel}</span>

// Solution: add a title attribute and ensure focus/hover reveals full text
<span className="truncate" title={longLabel}>
  {longLabel}
</span>
```

### Viewport units for font sizing

```css
/* Problem: text size tied to viewport, ignores user preferences */
.heading {
  font-size: 5vw;
}

/* Solution: clamp with rem bounds */
.heading {
  font-size: clamp(1.5rem, 4vw, 3rem);
}
```

Viewport-only font sizes (`vw`, `vh`) ignore user font size preferences entirely. Always pair viewport units with `rem`-based minimum and maximum values using `clamp()`.

---

## Quick reference

| Requirement | Rule |
|---|---|
| Text sizing | Use `rem` or `em` for all font sizes — never `px` |
| Spacing near text | Use `rem`-based tokens for padding and margins |
| Container heights | Use `min-height`, not `height`, for text containers |
| Layout reflow | Content must work at 320px effective width (1280px at 400% zoom) |
| Line length | Cap body text at 65-80 characters with `max-width` in `ch` units |
| Borders and shadows | `px` is acceptable for decorative, non-content values |
| Breakpoints | Prefer `rem`-based media queries over `px` |
| Viewport units | Never use `vw`/`vh` alone for font sizes — always use `clamp()` with `rem` bounds |
