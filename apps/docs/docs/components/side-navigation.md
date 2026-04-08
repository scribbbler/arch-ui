---
sidebar_label: Side navigation
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>NAVIGATION</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Side Navigation</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    A vertical navigation panel for sidebar layouts with nested items, collapsible groups, and active-state highlighting.
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

Sidebar, nav rail, side menu

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
import { SideNavigation } from '@arch-ui/components';

function AppSidebar() {
  return (
    <SideNavigation
      items={[
        { label: 'Dashboard', href: '/dashboard', icon: <DashboardIcon /> },
        {
          label: 'Settings',
          icon: <SettingsIcon />,
          children: [
            { label: 'General', href: '/settings/general' },
            { label: 'Security', href: '/settings/security' },
          ],
        },
        { label: 'Help', href: '/help', icon: <HelpIcon /> },
      ]}
      activeHref="/settings/general"
    />
  );
}
```

## Expected props

| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `SideNavItem[]` | -- | Array of navigation items, optionally nested. |
| `activeHref` | `string` | -- | The href of the currently active page, used to highlight the matching item. |
| `collapsed` | `boolean` | `false` | When true, the sidebar shows only icons (rail mode). |
| `onNavigate` | `(href: string) => void` | -- | Called when the user clicks a navigation link. |
| `className` | `string` | -- | Additional class names. |

### SideNavItem

| Prop | Type | Description |
|---|---|---|
| `label` | `string` | Visible text for the navigation item. |
| `href` | `string` | Destination URL. Omit for group headers with children. |
| `icon` | `ReactNode` | Optional icon rendered before the label. |
| `children` | `SideNavItem[]` | Nested sub-items rendered in a collapsible group. |
| `badge` | `ReactNode` | Optional badge or count rendered after the label. |

## Nested groups

Items with a `children` array render as collapsible sections. Clicking the group header expands or collapses the sub-items.

```jsx
<SideNavigation
  items={[
    {
      label: 'Components',
      icon: <ComponentIcon />,
      children: [
        { label: 'Button', href: '/components/button' },
        { label: 'Card', href: '/components/card' },
        { label: 'Modal', href: '/components/modal' },
      ],
    },
  ]}
  activeHref="/components/card"
/>
```

## Collapsed (rail) mode

When `collapsed` is true, the sidebar narrows to show only icons. Hovering or focusing an item can reveal a tooltip with the label. This mode is useful for maximising content area while keeping navigation accessible.

## Accessibility

- Renders inside a `<nav>` landmark with `aria-label="Side navigation"`.
- Collapsible groups use `aria-expanded` on the toggle button to communicate their state.
- The active item carries `aria-current="page"`.
- In collapsed (rail) mode, each icon-only item needs a tooltip or `aria-label` providing the full label text.
- Keyboard users can navigate items with Tab and expand/collapse groups with Enter or Space.

</TabItem>
</Tabs>
