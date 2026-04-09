---
sidebar_label: Checkbox
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>INPUT AND SELECTION</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Checkbox</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    A toggle control that allows a user to select or deselect an option with checked, indeterminate, and error states.
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

Check, tick box, check mark

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

</TabItem>
</Tabs>
