---
sidebar_label: Drawer
---

# Drawer

A panel that slides in from one edge of the viewport, overlaying the main content. Drawers are suited for secondary tasks, navigation menus, filters, or detail views that the user can dismiss without losing context. The component handles body scroll lock, focus trapping, and Escape key dismissal automatically.

## Usage

```jsx
import { Drawer } from '@arch-ui/components';

function FiltersDrawer({ isOpen, onClose }) {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} aria-label="Filters">
      <div style={{ padding: 'var(--spacing-16)' }}>
        <h2>Filters</h2>
        <p>Filter controls go here.</p>
        <button onClick={onClose}>Apply</button>
      </div>
    </Drawer>
  );
}
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `isOpen` | `boolean` | -- | Controls drawer visibility. Required. |
| `onClose` | `() => void` | -- | Called when the drawer should close (overlay click or Escape). Required. |
| `position` | `'start' \| 'end' \| 'top' \| 'bottom'` | `'end'` | Side from which the drawer slides in. Uses CSS logical properties for RTL support. |
| `size` | `string` | `'20rem'` | Inline-size (for start/end) or block-size (for top/bottom) of the drawer panel. |
| `animate` | `boolean` | `true` | When true, the drawer uses slide-in/out transitions. |
| `children` | `ReactNode` | -- | Drawer content. |
| `aria-label` | `string` | -- | Accessible label for the drawer dialog. |

Drawer supports `ref` forwarding to the panel `<div>`.

## Position variants

The `position` prop controls which edge the drawer slides in from. Values use CSS logical directions so `start` and `end` automatically flip in RTL layouts.

```jsx
// Slides from the right in LTR (default)
<Drawer isOpen={isOpen} onClose={onClose} position="end">...</Drawer>

// Slides from the left in LTR
<Drawer isOpen={isOpen} onClose={onClose} position="start">...</Drawer>

// Slides from the top
<Drawer isOpen={isOpen} onClose={onClose} position="top" size="16rem">...</Drawer>

// Slides from the bottom
<Drawer isOpen={isOpen} onClose={onClose} position="bottom" size="16rem">...</Drawer>
```

## Custom sizing

Pass any valid CSS length to `size`. For `start`/`end` drawers this sets the inline-size (width in LTR). For `top`/`bottom` drawers it sets the block-size (height).

```jsx
<Drawer isOpen={isOpen} onClose={onClose} size="400px">...</Drawer>
```

## Accessibility

- Renders with `role="dialog"` and `aria-modal="true"`.
- Focus is trapped inside the drawer while it is open using `FocusTrap`.
- Pressing Escape closes the drawer.
- Body scroll is locked while the drawer is visible.
- Transitions respect `prefers-reduced-motion: reduce`.
- Provide a descriptive `aria-label` so screen readers announce the drawer purpose.
