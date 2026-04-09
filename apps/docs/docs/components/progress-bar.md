---
sidebar_label: Progress bar
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>INDICATORS AND STATUS</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Progress bar</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    A linear progress indicator for operations with measurable completion or unknown duration.
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

Loading bar, Progress indicator

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
import { ProgressBar } from '@arch-ui/components';

function Example() {
  return (
    <ProgressBar value={45} label="Uploading file" />
  );
}
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | Current progress from 0 to 100. Ignored when `indeterminate` is true. |
| `indeterminate` | `boolean` | `false` | Displays an animated bar for operations of unknown duration. |
| `size` | `'sm' \| 'md'` | `'md'` | Height of the track. `sm` is 4px, `md` is 8px. |
| `label` | `string` | `undefined` | Accessible label applied as `aria-label`. Required for screen readers. |
| `successValue` | `number` | `100` | Value at which the bar switches to a success state. |
| `showLabel` | `boolean` | `false` | Renders a percentage label alongside the bar. |
| `className` | `string` | `undefined` | Additional CSS class names applied to the root element. |

All standard `div` HTML attributes are also supported via rest props.

---

## Determinate

The default mode. Set `value` to a number between 0 and 100. The fill width transitions smoothly as the value changes.

```jsx
<ProgressBar value={25} label="Step 1 of 4" />
<ProgressBar value={75} label="Uploading" />
<ProgressBar value={100} label="Complete" />
```

---

## Indeterminate

Use `indeterminate` when the operation length is unknown. The bar animates continuously. `value` is ignored and `aria-valuenow` is omitted.

```jsx
<ProgressBar indeterminate label="Loading data" />
```

---

## Sizes

```jsx
<ProgressBar value={60} size="sm" label="Small bar" />
<ProgressBar value={60} size="md" label="Medium bar" />
```

---

## Percentage label

Set `showLabel` to display the current percentage next to the bar. The label is `aria-hidden` since the progress value is already communicated through ARIA attributes.

```jsx
<ProgressBar value={63} showLabel label="Upload progress" />
```

The label is only shown in determinate mode. It is hidden when `indeterminate` is true.

---

## Success state

When the value reaches `successValue` (default 100), the fill colour changes to the success feedback token. This provides a clear visual signal that the operation completed.

```jsx
<ProgressBar value={100} label="Upload complete" />

{/* Custom success threshold */}
<ProgressBar value={80} successValue={80} label="Minimum reached" />
```

---

## Accessibility

- The component uses `role="progressbar"` with `aria-valuemin`, `aria-valuemax`, and `aria-valuenow`.
- Always provide a `label` prop so screen readers can identify the progress bar.
- In indeterminate mode, `aria-valuenow` is omitted, which tells assistive technology that the progress is unknown.
- When `prefers-reduced-motion: reduce` is active, the fill transition and indeterminate animation are both disabled.

</TabItem>
</Tabs>
