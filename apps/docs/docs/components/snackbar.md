---
sidebar_label: Snackbar
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>MESSAGING</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Snackbar</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    A brief, auto-dismissing notification that appears at the bottom of the screen to confirm an action.
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

Brief notification, Auto-dismiss toast

---

Usage guidelines coming soon.

</TabItem>
<TabItem value="specs" label="Specs">

Specs coming soon.

</TabItem>
<TabItem value="content" label="Content">

Content guidelines coming soon.

</TabItem>
<TabItem value="changelog" label="Status & Changelog">

Status & changelog coming soon.

</TabItem>
<TabItem value="code" label="Code">

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

</TabItem>
</Tabs>
