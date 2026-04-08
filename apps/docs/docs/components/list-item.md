---
sidebar_label: List item
---

# List Item

A structured row within a List, supporting optional artwork on the left, a content area in the middle, and an end enhancer on the right. Use ListItem for rich, interactive list rows -- for example contact lists, settings menus, or notification feeds.

**Common alternative names:** Row, List cell, List tile

---

## Usage

```jsx
import { List, ListItem, ListItemLabel } from '@arch-ui/components';

<List>
  <ListItem
    artwork={<UserIcon />}
    endEnhancer={<ChevronRightIcon />}
  >
    <ListItemLabel description="Software Engineer">
      Jane Doe
    </ListItemLabel>
  </ListItem>
</List>
```

### With artwork sizes

Control the artwork container size with the `artworkSize` prop.

```jsx
<ListItem artwork={<Avatar name="J" size="small" />} artworkSize="small">
  <ListItemLabel>Small artwork</ListItemLabel>
</ListItem>

<ListItem artwork={<Avatar name="J" size="medium" />} artworkSize="large">
  <ListItemLabel>Large artwork</ListItemLabel>
</ListItem>
```

### Interactive items

Pass an `onClick` handler to make the item behave as a button.

```jsx
<ListItem onClick={() => navigate('/settings')}>
  <ListItemLabel description="Manage your preferences">
    Settings
  </ListItemLabel>
</ListItem>
```

### Sublist items

Set `sublist` to indent the item, useful for nested or hierarchical lists.

```jsx
<ListItem sublist>
  <ListItemLabel sublist>Nested child item</ListItemLabel>
</ListItem>
```

---

## Props

### ListItemProps

| Prop | Type | Default | Description |
|---|---|---|---|
| `artwork` | `ReactNode` | -- | Icon or image rendered on the left. |
| `artworkSize` | `'small' \| 'medium' \| 'large'` | `'medium'` | Size of the artwork container (24px, 36px, 48px). |
| `shape` | `'default' \| 'round'` | `'default'` | Shape of the artwork container. `'round'` adds full border-radius. |
| `endEnhancer` | `ReactNode` | -- | Action or info rendered on the right. |
| `sublist` | `boolean` | `false` | Whether this is a sublist item (indented). |
| `onClick` | `(e: SyntheticEvent) => void` | -- | Click handler. Makes the item interactive with hover and focus styles. |
| `children` | `ReactNode` | -- | Item content. Use ListItemLabel for structured content. |
| `className` | `string` | -- | Additional CSS class names. |

### ListItemLabelProps

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | **required** | Primary label text. |
| `description` | `ReactNode` | -- | Secondary description below the label. |
| `sublist` | `boolean` | `false` | Renders at a smaller type scale for nested items. |
| `className` | `string` | -- | Additional CSS class names. |

---

## Accessibility

- Interactive items receive `role="button"` and `tabIndex={0}` automatically when `onClick` is provided.
- Interactive items show a focus ring on `:focus-visible`.
- Artwork is marked `aria-hidden="true"` since it is decorative; the meaningful content lives in ListItemLabel.
