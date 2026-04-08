---
sidebar_label: List
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>CONTENT DISPLAY</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>List</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    A semantic list component for rendering structured rows of content with support for headings, descriptions, and artwork.
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

Collection, Item list

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

### Basic list

```jsx
import { List, ListItem, ListItemLabel } from '@arch-ui/components';

<List>
  <ListItem>
    <ListItemLabel description="Software Engineer">Jane Doe</ListItemLabel>
  </ListItem>
  <ListItem>
    <ListItemLabel description="Product Designer">Alex Kim</ListItemLabel>
  </ListItem>
</List>
```

### With artwork and end enhancer

```jsx
<List>
  <ListItem
    artwork={<Avatar name="Jane Doe" size="small" />}
    artworkSize="small"
    endEnhancer={<span>3m ago</span>}
  >
    <ListItemLabel description="Sent you a message">Jane Doe</ListItemLabel>
  </ListItem>
</List>
```

### List variants

Control the list marker style with `variant`.

```jsx
<List variant="bullet">
  <li>Unordered item one</li>
  <li>Unordered item two</li>
</List>

<List variant="number">
  <li>First step</li>
  <li>Second step</li>
</List>

<List variant="none">
  <ListItem>No markers</ListItem>
</List>
```

### Section headings

Use ListHeading to label groups within a list.

```jsx
<List>
  <ListHeading heading="Team members" subHeading="3 people" />
  <ListItem><ListItemLabel>Jane</ListItemLabel></ListItem>
  <ListItem><ListItemLabel>Alex</ListItemLabel></ListItem>
  <ListItem><ListItemLabel>Sam</ListItemLabel></ListItem>
</List>
```

### Description list

For key-value pairs, use the DescriptionList components.

```jsx
import { DescriptionList, DescriptionTerm, DescriptionDetail } from '@arch-ui/components';

<DescriptionList>
  <DescriptionTerm>Name</DescriptionTerm>
  <DescriptionDetail>Jane Doe</DescriptionDetail>
  <DescriptionTerm>Role</DescriptionTerm>
  <DescriptionDetail>Engineer</DescriptionDetail>
</DescriptionList>
```

---

## Props

### ListProps

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'bullet' \| 'number' \| 'none'` | `'none'` | Visual style of list markers. |
| `as` | `'ul' \| 'ol'` | auto | Override the rendered element. Auto-selects `<ol>` for `number`, `<ul>` otherwise. |
| `children` | `ReactNode` | -- | List content. |
| `className` | `string` | -- | Additional CSS class names. |

### ListHeadingProps

| Prop | Type | Default | Description |
|---|---|---|---|
| `heading` | `ReactNode` | **required** | Heading text. |
| `subHeading` | `ReactNode` | -- | Sub-heading text. |
| `endEnhancer` | `ReactNode` | -- | Content on the right side. |
| `endEnhancerDescription` | `ReactNode` | -- | Description below the end enhancer. |
| `maxLines` | `1 \| 2` | `1` | Max lines for heading text. `1` enables ellipsis truncation. |
| `className` | `string` | -- | Additional CSS class names. |

---

## Sub-components

List exports several companion components:

- **ListItem** -- Rich list row with artwork, content, and end enhancer slots. See [List Item](./list-item.md).
- **ListItemLabel** -- Structured content block with primary label and description.
- **ListHeading** -- Section heading row for grouping items.
- **DescriptionList / DescriptionTerm / DescriptionDetail** -- Semantic `<dl>` pattern rendered as a two-column grid.

---

## Accessibility

- Renders semantic `<ul>` or `<ol>` elements based on the variant.
- DescriptionList uses a native `<dl>` with `<dt>` and `<dd>` elements for proper semantics.
- Interactive ListItems receive `role="button"` and keyboard focus support.

</TabItem>
</Tabs>
