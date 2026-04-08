---
sidebar_label: Sliding button
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Buttons</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Sliding Button</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    A confirmation button that requires the user to slide a handle across a track to complete an action.
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

Swipe to confirm, slide to unlock, drag button

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

SlidingButton presents a track with a draggable handle and a label. The user must drag the handle from one end to the other to trigger the `onConfirm` callback. If the user releases before reaching the threshold, the handle snaps back.

```jsx
import { SlidingButton } from '@arch-ui/components';

<SlidingButton
  label="Slide to confirm payment"
  onConfirm={() => processPayment()}
/>
```

---

## Variants

### Default

A standard sliding track with a directional arrow handle and instructional label.

```jsx
<SlidingButton label="Slide to submit" onConfirm={handleSubmit} />
```

### Danger

Used for destructive actions. The track and handle use danger colour tokens to signal risk.

```jsx
<SlidingButton
  kind="danger"
  label="Slide to delete account"
  onConfirm={handleDelete}
/>
```

---

## States

| State | Description |
|---|---|
| **Idle** | Handle rests at the start of the track. Label is visible. |
| **Dragging** | User is actively dragging the handle. The track may fill with a progress colour. |
| **Confirmed** | Handle has reached the end. The `onConfirm` callback fires and the button shows a success state. |
| **Resetting** | If the user releases early, the handle animates back to the start position. |
| **Disabled** | The handle cannot be dragged. The entire component appears muted. |

---

## Expected props

Since this component is planned and not yet implemented, the following props represent the expected API.

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | -- | Instructional text displayed on the track (e.g. "Slide to confirm"). |
| `onConfirm` | `() => void` | -- | Called when the handle reaches the end of the track. |
| `kind` | `'default' \| 'danger'` | `'default'` | Visual style of the track and handle. |
| `disabled` | `boolean` | `false` | Prevents interaction when true. |
| `threshold` | `number` | `0.95` | Percentage of the track width the handle must cross to trigger confirmation (0 to 1). |
| `className` | `string` | `undefined` | Additional CSS class names on the root element. |

---

## Accessibility

- The handle should have `role="slider"` with `aria-valuemin`, `aria-valuemax`, and `aria-valuenow` reflecting drag progress.
- The label text should be associated with the handle via `aria-label` or `aria-labelledby`.
- Keyboard support: users should be able to hold **Arrow Right** to move the handle and **Enter** to confirm when the threshold is met.
- When disabled, `aria-disabled="true"` should be set on the handle.

---

## Best practices

**Do:**
- Use for irreversible or high-stakes actions (payments, deletions, final confirmations).
- Provide clear, action-oriented label text that describes what will happen.
- Use the danger variant for destructive operations.

**Don't:**
- Do not use for routine actions -- a standard Button is sufficient.
- Do not set the threshold too low, as this defeats the purpose of requiring deliberate intent.
- Do not place more than one SlidingButton on the same screen.

</TabItem>
</Tabs>
