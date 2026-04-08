---
sidebar_label: Tooltip
---

# Tooltip

Non-interactive supplementary text that appears on hover and focus to describe or label a UI element. Tooltips are rendered via a portal and positioned relative to their trigger element.

**Common alternative names:** Hint, Info tip, Helper text

---

## Usage

```jsx
import { Tooltip } from '@arch-ui/components';

<Tooltip content="Save document">
  <button aria-label="Save"><SaveIcon /></button>
</Tooltip>
```

### Positions

```jsx
<Tooltip content="Top (default)" position="top">
  <Button>Top</Button>
</Tooltip>

<Tooltip content="Below the trigger" position="bottom">
  <Button>Bottom</Button>
</Tooltip>

<Tooltip content="Inline start" position="start">
  <Button>Start</Button>
</Tooltip>

<Tooltip content="Inline end" position="end">
  <Button>End</Button>
</Tooltip>
```

### Custom delay

Adjust how long the user must hover before the tooltip appears.

```jsx
<Tooltip content="Instant" delay={0}>
  <Button>No delay</Button>
</Tooltip>

<Tooltip content="Slow reveal" delay={600}>
  <Button>600ms delay</Button>
</Tooltip>
```

### Multi-line content

Tooltips support longer text and will wrap within a maximum width of 20rem.

```jsx
<Tooltip content="This is a longer tooltip that provides additional context about the action the user is about to take.">
  <Button>Hover me</Button>
</Tooltip>
```

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `content` | `ReactNode` | **required** | Tooltip content. Must be non-interactive text or static elements. |
| `position` | `'top' \| 'bottom' \| 'start' \| 'end'` | `'top'` | Preferred position relative to the trigger. |
| `delay` | `number` | `300` | Milliseconds to wait before showing the tooltip. |
| `children` | `ReactElement` | **required** | The trigger element. Must be a single focusable React element. |

---

## Behaviour

- The tooltip appears after the configured `delay` on mouse enter or focus, and hides immediately on mouse leave or blur.
- Positioning is computed dynamically against the trigger's bounding rect. The tooltip uses logical position values (`start`/`end`) for RTL compatibility.
- Rendered into `document.body` via Portal, so it is never clipped by `overflow: hidden` containers.

---

## Accessibility

- The trigger element receives `aria-describedby` pointing to the tooltip's `id`, linking the supplementary text for screen readers.
- The tooltip element uses `role="tooltip"`.
- Tooltips appear on keyboard focus (not just hover), ensuring keyboard-only users can access the information.
- Tooltip content must be non-interactive. If you need interactive content (links, buttons), use a Popover instead.
- The tooltip is set to `pointer-events: none` so it does not interfere with mouse interactions on surrounding elements.
