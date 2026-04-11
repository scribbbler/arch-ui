---
sidebar_label: Breadcrumbs
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>NAVIGATION</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Breadcrumbs</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    An accessible breadcrumb trail that helps users understand their position within a site hierarchy.
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

Breadcrumb trail, navigation path, crumbs

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

---

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

---

## Custom separator

Replace the default `/` separator with any React node -- an icon, a chevron character, or a custom component.

```jsx
<Breadcrumbs
  items={items}
  separator={<span aria-hidden="true">&#8250;</span>}
/>
```

---

## Accessibility

- Wraps the trail in `<nav aria-label="Breadcrumb">` so screen readers can identify the landmark.
- Items are rendered inside an `<ol>` to convey order.
- The last item renders as a `<span>` with `aria-current="page"` instead of a link, since it represents the current location.
- Separator elements have `aria-hidden="true"` so they are not announced by screen readers.

</TabItem>
</Tabs>
