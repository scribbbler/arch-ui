---
sidebar_label: Section heading
---

# Section Heading

A typographic heading used to label and separate sections of content within a page or panel. Section headings establish visual hierarchy and help users scan the interface.

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
