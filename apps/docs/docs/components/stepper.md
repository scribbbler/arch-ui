---
sidebar_label: Stepper
---

# Stepper

A numeric input with increment and decrement buttons for adjusting a value by discrete steps. Renders a minus button, a value display, and a plus button in a horizontal row.

**Status:** Stable

**Common alternative names:** Number stepper, quantity selector, counter, spin button

---

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
