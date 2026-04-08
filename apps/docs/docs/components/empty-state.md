---
sidebar_label: Empty State
---

# Empty State

A content placeholder displayed when a view has no data to show. Empty State guides users by explaining why a section is empty and providing a clear next step, such as a call-to-action button.

---

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
