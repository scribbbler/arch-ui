---
sidebar_label: Stepper
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>INPUT AND SELECTION</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Stepper</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    A numeric input with increment and decrement buttons for adjusting a value by discrete steps.
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

Number input, quantity selector, numeric stepper, counter

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
import { Stepper } from '@arch-ui/components';

function Example() {
  const [count, setCount] = React.useState(1);

  return <Stepper value={count} onChange={setCount} min={0} max={10} />;
}
```

### Custom step

```jsx
<Stepper value={quantity} onChange={setQuantity} step={5} min={0} max={100} />
```

### Disabled

```jsx
<Stepper value={3} onChange={setCount} disabled />
```

---

## Sizes

| Size | Height | Font scale |
|---|---|---|
| `mini` | 28px | Paragraph XSmall |
| `compact` | 36px | Paragraph Small |
| `default` | 48px | Paragraph Medium |
| `large` | 56px | Paragraph Large |

```jsx
<Stepper size="compact" value={count} onChange={setCount} />
```

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `number` | required | Current numeric value. |
| `onChange` | `(value: number) => void` | required | Called when the value changes. |
| `min` | `number` | `0` | Minimum allowed value. The decrement button disables at this value. |
| `max` | `number` | `Infinity` | Maximum allowed value. The increment button disables at this value. |
| `step` | `number` | `1` | Increment/decrement amount. |
| `size` | `'mini' \| 'compact' \| 'default' \| 'large'` | `'default'` | Size variant controlling height and font size. |
| `disabled` | `boolean` | `false` | Disables both buttons and the value display. |
| `className` | `string` | `undefined` | Additional CSS class names applied to the outer wrapper. |

---

## Accessibility

- The root element uses `role="group"` with `aria-label="Stepper"`.
- The decrement button uses `aria-label="Decrease value"` and the increment button uses `aria-label="Increase value"`.
- The value display uses `aria-live="polite"` to announce value changes.
- Buttons automatically disable at min/max boundaries to prevent invalid values.
- The component uses the internal Button component, which provides focus-visible styling.
- The component is `forwardRef` compatible.

---

## Best practices

**Do:**
- Use Stepper for small numeric adjustments where the range is limited (e.g., quantity selectors).
- Set `min` and `max` to prevent out-of-range values.
- Use a `step` that matches the expected increment (e.g., 5 for quantities sold in packs of 5).

**Don't:**
- Do not use Stepper for large numeric ranges -- use Slider or Input with `type="number"` instead.
- Do not use Stepper for non-numeric values.

---

## Design tokens

| Token | Role |
|---|---|
| `color-border-default` | Container and value display borders |
| `color-background-default` | Value display background |
| `color-text-default` | Value text colour |
| `radius-component-md` | Container corner radius |

</TabItem>
</Tabs>
