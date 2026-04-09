---
sidebar_label: Text field
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>INPUT AND SELECTION</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Text field</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    A single-line text input with multiple sizes, leading/trailing slots, and FormControl integration.
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

Input, text input, text box

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

Text Field is the display name used in the Uber Base design system for the Input component. Import and use `Input` from the component library.

```jsx
import { Input } from '@arch-ui/components';

<Input type="email" placeholder="you@example.com" />
```

### Inside FormControl

When placed inside a FormControl, the Input automatically inherits the field id, required state, disabled state, invalid state, and `aria-describedby` wiring.

```jsx
import { FormControl, FormLabel, FormErrorMessage, Input } from '@arch-ui/components';

<FormControl id="email" required invalid={hasError}>
  <FormLabel>Email</FormLabel>
  <Input type="email" />
  <FormErrorMessage>A valid email is required.</FormErrorMessage>
</FormControl>
```

### With leading and trailing elements

Use `leftElement` and `rightElement` to place icons or other decorative content.

```jsx
<Input
  leftElement={<SearchIcon />}
  placeholder="Search..."
/>
```

### Clearable

Show a clear button when the input has a value.

```jsx
<Input
  clearable
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  placeholder="Search..."
/>
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
| `type` | `'text' \| 'email' \| 'password' \| 'number' \| 'search' \| 'url' \| 'tel'` | `'text'` | HTML input type. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Size variant controlling height, padding, and font size. |
| `leftElement` | `ReactNode` | `undefined` | Node rendered in the leading (inline-start) slot. |
| `rightElement` | `ReactNode` | `undefined` | Node rendered in the trailing (inline-end) slot. |
| `clearable` | `boolean` | `false` | Shows a clear button when the input has a value. |
| `positive` | `boolean` | `false` | Shows a positive (success) border style. |
| `disabled` | `boolean` | `false` | Disables the input. Also inherited from FormControl. |
| `readOnly` | `boolean` | `false` | Makes the input read-only with a subtle background. |
| `className` | `string` | `undefined` | Additional CSS class names applied to the outer wrapper. |

All standard `InputHTMLAttributes` (except `size` and `type`) are also forwarded.

---

## Accessibility

- Inherits `id`, `aria-invalid`, `aria-required`, and `aria-describedby` from the nearest FormControl.
- Focus is indicated with `color-border-focus` and a 2px outline.
- The clear button uses `aria-label="Clear input"` and is excluded from the tab order.
- Leading and trailing elements are marked `aria-hidden="true"` since they are decorative.
- The component is `forwardRef` compatible.

---

## Best practices

**Do:**
- Use appropriate `type` values to trigger correct mobile keyboards.
- Pair with FormControl for proper labelling and error messaging.

**Don't:**
- Do not use Text Field for multi-line text -- use Textarea instead.
- Do not place interactive elements in the element slots -- they are decorative.

---

## Design tokens

| Token | Role |
|---|---|
| `color-background-default` | Input background |
| `color-border-default` | Default border |
| `color-border-focus` | Focus border and outline |
| `color-border-danger` | Invalid state border |
| `color-border-success` | Positive state border |
| `color-text-placeholder` | Placeholder text |
| `color-background-disabled` | Disabled background |
| `radius-component-md` | Border radius (md, lg sizes) |
| `radius-sm` | Border radius (xs, sm sizes) |

</TabItem>
</Tabs>
