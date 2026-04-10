---
sidebar_label: Bottom navigation
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>NAVIGATION</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Bottom navigation</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    A fixed navigation bar anchored to the bottom of the viewport for mobile and small-screen layouts.
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

Tab bar, bottom tabs, mobile nav

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

## Usage

```jsx
import { BottomNavigation } from '@arch-ui/components';

function AppShell() {
  const [active, setActive] = useState('home');

  return (
    <BottomNavigation
      items={[
        { label: 'Home', value: 'home', icon: <HomeIcon /> },
        { label: 'Search', value: 'search', icon: <SearchIcon /> },
        { label: 'Profile', value: 'profile', icon: <ProfileIcon /> },
      ]}
      activeValue={active}
      onChange={setActive}
    />
  );
}
```

## Expected props

| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `BottomNavItem[]` | -- | Array of navigation items (three to five recommended). |
| `activeValue` | `string` | -- | Value of the currently active item. |
| `onChange` | `(value: string) => void` | -- | Called when the user taps a navigation item. |
| `className` | `string` | -- | Additional class names. |

### BottomNavItem

| Prop | Type | Description |
|---|---|---|
| `label` | `string` | Short text label displayed below the icon. |
| `value` | `string` | Unique identifier for this destination. |
| `icon` | `ReactNode` | Icon rendered above the label. |
| `badge` | `number \| boolean` | Optional badge indicator for unread counts or notifications. |

## States

- **Active** -- the selected destination is highlighted with an accent colour and bolder weight.
- **Inactive** -- unselected items use a muted colour.
- **Badge** -- a small dot or count overlays the icon to indicate new content.

## When to use

- Mobile-first applications with three to five primary destinations.
- Apps where the main navigation must remain visible at all times on small screens.

## When not to use

- Desktop layouts where a sidebar or top navigation provides better information density.
- More than five destinations. Consider grouping secondary items under a "More" overflow menu.
- Single-page flows or wizards that do not require persistent navigation.

## Accessibility

- Renders inside a `<nav>` landmark with a descriptive `aria-label` (e.g., "Main navigation").
- The active item should carry `aria-current="page"` or `aria-current="true"`.
- Each item is a focusable button or link so keyboard users can navigate with Tab.
- Icons must be decorative (`aria-hidden="true"`) since each item has a visible text label.

</TabItem>
</Tabs>
