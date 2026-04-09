---
sidebar_label: Section heading
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>CONTENT DISPLAY</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Section heading</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    A typographic heading used to label and separate sections of content within a page or panel.
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

Section title, Group header, Subheader

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
import { SectionHeading } from '@arch-ui/components';

<SectionHeading>Account settings</SectionHeading>
```

### With description

```jsx
<SectionHeading description="Manage your personal information and preferences">
  Profile
</SectionHeading>
```

### With end action

```jsx
<SectionHeading endEnhancer={<Button kind="tertiary" size="compact">Edit</Button>}>
  Notifications
</SectionHeading>
```

### Heading levels

Adjust the semantic heading level to match your document outline.

```jsx
<SectionHeading as="h2">Top-level section</SectionHeading>
<SectionHeading as="h3">Nested subsection</SectionHeading>
```

---

## Expected props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | **required** | Heading text content. |
| `description` | `ReactNode` | -- | Supporting text rendered below the heading. |
| `endEnhancer` | `ReactNode` | -- | Action or content aligned to the right. |
| `as` | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'` | `'h3'` | Semantic heading level. |
| `className` | `string` | -- | Additional CSS class names. |

---

## Accessibility

- Renders a semantic heading element (`<h2>`, `<h3>`, etc.) so screen readers can navigate by heading level.
- Avoid skipping heading levels in the document outline (e.g. jumping from `h2` to `h4`).
- If the section heading includes an action via `endEnhancer`, ensure the action itself is focusable and labelled.

</TabItem>
</Tabs>
