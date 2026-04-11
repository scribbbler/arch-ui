---
sidebar_label: Link
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>NAVIGATION</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Link</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    An accessible anchor element for inline and standalone navigation with colour variants and external link indicators.
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

Anchor, hyperlink, text link

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
import { Link } from '@arch-ui/components';

function Footer() {
  return (
    <p>
      Read our <Link href="/privacy">Privacy Policy</Link> for details.
    </p>
  );
}
```

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `href` | `string` | -- | The URL the link points to. Required. |
| `external` | `boolean` | `false` | When true, appends "(opens in new tab)" to the accessible label and renders an external link icon. Does not auto-set `target`. |
| `variant` | `'default' \| 'subtle' \| 'inverse'` | `'default'` | Colour variant. |
| `animateUnderline` | `boolean` | `false` | When true, the underline animates in on hover instead of being always visible. |
| `children` | `ReactNode` | -- | Link label content. |
| `className` | `string` | -- | Additional CSS class names. |

Link also accepts all native `AnchorHTMLAttributes` and supports `ref` forwarding.

---

## Variants

### Default

The standard link colour, suited for body text and inline navigation.

```jsx
<Link href="/about">About us</Link>
```

---

### Subtle

A muted colour that blends with secondary text. Useful for footnotes, metadata, or dense link lists.

```jsx
<Link href="/terms" variant="subtle">Terms of service</Link>
```

---

### Inverse

A light colour designed for use on dark backgrounds.

```jsx
<Link href="/contact" variant="inverse">Contact us</Link>
```

---

## External links

Setting `external` renders a small arrow-box icon after the link text and adjusts the accessible label so screen readers announce "(opens in new tab)".

```jsx
<Link href="https://github.com" external target="_blank" rel="noopener noreferrer">
  GitHub
</Link>
```

Note: `external` does not set `target="_blank"` automatically. Set it yourself when you want the link to open in a new tab.

---

## Animated underline

When `animateUnderline` is enabled, the underline slides in from the left on hover rather than being present at rest.

```jsx
<Link href="/features" animateUnderline>Explore features</Link>
```

---

## Accessibility

- Renders as a native `<a>` element with full keyboard and screen reader support.
- When `external` is true and the children are a string, the component sets `aria-label` to `"{children} (opens in new tab)"`.
- When `external` is true and children are not a plain string, it falls back to `aria-description="(opens in new tab)"`.
- The external icon is marked `aria-hidden="true"` and `focusable="false"` so it does not interfere with assistive technology.

</TabItem>
</Tabs>
