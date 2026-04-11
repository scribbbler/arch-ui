---
sidebar_label: Select
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>INPUT AND SELECTION</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Select</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    A styled native select element with placeholder options, multi-select listbox mode, and FormControl integration.
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

Dropdown, picker, native select, select box

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

</TabItem>
</Tabs>
