---
sidebar_label: Snackbar
---

# Snackbar

A brief, auto-dismissing notification that appears at the bottom of the screen to confirm an action or provide lightweight feedback. Snackbars are less intrusive than toasts and disappear without user interaction.

**Common alternative names:** Bottom notification, Action feedback, Inline toast

---

## Usage

```jsx
import { Snackbar, useSnackbar } from '@arch-ui/components';

function SaveButton() {
  const { enqueue } = useSnackbar();

  return (
    <Button onClick={() => {
      save();
      enqueue({ message: 'Changes saved' });
    }}>
      Save
    </Button>
  );
}
```

### With action

Snackbars can include a single text action for undoing or following up.

```jsx
enqueue({
  message: 'Item archived',
  actionText: 'Undo',
  onAction: handleUndo,
});
```

### Duration

By default snackbars auto-dismiss after a short delay. Override the duration or make them persist until manually dismissed.

```jsx
// Custom duration (milliseconds)
enqueue({ message: 'Uploading...', duration: 8000 });

// Persistent until dismissed
enqueue({ message: 'No internet connection', duration: 0 });
```

---

## Expected props

### SnackbarProviderProps

| Prop | Type | Default | Description |
|---|---|---|---|
| `placement` | `'bottom-left' \| 'bottom-center' \| 'bottom-right'` | `'bottom-center'` | Where snackbars appear on screen. |
| `children` | `ReactNode` | **required** | App content. |

### SnackbarOptions (passed to `enqueue`)

| Prop | Type | Default | Description |
|---|---|---|---|
| `message` | `string` | **required** | The notification text. |
| `actionText` | `string` | -- | Label for an optional inline action. |
| `onAction` | `() => void` | -- | Callback when the action is clicked. |
| `duration` | `number` | `4000` | Auto-dismiss delay in milliseconds. Pass `0` to persist. |

---

## Snackbar vs Toast

| | Snackbar | Toast |
|---|---|---|
| Position | Bottom of screen | Configurable (top/bottom, left/center/right) |
| Severity | Neutral only | Supports success, warning, danger variants |
| Content | Single line + optional action | Title + description + close button |
| Use case | Lightweight action confirmation | Important status updates |

---

## Accessibility

- The snackbar container should use `role="status"` and `aria-live="polite"` so screen readers announce new messages without interrupting.
- Action buttons within the snackbar must be keyboard focusable.
- Auto-dismiss timers should pause when the snackbar receives focus or hover, giving users time to read or interact.
- Avoid showing more than one snackbar at a time to reduce cognitive load.
