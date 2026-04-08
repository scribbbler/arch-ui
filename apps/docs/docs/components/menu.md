---
sidebar_label: Menu
---

# Menu

A dropdown list of actions or options triggered by a button. Commonly used for overflow actions, context menus, and navigation dropdowns.

**Status:** Planned

**Common alternative names:** Dropdown menu, context menu, action menu, popup menu

---

## Usage

Menu renders a trigger button and a popover list of menu items. Clicking the trigger toggles the menu open. Selecting an item closes the menu and fires the item's action.

```jsx
import { Menu, MenuItem } from '@arch-ui/components';

<Menu trigger={<Button kind="secondary">Actions</Button>}>
  <MenuItem onClick={() => handleEdit()}>Edit</MenuItem>
  <MenuItem onClick={() => handleDuplicate()}>Duplicate</MenuItem>
  <MenuItem onClick={() => handleDelete()} destructive>Delete</MenuItem>
</Menu>
```

### With groups

Organise related items into labelled groups with dividers.

```jsx
<Menu trigger={<Button>Options</Button>}>
  <MenuGroup label="File">
    <MenuItem>New</MenuItem>
    <MenuItem>Open</MenuItem>
    <MenuItem>Save</MenuItem>
  </MenuGroup>
  <MenuGroup label="Edit">
    <MenuItem>Undo</MenuItem>
    <MenuItem>Redo</MenuItem>
  </MenuGroup>
</Menu>
```

### Disabled items

```jsx
<MenuItem disabled>Cannot delete</MenuItem>
```

---

## Expected props

### Menu

| Prop | Type | Default | Description |
|---|---|---|---|
| `trigger` | `ReactNode` | required | The element that opens the menu when clicked. |
| `placement` | `'bottom-start' \| 'bottom-end' \| 'top-start' \| 'top-end'` | `'bottom-start'` | Popover placement relative to the trigger. |
| `children` | `ReactNode` | required | MenuItem and MenuGroup elements. |

### MenuItem

| Prop | Type | Default | Description |
|---|---|---|---|
| `onClick` | `() => void` | `undefined` | Called when the item is selected. |
| `disabled` | `boolean` | `false` | Disables the item. |
| `destructive` | `boolean` | `false` | Styles the item as a destructive/danger action. |
| `children` | `ReactNode` | required | Item label content. |

---

## Accessibility

- The trigger button should have `aria-haspopup="menu"` and `aria-expanded` reflecting the open state.
- The menu list uses `role="menu"` with each item using `role="menuitem"`.
- Arrow keys navigate between items. Home and End jump to the first and last item.
- Escape closes the menu and returns focus to the trigger.
- Disabled items are focusable but not activatable, with `aria-disabled="true"`.

---

## Best practices

**Do:**
- Keep menu items concise -- use verb-first labels like "Edit", "Delete", "Share".
- Use `destructive` styling for irreversible actions.
- Place the most common action first in the list.

**Don't:**
- Do not use Menu for navigation between pages -- use a navigation component instead.
- Do not nest menus more than one level deep.
- Do not use Menu as a replacement for Select when the user needs to choose a form value.
