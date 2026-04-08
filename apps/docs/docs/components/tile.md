---
sidebar_label: Tile
---

# Tile

A contained, card-like surface used to group related content or actions into a single interactive unit. Tiles are commonly used in grid layouts for navigation, selection, or content previews.

**Common alternative names:** Card, Content block, Selection card

---

## Usage

```jsx
import { Tile } from '@arch-ui/components';

<Tile onClick={() => navigate('/rides')}>
  <Tile.Image src="/images/rides.png" alt="Rides" />
  <Tile.Content>
    <Tile.Title>Rides</Tile.Title>
    <Tile.Description>Request a ride in minutes</Tile.Description>
  </Tile.Content>
</Tile>
```

### Selection tiles

Use tiles as selectable options in a group, similar to radio buttons or checkboxes.

```jsx
<TileGroup value={selected} onChange={setSelected}>
  <Tile value="standard" label="Standard" description="Affordable rides" />
  <Tile value="premium" label="Premium" description="High-end vehicles" />
  <Tile value="xl" label="XL" description="Fits up to 6" />
</TileGroup>
```

### Tile with icon

```jsx
<Tile>
  <Tile.Icon><StarIcon /></Tile.Icon>
  <Tile.Content>
    <Tile.Title>Favourites</Tile.Title>
  </Tile.Content>
</Tile>
```

---

## Expected props

### TileProps

| Prop | Type | Default | Description |
|---|---|---|---|
| `onClick` | `() => void` | -- | Click handler. Makes the tile interactive. |
| `selected` | `boolean` | `false` | Whether the tile is in a selected state. |
| `disabled` | `boolean` | `false` | Disables interaction. |
| `children` | `ReactNode` | -- | Tile content. Use sub-components for structure. |
| `className` | `string` | -- | Additional CSS class names. |

### TileGroupProps

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | -- | Currently selected tile value. |
| `onChange` | `(value: string) => void` | -- | Called when selection changes. |
| `children` | `ReactNode` | -- | Tile children. |

---

## Accessibility

- Interactive tiles should use `role="button"` or, in a selection group, `role="radio"` with `aria-checked`.
- A TileGroup should use `role="radiogroup"` with a descriptive `aria-label`.
- Selected state is communicated via `aria-pressed` (toggle) or `aria-checked` (selection group).
- Keyboard navigation within a tile group follows the roving tabindex pattern: arrow keys move between tiles, Space/Enter activates.
