---
sidebar_label: Time picker
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Input and selection</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Time Picker</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    A time selection input for picking a time of day via a dropdown of time slots at configurable intervals.
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

Time selector, time input, clock picker

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

</TabItem>
</Tabs>
