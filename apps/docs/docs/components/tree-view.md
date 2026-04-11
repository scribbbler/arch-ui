---
sidebar_label: Tree view
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>NAVIGATION</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Tree view</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    A hierarchical list component that displays nested data in an expandable and collapsible tree structure.
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

Tree, file browser, nested list

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

---

## Usage

```jsx
import { TreeView } from '@arch-ui/components';

function FileExplorer() {
  return (
    <TreeView
      data={[
        {
          label: 'src',
          children: [
            {
              label: 'components',
              children: [
                { label: 'Button.tsx' },
                { label: 'Card.tsx' },
              ],
            },
            { label: 'index.ts' },
          ],
        },
        { label: 'package.json' },
      ]}
    />
  );
}
```

---

## Expected props

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `TreeNode[]` | -- | The hierarchical data to display. |
| `onSelect` | `(node: TreeNode) => void` | -- | Called when the user selects a leaf or branch node. |
| `defaultExpanded` | `string[]` | `[]` | Array of node IDs that should be expanded on initial render. |
| `multiSelect` | `boolean` | `false` | When true, multiple nodes can be selected simultaneously. |
| `className` | `string` | -- | Additional class names. |

### TreeNode

| Prop | Type | Description |
|---|---|---|
| `id` | `string` | Unique identifier for the node. |
| `label` | `string` | Visible text for the node. |
| `icon` | `ReactNode` | Optional icon rendered before the label (e.g., folder or file icon). |
| `children` | `TreeNode[]` | Child nodes. When present, the node is expandable. |
| `disabled` | `boolean` | When true, the node is non-interactive. |

---

## States

- **Expanded** -- a branch node whose children are visible. The expand/collapse chevron points downward.
- **Collapsed** -- a branch node whose children are hidden. The chevron points to the end (right in LTR).
- **Selected** -- the node the user has chosen. Highlighted with an accent background.
- **Focused** -- the node that currently has keyboard focus, indicated by a focus ring.
- **Disabled** -- a node that cannot be selected or expanded.

---

## When to use

- File system browsers or project explorers.
- Category or taxonomy selectors with deeply nested structures.
- Settings panels organised in a hierarchy.
- Organisational charts or permission trees.

---

## When not to use

- Flat lists with no hierarchy. Use a standard list or menu.
- Navigation between pages. Use Side Navigation.
- Shallow option sets. Use a select, radio group, or checkbox group.

---

## Accessibility

- The root element uses `role="tree"` and child nodes use `role="treeitem"`.
- Branch nodes that contain children use `aria-expanded` to communicate their open/closed state.
- Keyboard navigation follows the WAI-ARIA TreeView pattern: Arrow Up/Down moves between visible nodes, Arrow Right expands a collapsed branch or moves to its first child, Arrow Left collapses an expanded branch or moves to its parent, Home/End jump to the first/last visible node.
- Multi-select mode uses `aria-multiselectable="true"` on the tree and `aria-selected` on each node.
- Disabled nodes have `aria-disabled="true"`.

</TabItem>
</Tabs>
