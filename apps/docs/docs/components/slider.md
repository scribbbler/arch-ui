---
sidebar_label: Slider
hide_title: true
---

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Input and selection</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Slider</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    A range input for selecting a numeric value within a defined min/max range with custom-styled track and thumb.
  </p>
</div>

---

## Usage

```jsx
import { Slider } from '@arch-ui/components';

function Example() {
  const [volume, setVolume] = React.useState(50);

  return (
    <Slider
      aria-label="Volume"
      value={volume}
      min={0}
      max={100}
      step={5}
      onChange={(v) => setVolume(v)}
    />
  );
}
```

### Uncontrolled

Use `defaultValue` for uncontrolled usage without managing state.

```jsx
<Slider aria-label="Brightness" defaultValue={75} min={0} max={100} />
```

### Custom step

```jsx
<Slider
  aria-label="Price range"
  value={price}
  min={0}
  max={1000}
  step={50}
  onChange={setPrice}
/>
```

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `number` | `undefined` | Current value for controlled usage. |
| `defaultValue` | `number` | `undefined` | Initial value for uncontrolled usage. |
| `min` | `number` | `0` | Minimum allowed value. |
| `max` | `number` | `100` | Maximum allowed value. |
| `step` | `number` | `1` | Increment size for each step. |
| `onChange` | `(value: number) => void` | `undefined` | Called with the numeric value when the slider changes. |
| `disabled` | `boolean` | `false` | Disables the slider. |
| `className` | `string` | `undefined` | Additional CSS class names applied to the wrapper. |

All standard `InputHTMLAttributes` (except `type`, `onChange`, and `value`) are also forwarded.

---

## Accessibility

- Built on the native `<input type="range">`, so `aria-valuemin`, `aria-valuemax`, and `aria-valuenow` are provided automatically.
- Arrow keys step the value. Home and End jump to min and max.
- Always provide an `aria-label` or pair with a visible label via `id` and `<label htmlFor>`.
- Focus is indicated with `color-border-focus` and a 2px outline.
- Touch target meets the 44px minimum.
- The component is `forwardRef` compatible.
- Respects `prefers-reduced-motion` by disabling thumb transitions.

---

## Best practices

**Do:**
- Use Slider when the user needs to select a value from a continuous range.
- Provide a visible label or `aria-label` for context.
- Show the current value alongside the slider when precision matters.

**Don't:**
- Do not use Slider for discrete choices with labels -- use SegmentedControl or Radio.
- Do not use Slider for entering exact numbers -- use Input with `type="number"` or Stepper.

---

## Design tokens

| Token | Role |
|---|---|
| `color-background-muted` | Track background |
| `color-action-primary` | Thumb colour and Firefox progress fill |
| `color-action-primary-hover` | Thumb hover colour |
| `color-action-primary-active` | Thumb active (pressed) colour |
| `color-border-focus` | Focus outline |
| `radius-component-full` | Track and thumb border radius |
| `spacing-4` | Track height |
| `spacing-20` | Thumb diameter |
