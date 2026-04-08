---
sidebar_label: Date picker
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Input and selection</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Date Picker</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    A calendar-based input for selecting a single date or date range with a dropdown calendar popover.
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

Calendar, date selector, date input

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

Date Picker renders a text input that opens a calendar popover on focus or click. Users can type a date directly or select one from the calendar grid.

```jsx
import { DatePicker } from '@arch-ui/components';

function Example() {
  const [date, setDate] = React.useState(null);

  return (
    <DatePicker
      value={date}
      onChange={setDate}
      placeholder="Select a date"
    />
  );
}
```

### Date range

Select a start and end date for range-based use cases like booking or filtering.

```jsx
<DatePicker
  range
  value={[startDate, endDate]}
  onChange={([start, end]) => {
    setStartDate(start);
    setEndDate(end);
  }}
/>
```

### Min and max dates

Constrain the selectable range to prevent invalid selections.

```jsx
<DatePicker
  value={date}
  onChange={setDate}
  minDate={new Date('2024-01-01')}
  maxDate={new Date('2024-12-31')}
/>
```

---

## Expected props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `Date \| null` | `null` | The currently selected date. |
| `onChange` | `(date: Date \| null) => void` | `undefined` | Called when the selected date changes. |
| `range` | `boolean` | `false` | Enables date range selection. |
| `minDate` | `Date` | `undefined` | Earliest selectable date. |
| `maxDate` | `Date` | `undefined` | Latest selectable date. |
| `placeholder` | `string` | `'Select a date'` | Placeholder text in the input trigger. |
| `disabled` | `boolean` | `false` | Disables the entire picker. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Size variant for the input trigger. |
| `error` | `boolean` | `false` | Shows an error border style. |
| `formatString` | `string` | `'yyyy/MM/dd'` | Date format string for the input display. |

---

## Accessibility

- The calendar grid should use `role="grid"` with `role="gridcell"` for each day.
- Arrow keys navigate between days, months, and years within the calendar.
- The input trigger should announce the selected date to screen readers.
- Escape closes the popover and returns focus to the input.
- Dates outside the min/max range should be marked with `aria-disabled`.

---

## Best practices

**Do:**
- Use Date Picker when users need to select a specific calendar date.
- Provide `minDate` and `maxDate` to prevent out-of-range selections.
- Allow direct keyboard entry in the text input for power users.

**Don't:**
- Do not use Date Picker for time-only selection -- use Time Picker instead.
- Do not use Date Picker for selecting relative dates like "last 7 days" -- use a dropdown with predefined ranges.

</TabItem>
</Tabs>
