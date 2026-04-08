---
sidebar_label: Time picker
---

# Time Picker

A time selection input that allows users to pick a time of day. Typically renders as a dropdown of time slots at configurable intervals, or as a set of hour/minute/period inputs.

**Status:** Planned

**Common alternative names:** Time selector, time input, time dropdown

---

## Usage

Time Picker provides a structured way to select a time value. It can be used standalone or alongside a Date Picker for full datetime selection.

```jsx
import { TimePicker } from '@arch-ui/components';

function Example() {
  const [time, setTime] = React.useState(null);

  return (
    <TimePicker
      value={time}
      onChange={setTime}
      placeholder="Select a time"
    />
  );
}
```

### With step intervals

Show time slots at specific intervals (e.g., every 15 or 30 minutes).

```jsx
<TimePicker
  value={time}
  onChange={setTime}
  step={900}  // 15 minutes in seconds
/>
```

### 24-hour format

```jsx
<TimePicker
  value={time}
  onChange={setTime}
  format="24"
/>
```

### Min and max time

Constrain the selectable time range.

```jsx
<TimePicker
  value={time}
  onChange={setTime}
  minTime="09:00"
  maxTime="17:00"
/>
```

---

## Expected props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string \| null` | `null` | The currently selected time in `HH:mm` format. |
| `onChange` | `(time: string \| null) => void` | `undefined` | Called when the selected time changes. |
| `step` | `number` | `3600` | Time slot interval in seconds (e.g., 900 for 15 minutes). |
| `format` | `'12' \| '24'` | `'12'` | Clock format. |
| `minTime` | `string` | `undefined` | Earliest selectable time in `HH:mm` format. |
| `maxTime` | `string` | `undefined` | Latest selectable time in `HH:mm` format. |
| `placeholder` | `string` | `'Select a time'` | Placeholder text in the input. |
| `disabled` | `boolean` | `false` | Disables the picker. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Size variant for the input. |
| `error` | `boolean` | `false` | Shows an error border style. |

---

## Accessibility

- The input trigger should use `role="combobox"` with `aria-expanded` when the dropdown is open.
- Time slots in the dropdown should use `role="listbox"` and `role="option"`.
- Arrow keys should navigate between time slots.
- Escape closes the dropdown and returns focus to the input.
- Times outside the min/max range should be disabled with `aria-disabled`.
- The selected time should be announced to screen readers when changed.

---

## Best practices

**Do:**
- Use Time Picker when users need to select a specific time of day.
- Set `step` to match the booking or scheduling granularity (e.g., 15 or 30 minutes).
- Use `minTime` and `maxTime` to constrain to business hours or valid ranges.

**Don't:**
- Do not use Time Picker for duration input (e.g., "2 hours 30 minutes") -- use separate number fields.
- Do not use Time Picker for date selection -- use Date Picker instead.
- Do not set `step` to very small values (e.g., 60 seconds) as it creates an impractically long list.
