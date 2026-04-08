---
sidebar_label: Empty State
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>INDICATORS AND STATUS</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Empty State</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    A content placeholder displayed when a view has no data, guiding users with context and a clear next step.
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

Blank state, Zero state, No data

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
import { EmptyState } from '@arch-ui/components';

function Example() {
  return (
    <EmptyState
      title="No results found"
      description="Try adjusting your search or filters to find what you are looking for."
      action={{ label: 'Clear filters', onClick: handleClear }}
    />
  );
}
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **required** | Primary heading that explains the empty state. |
| `description` | `string` | `undefined` | Supporting text with additional context or guidance. |
| `icon` | `ReactNode` | `undefined` | Decorative illustration or icon rendered above the title. |
| `action` | `{ label: string; onClick: () => void }` | `undefined` | Primary call-to-action button displayed below the description. |
| `secondaryAction` | `{ label: string; onClick: () => void }` | `undefined` | Optional secondary action rendered alongside the primary action. |
| `className` | `string` | `undefined` | Additional CSS class names applied to the root element. |

---

## With icon

Provide an icon or illustration to add visual context. The icon is rendered above the title and is decorative (`aria-hidden`).

```jsx
<EmptyState
  icon={<SearchIcon />}
  title="No results"
  description="We could not find any items matching your query."
/>
```

---

## With actions

Use `action` for a primary CTA and `secondaryAction` for an alternative path.

```jsx
<EmptyState
  title="No projects yet"
  description="Create your first project to get started."
  action={{ label: 'Create project', onClick: handleCreate }}
  secondaryAction={{ label: 'Learn more', onClick: handleLearnMore }}
/>
```

---

## Guidelines

- Keep the title short and specific. Tell users what is missing, not what went wrong.
- Use the description to suggest a next step or explain how to populate the view.
- Limit actions to two at most. The primary action should solve the empty state directly.
- Avoid technical language. Write for the end user, not the developer.

---

## Accessibility

- The root element uses a semantic landmark so assistive technology can identify the empty region.
- Icons should be decorative. If the icon conveys meaning on its own, provide an accessible label on the icon element.
- Action buttons follow standard Button accessibility patterns, including keyboard focus and activation.

</TabItem>
</Tabs>
