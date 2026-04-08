---
sidebar_label: Page controls
---

# Page Controls

A set of indicator dots (or short dashes) that represent the total number of pages or steps in a carousel, onboarding flow, or slideshow. Page Controls communicate progress and allow direct navigation to a specific page by tapping a dot.

## Usage

```jsx
import { PageControls } from '@arch-ui/components';

function ImageCarousel({ images }) {
  const [current, setCurrent] = useState(0);

  return (
    <div>
      <img src={images[current]} alt="" />
      <PageControls
        total={images.length}
        current={current}
        onChange={setCurrent}
      />
    </div>
  );
}
```

## Expected props

| Prop | Type | Default | Description |
|---|---|---|---|
| `total` | `number` | -- | Total number of pages or steps. |
| `current` | `number` | -- | Zero-indexed active page. |
| `onChange` | `(index: number) => void` | -- | Called when the user taps a dot to navigate directly. |
| `size` | `'sm' \| 'md'` | `'md'` | Dot size. |
| `className` | `string` | -- | Additional class names. |

## States

- **Active** -- the current dot is filled with the primary accent colour and may be slightly larger than inactive dots.
- **Inactive** -- remaining dots use a muted fill to indicate available pages.
- **Interactive** -- each dot is a tappable target that navigates to the corresponding page.

## When to use

- Carousels and slideshows where the total page count is small (typically fewer than eight).
- Onboarding flows to show step progress.
- Content pagers where thumbnails would take too much space.

## When not to use

- Large data sets with many pages. Use Pagination instead.
- Flows where the user must complete steps in order. Use a stepper or progress indicator.

## Accessibility

- Renders as a `<nav>` or list with `aria-label="Page controls"`.
- Each dot should be a focusable button with an `aria-label` such as "Go to page 3".
- The active dot should carry `aria-current="true"`.
- Ensure the tap target for each dot meets the minimum 44x44 px touch target guideline, even if the visual dot is smaller.
