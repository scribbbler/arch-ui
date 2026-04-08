---
sidebar_label: Radio
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Input and selection</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Radio</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    A single option within a mutually exclusive group, rendered as a native radio input with a custom visual.
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

Radio button, option button, radio group

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

</TabItem>
</Tabs>
