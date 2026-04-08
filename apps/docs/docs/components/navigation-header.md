---
sidebar_label: Navigation header
---

# Navigation Header

A top-level header bar that spans the full width of the viewport, providing brand identity, primary navigation links, and utility actions. Navigation Header is the main entry point for site-wide navigation on desktop and tablet layouts, and typically collapses into a hamburger menu on mobile.

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

## Anatomy

1. **Logo region** -- the brand identity, typically a clickable link back to the home page.
2. **Primary navigation** -- horizontal list of top-level section links.
3. **Actions region** -- utility controls such as search, sign-in button, or user avatar.
4. **Mobile toggle** (responsive) -- a hamburger button that opens a collapsible or off-canvas menu on small viewports.

## Sticky behaviour

When `sticky` is enabled, the header remains fixed at the top of the viewport as the user scrolls. Consider adding a subtle bottom border or shadow on scroll to visually separate the header from page content.

## Responsive considerations

On viewports narrower than the design system's tablet breakpoint, the primary navigation should collapse behind a hamburger button. The mobile menu can render as a Drawer (`position="start"`) or an expanding panel beneath the header.

## Accessibility

- Wraps navigation links in a `<nav>` landmark with `aria-label="Main"`.
- The mobile toggle button should have `aria-expanded` reflecting the menu state and `aria-controls` pointing to the collapsible panel.
- Active items should carry `aria-current="page"` when the link matches the current URL.
- The logo link should have meaningful alt text or an `aria-label`.
