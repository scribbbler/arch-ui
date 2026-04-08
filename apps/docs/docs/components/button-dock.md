---
sidebar_label: Button dock
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Buttons</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Button Dock</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    A fixed-position bottom action bar for primary and secondary actions.
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

Action bar, sticky actions, bottom bar

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

ButtonDock accepts up to three action slots arranged in a vertical stack: a primary action, a secondary action, and a dismiss action. Each slot accepts any `ReactNode`, giving consumers full control over button semantics and styling.

```jsx
import { ButtonDock } from '@arch-ui/components';
import { Button } from '@arch-ui/components';

<ButtonDock
  primaryAction={<Button kind="primary" fullWidth>Save changes</Button>}
  secondaryAction={<Button kind="secondary">Save draft</Button>}
  dismissAction={<a href="/cancel">Cancel</a>}
/>
```

### Primary action only

The simplest use case is a single primary action at the bottom of a form.

```jsx
<ButtonDock
  primaryAction={<Button kind="primary" fullWidth>Continue</Button>}
/>
```

### Two actions

A common pattern for forms with a submit and a secondary option.

```jsx
<ButtonDock
  primaryAction={<Button kind="primary" fullWidth>Submit</Button>}
  secondaryAction={<Button kind="secondary">Back</Button>}
/>
```

---

## Position

The `position` prop controls how the dock attaches to the viewport or scroll container.

| Value | Behaviour |
|---|---|
| `fixed` (default) | Pinned to the bottom of the viewport. Use for full-page forms. |
| `sticky` | Sticks within its scroll container. Use when the dock lives inside a scrollable region like a modal or drawer. |

```jsx
<ButtonDock
  position="sticky"
  primaryAction={<Button kind="primary" fullWidth>Confirm</Button>}
/>
```

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `primaryAction` | `ReactNode` | `undefined` | The primary action button, typically a full-width Button. |
| `secondaryAction` | `ReactNode` | `undefined` | A secondary action button rendered below the primary action. |
| `dismissAction` | `ReactNode` | `undefined` | A dismiss or cancel link rendered below the secondary action. |
| `position` | `'fixed' \| 'sticky'` | `'fixed'` | Controls whether the dock is fixed to the viewport or sticky within its scroll container. |
| `className` | `string` | `undefined` | Additional CSS class names applied to the root element. |

---

## Accessibility

- The root element uses `role="contentinfo"` to provide a semantic landmark.
- The primary action button should be first in tab order.
- Action slots accept any `ReactNode`, so consumers are responsible for using proper button or link semantics in each slot.

---

## Best practices

**Do:**
- Use for forms with a submit and cancel action at the bottom.
- Use `sticky` when the dock should scroll with a container (modals, drawers).
- Always provide a primary action.

**Don't:**
- Do not nest multiple ButtonDocks on the same page.
- Do not use for navigation -- use a toolbar or navigation bar instead.

---

## Design tokens

| Token | Role |
|---|---|
| `color-surface-base` | Dock background |
| `shadow-shallow-above` | Top shadow to separate from content |
| `spacing-16` | Padding |
| `spacing-12` | Gap between action slots |
| `z-semantic-sticky` | Z-index for fixed/sticky positioning |

</TabItem>
</Tabs>
