---
sidebar_label: Tile
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>CONTENT DISPLAY</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Tile</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    A contained, card-like surface used to group related content or actions into a single interactive unit.
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

Card, Grid item, Content block

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

</TabItem>
</Tabs>
