---
sidebar_label: Breadcrumbs
---

# Breadcrumbs

An accessible breadcrumb trail that helps users understand their position within a site hierarchy and navigate back to parent pages. Breadcrumbs renders a `<nav>` landmark containing an ordered list of links, with the last item representing the current page.

## Usage

```jsx
import { Breadcrumbs } from '@arch-ui/components';

function ProductPage() {
  return (
    <Breadcrumbs
      items={[
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Running shoes' },
      ]}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `BreadcrumbItem[]` | -- | Ordered array of breadcrumb items. The last item is treated as the current page. Required. |
| `separator` | `ReactNode` | `'/'` | Separator rendered between items. |
| `className` | `string` | -- | Additional class names applied to the `<nav>` element. |

### BreadcrumbItem

| Prop | Type | Description |
|---|---|---|
| `label` | `string` | Visible text for this breadcrumb step. Required. |
| `href` | `string` | The URL this step links to. Omit for the last (current) item. |

Breadcrumbs supports `ref` forwarding to the `<nav>` element.

## Custom separator

Replace the default `/` separator with any React node -- an icon, a chevron character, or a custom component.

```jsx
<Breadcrumbs
  items={items}
  separator={<span aria-hidden="true">&#8250;</span>}
/>
```

## Accessibility

- Wraps the trail in `<nav aria-label="Breadcrumb">` so screen readers can identify the landmark.
- Items are rendered inside an `<ol>` to convey order.
- The last item renders as a `<span>` with `aria-current="page"` instead of a link, since it represents the current location.
- Separator elements have `aria-hidden="true"` so they are not announced by screen readers.
