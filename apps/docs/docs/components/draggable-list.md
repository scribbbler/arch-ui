---
sidebar_label: Draggable list
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>CONTENT DISPLAY</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Draggable list</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    A list whose items can be reordered via drag-and-drop for prioritisation or manual arrangement.
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

Sortable list, Reorderable list, Drag and drop

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

</TabItem>
</Tabs>
