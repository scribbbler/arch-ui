---
sidebar_label: Star rating
---

# Star Rating

An interactive rating control that lets users select a score by clicking or tapping star icons. Commonly used for product reviews, feedback forms, and satisfaction surveys.

**Status:** Planned

**Common alternative names:** Rating, review stars, score picker

---

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
