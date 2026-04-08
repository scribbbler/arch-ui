---
sidebar_label: Toast
---

# Toast

A brief, non-blocking notification that appears in a corner of the screen to inform the user of an event or status change. Toasts auto-dismiss after a configurable delay and can optionally be closed manually.

**Common alternative names:** Notification, Flash message, Pop-up message

---

## Usage

Toasts are created imperatively via the `useToast` hook. Wrap your app in `ToastProvider` once at the root.

```jsx
import { ToastProvider, useToast } from '@arch-ui/components';

// Root layout
<ToastProvider position="top-right">
  <App />
</ToastProvider>

// Inside any component
function SaveButton() {
  const { toast } = useToast();

  return (
    <Button onClick={() => {
      save();
      toast({ title: 'Saved', variant: 'success' });
    }}>
      Save
    </Button>
  );
}
```

### Variants

```jsx
toast({ title: 'Note', description: 'Default toast with neutral styling.' });
toast({ title: 'Saved', variant: 'success', description: 'Your changes are live.' });
toast({ title: 'Warning', variant: 'warning', description: 'Storage nearly full.' });
toast({ title: 'Error', variant: 'danger', description: 'Failed to save changes.' });
```

### Custom duration

```jsx
// Longer display
toast({ title: 'Uploading...', duration: 10000 });

// Persistent (no auto-dismiss)
toast({ title: 'Connection lost', variant: 'danger', duration: 0 });
```

### Position

Control where toasts appear by setting the `position` prop on the provider.

```jsx
<ToastProvider position="bottom-center">
  <App />
</ToastProvider>
```

Available positions: `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `bottom-right`.

### Non-closeable

Hide the close button for toasts that should only auto-dismiss.

```jsx
toast({ title: 'Auto-saved', closeable: false, duration: 3000 });
```

---

## Props

### ToastProviderProps

| Prop | Type | Default | Description |
|---|---|---|---|
| `position` | `ToastPosition` | `'top-right'` | Stack position on screen. |
| `labels` | `Partial<ToastProviderLabels>` | -- | Override default labels (e.g. `{ notifications: 'Alerts' }`). |
| `children` | `ReactNode` | **required** | App content. |

### ToastOptions (passed to `toast()`)

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | **required** | Bold notification heading. |
| `description` | `string` | -- | Optional supporting text. |
| `variant` | `'default' \| 'success' \| 'warning' \| 'danger'` | `'default'` | Visual and semantic variant. |
| `duration` | `number` | `5000` | Auto-dismiss delay in milliseconds. Pass `0` for persistent. |
| `closeable` | `boolean` | `true` | Whether the close button is visible. |

### ToastProps (for direct rendering)

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | **required** | Heading text. |
| `description` | `string` | -- | Body text. |
| `variant` | `ToastVariant` | `'default'` | Colour variant. |
| `duration` | `number` | `5000` | Auto-dismiss delay. |
| `closeable` | `boolean` | `true` | Show close button. |
| `pauseOnHover` | `boolean` | `true` | Pause auto-dismiss timer on mouse hover. |
| `onClose` | `() => void` | **required** | Called when the toast is dismissed. |
| `labels` | `Partial<ToastLabels>` | -- | Override the dismiss button label. |
| `className` | `string` | -- | Additional CSS class names. |

---

## Behaviour

- Toasts animate in and out using a slide-and-fade transition. The animation respects `prefers-reduced-motion`.
- The auto-dismiss timer pauses when the user hovers over the toast (configurable via `pauseOnHover`).
- Multiple toasts stack vertically within the container. Bottom positions reverse the stack order so newest toasts appear closest to the edge.
- The toast container is rendered via a portal into `document.body`.

---

## Accessibility

- Uses `role="alert"` with `aria-live="assertive"` for `danger` toasts and `role="status"` with `aria-live="polite"` for all other variants.
- Each toast is `aria-atomic="true"` so screen readers announce the full content.
- The close button carries an `aria-label` (default: "Dismiss") with `:focus-visible` styling.
- The toast container region has an `aria-label` (default: "Notifications") for landmark navigation.
