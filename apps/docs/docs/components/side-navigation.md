---
sidebar_label: Side navigation
---

# Side Navigation

A vertical navigation panel typically rendered in a sidebar, providing access to sections and sub-sections within an application. Side Navigation supports nested items, collapsible groups, and active-state highlighting. It is the primary wayfinding pattern for dashboard layouts and multi-section tools.

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
