---
sidebar_label: Timed button
hide_title: true
---

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Buttons</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Timed Button</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    A button that becomes actionable only after a countdown timer completes, giving users time to reconsider.
  </p>
</div>

---

## Usage

TimedButton renders as a disabled button with a visible countdown. Once the timer reaches zero, the button becomes enabled and the user can click to confirm. This pattern is commonly used for irreversible actions like account deletion or bulk operations.

```jsx
import { TimedButton } from '@arch-ui/components';

<TimedButton
  duration={5}
  onConfirm={() => deleteAccount()}
>
  Delete account
</TimedButton>
```

While the timer is active, the button label displays the remaining seconds (e.g. "Delete account (5s)"). When the countdown finishes, the label returns to its original text and the button becomes clickable.

---

## Variants

### Default

A standard timed button that counts down and then enables.

```jsx
<TimedButton duration={5} onConfirm={handleConfirm}>
  Confirm transfer
</TimedButton>
```

### Danger

Used for destructive actions. Applies danger colour tokens to reinforce the severity of the action.

```jsx
<TimedButton duration={10} kind="danger" onConfirm={handleDelete}>
  Permanently delete
</TimedButton>
```

---

## States

| State | Description |
|---|---|
| **Counting down** | The button is disabled and displays the remaining seconds alongside the label. A visual indicator (progress ring or bar) may show elapsed time. |
| **Ready** | The countdown has finished. The button is enabled and ready for interaction. |
| **Confirmed** | The user has clicked the button after the countdown. The `onConfirm` callback fires. |
| **Disabled** | The component is externally disabled regardless of the timer state. |

---

## Expected props

Since this component is planned and not yet implemented, the following props represent the expected API.

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | -- | Button label text. |
| `duration` | `number` | `5` | Countdown duration in seconds. |
| `onConfirm` | `() => void` | -- | Called when the user clicks the button after the countdown completes. |
| `kind` | `'primary' \| 'danger'` | `'primary'` | Visual style of the button. |
| `size` | `'compact' \| 'default' \| 'large'` | `'default'` | Button size. |
| `autoStart` | `boolean` | `true` | Whether the countdown begins automatically on mount. When false, a `start` method or trigger is needed. |
| `disabled` | `boolean` | `false` | Disables the button regardless of timer state. |
| `className` | `string` | `undefined` | Additional CSS class names on the root element. |

---

## Accessibility

- During the countdown, the button should have `aria-disabled="true"` and an `aria-live="polite"` region to announce remaining time to screen readers.
- The countdown text should be part of the accessible label so users know the button is not yet actionable (e.g. "Delete account, 3 seconds remaining").
- Once enabled, standard button accessibility applies: focusable, activatable with **Enter** or **Space**.
- Avoid relying solely on colour to communicate state -- the countdown text provides the primary affordance.

---

## Best practices

**Do:**
- Use for destructive or irreversible actions where an accidental click has serious consequences.
- Set the duration long enough for users to read surrounding context (5 to 10 seconds is typical).
- Pair with a clear explanation of what will happen when the button is clicked.

**Don't:**
- Do not use for routine actions -- the enforced delay frustrates users when stakes are low.
- Do not set the duration excessively long (over 15 seconds), as users may abandon the flow.
- Do not hide the countdown -- always show the remaining time visually and in the label text.
