---
sidebar_label: Progress circle
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>INDICATORS AND STATUS</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Progress circle</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    A circular progress indicator that communicates completion percentage in a compact, radial format.
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

Circular progress, Radial progress, Donut loader

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
import { ProgressCircle } from '@arch-ui/components';

function Example() {
  return (
    <ProgressCircle value={72} label="Profile completeness" />
  );
}
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | Current progress from 0 to 100. Ignored when `indeterminate` is true. |
| `indeterminate` | `boolean` | `false` | Displays a continuously spinning ring for operations of unknown duration. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Diameter of the circle. |
| `label` | `string` | `undefined` | Accessible label applied as `aria-label`. Required for screen readers. |
| `showValue` | `boolean` | `false` | Renders the numeric percentage inside the circle. |
| `children` | `ReactNode` | `undefined` | Custom content rendered inside the circle, such as an icon. |
| `className` | `string` | `undefined` | Additional CSS class names applied to the root element. |

---

## Determinate

Set `value` between 0 and 100. The ring fills clockwise from the top.

```jsx
<ProgressCircle value={25} label="25% complete" />
<ProgressCircle value={75} label="75% complete" />
<ProgressCircle value={100} label="Complete" />
```

---

## Indeterminate

Use `indeterminate` for operations where the total duration is unknown. The ring animates continuously.

```jsx
<ProgressCircle indeterminate label="Processing" />
```

---

## Sizes

```jsx
<ProgressCircle value={50} size="sm" label="Small" />
<ProgressCircle value={50} size="md" label="Medium" />
<ProgressCircle value={50} size="lg" label="Large" />
```

---

## Showing the value

Set `showValue` to display the percentage number inside the ring.

```jsx
<ProgressCircle value={68} showValue label="Storage used" />
```

---

## Custom inner content

Pass `children` to render an icon or custom element inside the circle instead of the numeric value.

```jsx
<ProgressCircle value={100} label="Upload complete">
  <CheckIcon />
</ProgressCircle>
```

---

## Guidelines

- Prefer Progress Bar for inline or full-width indicators. Use Progress Circle when the radial shape fits the layout better, such as in dashboards or cards.
- Avoid placing too many Progress Circles in a single view. They work best as focal points, not repeated inline indicators.
- When both `showValue` and `children` are provided, `children` takes precedence.

---

## Accessibility

- The component uses `role="progressbar"` with `aria-valuemin`, `aria-valuemax`, and `aria-valuenow`.
- Always provide a `label` prop so screen readers can identify the purpose of the indicator.
- In indeterminate mode, `aria-valuenow` is omitted.
- The circle animation respects `prefers-reduced-motion`.

</TabItem>
</Tabs>
