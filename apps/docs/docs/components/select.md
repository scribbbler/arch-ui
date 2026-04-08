---
sidebar_label: Select
---

# Select

A native `<select>` element styled consistently with Input. The browser's default arrow is replaced with a custom chevron. Supports placeholder options, multi-select listbox mode, and automatic FormControl integration.

**Status:** Stable

**Common alternative names:** Dropdown, picker, choice list

---

## Usage

```jsx
import { Select } from '@arch-ui/components';

<Select aria-label="Country" placeholder="Select a country">
  <option value="us">United States</option>
  <option value="ca">Canada</option>
  <option value="gb">United Kingdom</option>
</Select>
```

### Inside FormControl

```jsx
import { FormControl, FormLabel, FormErrorMessage, Select } from '@arch-ui/components';

<FormControl id="country" required invalid={hasError}>
  <FormLabel>Country</FormLabel>
  <Select placeholder="Select a country">
    <option value="us">United States</option>
  </Select>
  <FormErrorMessage>Please select a country.</FormErrorMessage>
</FormControl>
```

### Multi-select

When `multiple` is set, the component renders as a native multi-select listbox without the custom chevron.

```jsx
<Select multiple aria-label="Toppings">
  <option value="cheese">Cheese</option>
  <option value="pepperoni">Pepperoni</option>
  <option value="mushrooms">Mushrooms</option>
</Select>
```

---

## Sizes

| Size | Min height | Font scale |
|---|---|---|
| `xs` | 28px | Paragraph XSmall |
| `sm` | 36px | Paragraph Small |
| `md` (default) | 48px | Paragraph Medium |
| `lg` | 56px | Paragraph Large |

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Size variant controlling height, padding, and font size. |
| `placeholder` | `string` | `undefined` | Inserts a disabled empty-value option as a prompt. |
| `multiple` | `boolean` | `false` | Enables multi-select listbox mode. |
| `disabled` | `boolean` | `false` | Disables the select. Also inherited from FormControl. |
| `isError` | `boolean` | `false` | Shows an error border style. |
| `positive` | `boolean` | `false` | Shows a positive (success) border style. |
| `children` | `ReactNode` | `undefined` | `<option>` and `<optgroup>` elements. |
| `className` | `string` | `undefined` | Additional CSS class names applied to the wrapper. |

All standard `SelectHTMLAttributes` (except `size`) are also forwarded.

---

## Accessibility

- Uses the native `<select>` element, so keyboard navigation and screen reader support come from the browser.
- Inherits `id`, `aria-invalid`, `aria-required`, and `aria-describedby` from the nearest FormControl.
- Focus is indicated with `color-border-focus` and a 2px outline.
- The component is `forwardRef` compatible.

---

## Best practices

**Do:**
- Use Select for 5+ options where the user picks one value.
- Provide a `placeholder` to prompt the user.
- Use `<optgroup>` to organise long lists of options.

**Don't:**
- Do not use Select for 2-3 options -- use Radio or SegmentedControl instead.
- Do not use Select for searchable/filterable lists -- use Combobox instead.

---

## Design tokens

| Token | Role |
|---|---|
| `color-background-default` | Select background |
| `color-border-default` | Default border |
| `color-border-focus` | Focus border and outline |
| `color-border-danger` | Error state border |
| `color-border-success` | Positive state border |
| `color-background-disabled` | Disabled background |
| `radius-component-md` | Border radius (md, lg sizes) |
| `radius-sm` | Border radius (xs, sm sizes) |
