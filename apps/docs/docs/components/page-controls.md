---
sidebar_label: Page controls
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>NAVIGATION</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Page controls</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    A set of indicator dots representing pages or steps in a carousel, onboarding flow, or slideshow.
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

Page dots, page indicator, carousel dots

---

Usage guidelines coming soon.

</TabItem>
<TabItem value="specs" label="Specs">

Specs coming soon.

</TabItem>
<TabItem value="content" label="Content">

Content guidelines coming soon.

</TabItem>
<TabItem value="changelog" label="Status & changelog">

Status & changelog coming soon.

</TabItem>
<TabItem value="code" label="Code">

---

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

---

## Expected props

| Prop | Type | Default | Description |
|---|---|---|---|
| `total` | `number` | -- | Total number of pages or steps. |
| `current` | `number` | -- | Zero-indexed active page. |
| `onChange` | `(index: number) => void` | -- | Called when the user taps a dot to navigate directly. |
| `size` | `'sm' \| 'md'` | `'md'` | Dot size. |
| `className` | `string` | -- | Additional class names. |

---

## States

- **Active** -- the current dot is filled with the primary accent colour and may be slightly larger than inactive dots.
- **Inactive** -- remaining dots use a muted fill to indicate available pages.
- **Interactive** -- each dot is a tappable target that navigates to the corresponding page.

---

## When to use

- Carousels and slideshows where the total page count is small (typically fewer than eight).
- Onboarding flows to show step progress.
- Content pagers where thumbnails would take too much space.

---

## When not to use

- Large data sets with many pages. Use Pagination instead.
- Flows where the user must complete steps in order. Use a stepper or progress indicator.

---

## Accessibility

- Renders as a `<nav>` or list with `aria-label="Page controls"`.
- Each dot should be a focusable button with an `aria-label` such as "Go to page 3".
- The active dot should carry `aria-current="true"`.
- Ensure the tap target for each dot meets the minimum 44x44 px touch target guideline, even if the visual dot is smaller.

</TabItem>
</Tabs>
