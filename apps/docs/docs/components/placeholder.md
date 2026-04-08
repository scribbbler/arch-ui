---
sidebar_label: Placeholder
---

# Placeholder

A decorative loading placeholder (also known as Skeleton) displayed while content is being fetched. Placeholder conveys that content is on its way, reducing perceived wait time and preventing layout shifts.

Placeholder is the design-facing name for the `Skeleton` component in Arch UI. They share the same implementation.

---

## Usage

```jsx
import { Skeleton } from '@arch-ui/components';

function Example() {
  return (
    <div aria-busy="true">
      <Skeleton variant="text" />
      <Skeleton variant="circular" width="40px" />
      <Skeleton variant="rectangular" width="100%" height="120px" />
    </div>
  );
}
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'text' \| 'circular' \| 'rectangular'` | `'text'` | Shape of the placeholder. |
| `width` | `string` | `undefined` | Inline size override. Accepts any CSS length value. |
| `height` | `string` | `undefined` | Block size override. For the `circular` variant, height matches `width` automatically when omitted. |
| `animated` | `boolean` | `true` | Whether to show the shimmer animation. Disabled automatically when `prefers-reduced-motion` is active. |
| `className` | `string` | `undefined` | Additional CSS class names applied to the root element. |

All standard `span` HTML attributes are also supported via rest props.

---

## Variants

### Text

The default variant. Renders a full-width bar the height of a small paragraph, with slightly rounded corners. Use it to represent lines of text.

```jsx
<Skeleton variant="text" />
<Skeleton variant="text" />
<Skeleton variant="text" width="60%" />
```

### Circular

Renders a circle. Useful for avatar or icon placeholders. When only `width` is provided, `height` is automatically set to match, keeping the shape square.

```jsx
<Skeleton variant="circular" width="40px" />
<Skeleton variant="circular" width="64px" />
```

### Rectangular

A rectangle with small rounded corners. Use it for images, cards, or other block-level content areas.

```jsx
<Skeleton variant="rectangular" width="100%" height="200px" />
```

---

## Animation

By default, Placeholder displays a shimmer effect that sweeps across the surface. The shimmer uses a gradient that transitions between `--color-background-muted` and `--color-background-subtle`.

Set `animated={false}` to display a static placeholder with no motion.

```jsx
<Skeleton animated={false} variant="rectangular" width="100%" height="80px" />
```

When the user has `prefers-reduced-motion: reduce` enabled, the shimmer animation is automatically disabled regardless of the `animated` prop.

---

## Composing a loading screen

Combine multiple Placeholder shapes to mirror the layout of the content being loaded.

```jsx
<div aria-busy="true">
  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
    <Skeleton variant="circular" width="48px" />
    <div style={{ flex: 1 }}>
      <Skeleton variant="text" width="40%" />
      <Skeleton variant="text" width="70%" />
    </div>
  </div>
  <Skeleton variant="rectangular" width="100%" height="160px" />
</div>
```

---

## Accessibility

- Skeleton is always `aria-hidden="true"`. It is purely decorative and invisible to screen readers.
- Set `aria-busy="true"` on the parent container while content is loading. This tells assistive technology that the region is being updated.
- When loading completes, remove `aria-busy` or set it to `false` so the loaded content is announced.
