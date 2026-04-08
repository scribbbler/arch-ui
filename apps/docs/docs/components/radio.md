---
sidebar_label: Radio
---

# Radio

A single option within a mutually exclusive group. Renders a native radio input with a custom visual circle. Must be used inside a RadioGroup, which provides the group name, selected value, and change handler via context.

**Status:** Stable

**Common alternative names:** Radio button, option button

---

## Usage

Radio must always be used inside a RadioGroup. The group manages selection state and keyboard navigation.

```jsx
import { RadioGroup, Radio } from '@arch-ui/components';

function Example() {
  const [size, setSize] = React.useState('md');

  return (
    <RadioGroup legend="Size" name="size" value={size} onChange={setSize}>
      <Radio value="sm">Small</Radio>
      <Radio value="md">Medium</Radio>
      <Radio value="lg">Large</Radio>
    </RadioGroup>
  );
}
```

### Disabled individual option

```jsx
<RadioGroup legend="Plan" name="plan" value={plan} onChange={setPlan}>
  <Radio value="free">Free</Radio>
  <Radio value="pro">Pro</Radio>
  <Radio value="enterprise" disabled>Enterprise (coming soon)</Radio>
</RadioGroup>
```

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | required | The value this radio represents. Compared against the RadioGroup's selected value. |
| `disabled` | `boolean` | `false` | Disables this radio. Also disabled if the parent RadioGroup is disabled. |
| `children` | `ReactNode` | `undefined` | Label content rendered next to the radio circle. |
| `className` | `string` | `undefined` | Additional CSS class names for the wrapper. |
| `id` | `string` | auto-generated | Forwarded to the native input element. |

---

## Accessibility

- Renders a real `<input type="radio">` that is visually hidden but accessible to screen readers.
- Follows the ARIA radio group pattern: only the selected radio (or the first in the group) is tabbable (`tabIndex=0`), while others use `tabIndex=-1`. Arrow keys move selection within the group.
- `aria-checked` reflects the selected state.
- Focus is indicated with a visible outline using `color-border-focus`.
- Minimum touch target of 44px is enforced.
- The component is `forwardRef` compatible.

---

## Best practices

**Do:**
- Always use Radio inside a RadioGroup with a descriptive `legend`.
- Use Radio when only one option can be selected from a group.
- Keep the number of options manageable (2-7 is ideal).

**Don't:**
- Do not use Radio outside of a RadioGroup -- it depends on group context.
- Do not use Radio for multi-select -- use Checkbox instead.
- Do not use Radio for binary on/off toggles -- use Toggle instead.

---

## Design tokens

| Token | Role |
|---|---|
| `color-border-default` | Unselected circle border |
| `color-action-primary` | Selected circle background and border |
| `color-action-primary-text` | Inner dot colour |
| `color-background-disabled` | Disabled circle background |
| `color-border-focus` | Focus outline |
| `spacing-4` | Gap between radio and label |
| `spacing-18` | Radio circle size |
