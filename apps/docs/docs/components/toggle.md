---
sidebar_label: Toggle
---

# Toggle

A binary on/off toggle rendered as a styled checkbox with `role="switch"`. The thumb slides between two positions to communicate state without relying on colour alone. Integrates with FormControl for disabled and required state inheritance.

**Status:** Stable

**Common alternative names:** Switch, toggle switch, on/off switch

---

## Usage

```jsx
import { Toggle } from '@arch-ui/components';

function Example() {
  const [enabled, setEnabled] = React.useState(false);

  return (
    <Toggle
      checked={enabled}
      onChange={(e) => setEnabled(e.target.checked)}
    >
      Enable notifications
    </Toggle>
  );
}
```

### Without label text

When no visible label is provided, use `aria-label` for screen reader context.

```jsx
<Toggle
  aria-label="Dark mode"
  checked={isDark}
  onChange={(e) => setIsDark(e.target.checked)}
/>
```

### Inside FormControl

```jsx
import { FormControl, Toggle } from '@arch-ui/components';

<FormControl id="notifications" disabled>
  <Toggle>Enable notifications</Toggle>
</FormControl>
```

---

## Sizes

| Size | Track dimensions | Thumb diameter |
|---|---|---|
| `xs` | 28 x 14 px | 10px |
| `sm` | 38 x 20 px | 16px |
| `md` (default) | 44 x 24 px | 20px |

```jsx
<Toggle size="sm">Compact toggle</Toggle>
```

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean` | `undefined` | Whether the toggle is in the on (checked) state. |
| `disabled` | `boolean` | `false` | Disables the toggle. Also inherited from FormControl. |
| `onChange` | `(e: ChangeEvent) => void` | `undefined` | Called when the checked state changes. |
| `children` | `ReactNode` | `undefined` | Optional label text rendered beside the track. |
| `size` | `'xs' \| 'sm' \| 'md'` | `'md'` | Size variant controlling track and thumb dimensions. |
| `className` | `string` | `undefined` | Additional CSS class names for the wrapper. |

All standard `InputHTMLAttributes` (except `size` and `type`) are also forwarded.

---

## Accessibility

- Uses `role="switch"` on the underlying checkbox input for correct screen reader semantics.
- `aria-checked` reflects the current on/off state.
- Focus-visible is relayed from the hidden input to the visual track.
- The thumb position communicates state without relying on colour alone.
- Minimum touch target of 44px is enforced on the wrapper.
- Respects `prefers-reduced-motion` by disabling thumb and track transitions.
- The component is `forwardRef` compatible.

---

## Best practices

**Do:**
- Use Toggle for settings that take effect immediately (e.g., enable/disable a feature).
- Always provide either a visible label via `children` or an `aria-label`.
- Use the appropriate size for the context -- `sm` for dense UIs, `md` for standard forms.

**Don't:**
- Do not use Toggle for form fields that require a submit action -- use Checkbox instead.
- Do not use Toggle for multi-option selection -- use Checkbox or Radio.

---

## Design tokens

| Token | Role |
|---|---|
| `color-background-muted` | Track background (off state) |
| `color-action-primary` | Track background (on state) |
| `color-action-primary-hover` | Track hover colour (on state) |
| `color-background-default` | Thumb colour |
| `color-border-default` | Track border (off state) |
| `color-border-focus` | Focus outline |
| `color-text-default` | Label text colour |
