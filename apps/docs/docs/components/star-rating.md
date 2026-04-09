---
sidebar_label: Star rating
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>INPUT AND SELECTION</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Star rating</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    An interactive rating control that lets users select a score by clicking or tapping star icons.
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

Rating, review stars, score selector

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

Star Rating renders a row of star icons. Clicking a star selects that rating value. Hovering previews the potential selection.

```jsx
import { StarRating } from '@arch-ui/components';

function Example() {
  const [rating, setRating] = React.useState(0);

  return (
    <StarRating
      value={rating}
      onChange={setRating}
      aria-label="Product rating"
    />
  );
}
```

### Custom star count

```jsx
<StarRating value={rating} onChange={setRating} numStars={10} />
```

### Read-only display

Show a rating without allowing interaction.

```jsx
<StarRating value={4.5} readOnly />
```

### Half-star precision

```jsx
<StarRating value={3.5} onChange={setRating} precision={0.5} />
```

---

## Expected props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `number` | `0` | The current rating value. |
| `onChange` | `(value: number) => void` | `undefined` | Called when the user selects a rating. |
| `numStars` | `number` | `5` | Total number of stars to display. |
| `precision` | `0.5 \| 1` | `1` | Whether to allow half-star increments. |
| `readOnly` | `boolean` | `false` | Displays the rating without allowing interaction. |
| `disabled` | `boolean` | `false` | Disables the rating control. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the star icons. |

---

## Accessibility

- Each star should be a radio button within a `role="radiogroup"` for proper screen reader support.
- Arrow keys should navigate between stars.
- The component should announce the selected value (e.g., "3 out of 5 stars").
- Read-only mode should use `aria-readonly` rather than `aria-disabled`.
- Always provide an `aria-label` describing what is being rated.

---

## Best practices

**Do:**
- Use Star Rating for subjective feedback where a numeric scale is intuitive.
- Provide a visible label describing what is being rated.
- Show the numeric value alongside the stars for clarity.

**Don't:**
- Do not use Star Rating for precise numeric input -- use Slider or Input instead.
- Do not use more than 10 stars -- scales beyond 10 become hard to differentiate.
- Do not rely on colour alone to distinguish filled from empty stars.

</TabItem>
</Tabs>
