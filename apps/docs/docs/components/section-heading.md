---
sidebar_label: Section heading
hide_title: true
---

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>CONTENT DISPLAY</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Section Heading</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    A typographic heading used to label and separate sections of content within a page or panel.
  </p>
</div>

**Common alternative names:** Section title, Group header, Category heading

---

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
