---
sidebar_label: Draggable list
---

# Draggable List

A list whose items can be reordered via drag-and-drop. Useful for prioritisation, ordering steps, or any interface where the user needs to rearrange items manually.

**Common alternative names:** Sortable list, Reorderable list, Drag-and-drop list

---

## Usage

```jsx
import { DraggableList } from '@arch-ui/components';

const [items, setItems] = useState([
  { id: '1', label: 'First item' },
  { id: '2', label: 'Second item' },
  { id: '3', label: 'Third item' },
]);

<DraggableList
  items={items}
  onChange={setItems}
  renderItem={(item) => <span>{item.label}</span>}
/>
```

---

## Expected props

| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `Array<{ id: string; [key: string]: any }>` | **required** | The list of items. Each must have a unique `id`. |
| `onChange` | `(reorderedItems: typeof items) => void` | **required** | Called with the new item order after a drag completes. |
| `renderItem` | `(item, index) => ReactNode` | **required** | Render function for each item row. |
| `disabled` | `boolean` | `false` | Disables drag-and-drop interactions. |
| `className` | `string` | -- | Additional CSS class names. |

---

## Keyboard interaction

| Key | Behaviour |
|---|---|
| Space / Enter | Pick up or drop the focused item. |
| Arrow Up / Down | Move the picked-up item one position. |
| Escape | Cancel the current drag and return the item to its original position. |

---

## Accessibility

- Each draggable row should include a visible drag handle with `aria-label="Reorder"` (or equivalent).
- Use `aria-roledescription="sortable"` on the list container to communicate the interaction model.
- Announce position changes with a live region, e.g. "Item moved to position 2 of 5".
- Ensure the full reorder flow is operable with keyboard alone, without requiring a mouse.
