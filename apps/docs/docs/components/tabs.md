---
sidebar_label: Tabs
---

# Tabs

A controlled, accessible tab component for switching between related content panels without navigating to a new page. Tabs supports horizontal and vertical layouts, two visual variants, optional tab artwork, and full ARIA keyboard navigation.

## Usage

```jsx
import { Tabs } from '@arch-ui/components';
import { useState } from 'react';

function ProfilePage() {
  const [active, setActive] = useState('overview');

  return (
    <Tabs
      tabs={[
        { label: 'Overview', value: 'overview', content: <p>Profile overview</p> },
        { label: 'Activity', value: 'activity', content: <p>Recent activity</p> },
        { label: 'Settings', value: 'settings', content: <p>Account settings</p> },
      ]}
      activeValue={active}
      onChange={setActive}
    />
  );
}
```

## Props

### Tabs

| Prop | Type | Default | Description |
|---|---|---|---|
| `tabs` | `TabItem[]` | -- | Array of tab definitions. Required. |
| `activeValue` | `string` | -- | Value of the currently active tab (controlled). Required. |
| `onChange` | `(value: string) => void` | -- | Called when the user activates a tab. Required. |
| `variant` | `'line' \| 'enclosed'` | `'line'` | Visual style of the tab bar. |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction of the tab list. |
| `fill` | `'fixed' \| 'intrinsic'` | `'intrinsic'` | Tab width behaviour. `'intrinsic'` sizes tabs to their content; `'fixed'` makes all tabs equal width. |
| `renderAll` | `boolean` | `false` | When true, all tab panels are rendered in the DOM (hidden via CSS) for SEO. |
| `className` | `string` | -- | Additional class names applied to the root element. |

### TabItem

| Prop | Type | Description |
|---|---|---|
| `label` | `string` | Visible label shown in the tab button. Required. |
| `value` | `string` | Unique identifier for this tab. Used as the controlled value. Required. |
| `content` | `ReactNode` | Content rendered inside the tab panel when this tab is active. Required. |
| `disabled` | `boolean` | When true, the tab is non-interactive and skipped during keyboard navigation. |
| `artwork` | `ReactNode` | Optional icon or illustration rendered before the tab label. |

Tabs supports `ref` forwarding to the root `<div>`.

## Variants

### Line

The default variant. A bottom border highlights the active tab.

```jsx
<Tabs variant="line" tabs={tabs} activeValue={active} onChange={setActive} />
```

### Enclosed

Tabs appear as enclosed panels with a connected border, similar to folder tabs.

```jsx
<Tabs variant="enclosed" tabs={tabs} activeValue={active} onChange={setActive} />
```

## Orientation

### Horizontal (default)

The tab list renders as a horizontal row above the content panels.

```jsx
<Tabs orientation="horizontal" tabs={tabs} activeValue={active} onChange={setActive} />
```

### Vertical

The tab list renders as a vertical column to the left of the content panels. Arrow Up/Down replaces Arrow Left/Right for keyboard navigation.

```jsx
<Tabs orientation="vertical" tabs={tabs} activeValue={active} onChange={setActive} />
```

## Fill modes

- **Intrinsic** (default) -- each tab is as wide as its label.
- **Fixed** -- all tabs share equal width, dividing the available space evenly.

```jsx
<Tabs fill="fixed" tabs={tabs} activeValue={active} onChange={setActive} />
```

## Disabled tabs

Individual tabs can be disabled. Disabled tabs are visually muted and skipped during keyboard navigation.

```jsx
const tabs = [
  { label: 'Active', value: 'active', content: <p>Active content</p> },
  { label: 'Disabled', value: 'disabled', content: <p>Hidden</p>, disabled: true },
];
```

## Tab artwork

Pass an icon or illustration via the `artwork` prop. It renders before the label and is marked `aria-hidden="true"`.

```jsx
const tabs = [
  { label: 'Photos', value: 'photos', artwork: <PhotoIcon />, content: <Gallery /> },
];
```

## Render all panels

By default, only the active panel is in the DOM. Set `renderAll` to keep all panels mounted (hidden via CSS) so search engines can index their content.

```jsx
<Tabs renderAll tabs={tabs} activeValue={active} onChange={setActive} />
```

## Accessibility

- The tab list uses `role="tablist"` with `aria-orientation` matching the layout.
- Each tab button has `role="tab"`, `aria-selected`, and `aria-controls` linking to its panel.
- Tab panels have `role="tabpanel"`, `aria-labelledby`, and `tabIndex={0}` for focus.
- Keyboard navigation follows the WAI-ARIA Authoring Practices: Arrow keys move between tabs, Home/End jump to first/last enabled tab, and Tab moves focus into the active panel.
- Disabled tabs receive `aria-disabled="true"` and are excluded from the arrow-key cycle.
