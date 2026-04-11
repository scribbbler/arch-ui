---
sidebar_label: Navigation header
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>NAVIGATION</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Navigation header</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    A top-level header bar providing brand identity, primary navigation links, and utility actions.
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

App bar, top bar, header bar

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
import { NavigationHeader } from '@arch-ui/components';

function AppHeader() {
  return (
    <NavigationHeader
      logo={<img src="/logo.svg" alt="Acme" />}
      items={[
        { label: 'Products', href: '/products' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Docs', href: '/docs' },
      ]}
      actions={<button>Sign in</button>}
    />
  );
}
```

---

## Expected props

| Prop | Type | Default | Description |
|---|---|---|---|
| `logo` | `ReactNode` | -- | Brand mark or wordmark rendered at the leading edge of the header. |
| `items` | `NavItem[]` | -- | Array of primary navigation links. |
| `actions` | `ReactNode` | -- | Utility controls (sign in, search, avatar) rendered at the trailing edge. |
| `sticky` | `boolean` | `false` | When true, the header sticks to the top of the viewport on scroll. |
| `className` | `string` | -- | Additional class names. |

### NavItem

| Prop | Type | Description |
|---|---|---|
| `label` | `string` | Visible text for the navigation link. |
| `href` | `string` | Destination URL. |
| `active` | `boolean` | When true, the item is styled as the current section. |

---

## Anatomy

1. **Logo region** -- the brand identity, typically a clickable link back to the home page.
2. **Primary navigation** -- horizontal list of top-level section links.
3. **Actions region** -- utility controls such as search, sign-in button, or user avatar.
4. **Mobile toggle** (responsive) -- a hamburger button that opens a collapsible or off-canvas menu on small viewports.

---

## Sticky behaviour

When `sticky` is enabled, the header remains fixed at the top of the viewport as the user scrolls. Consider adding a subtle bottom border or shadow on scroll to visually separate the header from page content.

---

## Responsive considerations

On viewports narrower than the design system's tablet breakpoint, the primary navigation should collapse behind a hamburger button. The mobile menu can render as a Drawer (`position="start"`) or an expanding panel beneath the header.

---

## Accessibility

- Wraps navigation links in a `<nav>` landmark with `aria-label="Main"`.
- The mobile toggle button should have `aria-expanded` reflecting the menu state and `aria-controls` pointing to the collapsible panel.
- Active items should carry `aria-current="page"` when the link matches the current URL.
- The logo link should have meaningful alt text or an `aria-label`.

</TabItem>
</Tabs>
