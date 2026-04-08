---
sidebar_label: Checkbox
---

# Checkbox

A toggle control that allows a user to select or deselect an option. Renders a native checkbox input with a custom visual overlay. Supports checked, indeterminate, disabled, and error states.

**Status:** Stable

**Common alternative names:** Check, tick box, check mark

---

## Usage

```jsx
import { Checkbox } from '@arch-ui/components';

function Example() {
  const [checked, setChecked] = React.useState(false);

  return (
    <Checkbox
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    >
      Accept terms and conditions
    </Checkbox>
  );
}
```

### Indeterminate state

Used to represent a partially selected group, such as a "select all" checkbox where only some children are checked.

```jsx
<Checkbox
  indeterminate={true}
  onChange={handleSelectAll}
>
  Select all
</Checkbox>
```

### Label placement

Position the label relative to the checkbox using the `labelPlacement` prop.

```jsx
<Checkbox labelPlacement="start">Label before checkbox</Checkbox>
<Checkbox labelPlacement="top">Label above</Checkbox>
<Checkbox labelPlacement="bottom">Label below</Checkbox>
```

### Error state

```jsx
<Checkbox isError checked={false}>
  I agree to the terms
</Checkbox>
```

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean` | `false` | Whether the checkbox is checked. |
| `indeterminate` | `boolean` | `false` | Shows an indeterminate (mixed) state. Sets `aria-checked="mixed"`. |
| `disabled` | `boolean` | `false` | Disables the checkbox. |
| `isError` | `boolean` | `false` | Shows error styling with a danger border. |
| `onChange` | `(e: ChangeEvent) => void` | `undefined` | Called when the checked state changes. |
| `children` | `ReactNode` | `undefined` | Label content rendered next to the checkbox. |
| `labelPlacement` | `'end' \| 'start' \| 'top' \| 'bottom'` | `'end'` | Position of the label relative to the checkbox. |
| `className` | `string` | `undefined` | Additional CSS class names for the wrapper. |
| `id` | `string` | auto-generated | Forwarded to the native input element. |
| `name` | `string` | `undefined` | Name attribute forwarded to the native input. |
| `value` | `string` | `undefined` | Value attribute forwarded to the native input. |

---

## Accessibility

- Renders a real `<input type="checkbox">` that is visually hidden but accessible to screen readers and keyboard navigation.
- The indeterminate state sets `aria-checked="mixed"` for assistive technology.
- Error state sets `aria-invalid` on the input.
- Focus is indicated with a visible outline using `color-border-focus`.
- Minimum touch target of 44px is enforced.
- The component is `forwardRef` compatible for imperative access to the underlying input.

---

## Best practices

**Do:**
- Use Checkbox for binary choices or multi-select lists.
- Provide a visible label through the `children` prop whenever possible.
- Use `indeterminate` for parent checkboxes that represent a partially selected group.

**Don't:**
- Do not use Checkbox for mutually exclusive options -- use Radio instead.
- Do not use Checkbox as a toggle switch for instant actions -- use Toggle instead.

---

## Design tokens

| Token | Role |
|---|---|
| `color-border-default` | Unchecked border |
| `color-action-primary` | Checked/indeterminate background and border |
| `color-action-primary-text` | Checkmark and dash colour |
| `color-border-danger` | Error state border |
| `color-background-disabled` | Disabled background |
| `color-border-focus` | Focus outline |
| `spacing-4` | Gap between checkbox and label |
| `radius-component-sm` | Checkbox corner radius |
