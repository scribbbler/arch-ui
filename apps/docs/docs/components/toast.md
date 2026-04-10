---
sidebar_label: Toast
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>MESSAGING</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Toast</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    A brief, non-blocking notification that appears in a corner of the screen to inform the user of an event or status change.
  </p>
</div>

<Tabs>
<TabItem value="usage" label="Usage" default>

<div style={{background: '#F3F3F3', borderRadius: '12px', padding: '32px', margin: '24px 0', display: 'flex', justifyContent: 'center'}}>
  <div style={{background: '#282828', borderRadius: '12px', padding: '40px', maxWidth: '600px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '200px', color: '#fff', fontSize: '14px', opacity: 0.5}}>
    Preview coming soon
  </div>
</div>

**Common alternative names**

Snackbar, Notification, Flash message

---

Usage guidelines coming soon.

</TabItem>
<TabItem value="specs" label="Specs">

Specs coming soon.

</TabItem>
<TabItem value="content" label="Content">

Content guidelines coming soon.

</TabItem>
<TabItem value="changelog" label="Status & changelog">

Status & changelog coming soon.

</TabItem>
<TabItem value="code" label="Code">

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

</TabItem>
</Tabs>
