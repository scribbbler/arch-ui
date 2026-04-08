---
sidebar_label: Popover
---

# Popover

An interactive overlay panel that appears relative to a trigger element. Popover is suited for menus, rich tooltips, small forms, or contextual actions that do not warrant a full modal. It manages positioning, focus trapping, and dismissal automatically.

## Usage

```jsx
import { Popover } from '@arch-ui/components';
import { useState } from 'react';

function OptionsMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      content={
        <ul>
          <li><button>Edit</button></li>
          <li><button>Delete</button></li>
        </ul>
      }
    >
      <button onClick={() => setIsOpen((o) => !o)}>Options</button>
    </Popover>
  );
}
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `content` | `ReactNode` | -- | The interactive content rendered inside the popover panel. Required. |
| `position` | `'top' \| 'bottom' \| 'start' \| 'end'` | `'bottom'` | Preferred position relative to the trigger. |
| `isOpen` | `boolean` | -- | Controls whether the popover is visible. Required. |
| `onClose` | `() => void` | -- | Called when the popover should close (Escape, outside click). Required. |
| `onOpen` | `() => void` | -- | Called when the popover should open. Used with `triggerType="hover"`. |
| `triggerType` | `'click' \| 'hover'` | `'click'` | How the popover is triggered. |
| `showArrow` | `boolean` | `false` | When true, renders an arrow element pointing toward the trigger. |
| `onMouseEnterDelay` | `number` | `200` | Delay in ms before showing the popover on mouse enter (hover trigger only). |
| `onMouseLeaveDelay` | `number` | `200` | Delay in ms before hiding the popover on mouse leave (hover trigger only). |
| `children` | `ReactElement` | -- | The trigger element. Must be a single focusable React element. Required. |

## Position variants

The popover can appear on any side of the trigger. `start` and `end` use logical directions for RTL support.

```jsx
<Popover position="top" ...>...</Popover>
<Popover position="bottom" ...>...</Popover>
<Popover position="start" ...>...</Popover>
<Popover position="end" ...>...</Popover>
```

## Hover trigger

For tooltip-like interactions where hovering reveals supplementary content, set `triggerType="hover"` and provide both `onOpen` and `onClose`. Enter and leave delays prevent accidental flashing.

```jsx
<Popover
  isOpen={isOpen}
  onOpen={() => setIsOpen(true)}
  onClose={() => setIsOpen(false)}
  triggerType="hover"
  onMouseEnterDelay={300}
  onMouseLeaveDelay={150}
  content={<p>Additional details about this item.</p>}
>
  <button>Hover me</button>
</Popover>
```

## Arrow

Pass `showArrow` to render a small CSS arrow pointing from the popover toward its trigger. The arrow automatically orients based on the `position` value.

```jsx
<Popover showArrow position="top" ...>...</Popover>
```

## Accessibility

- The popover panel renders with `role="dialog"` and `aria-modal="true"`.
- Focus is trapped inside the popover while it is open.
- The trigger element receives `aria-expanded` and `aria-haspopup="dialog"` attributes automatically.
- When open, the trigger also receives `aria-controls` pointing to the popover panel id.
- Pressing Escape closes the popover.
- Click-triggered popovers render a transparent overlay for click-outside detection.
