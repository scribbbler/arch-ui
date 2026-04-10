---
sidebar_label: Data table
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>DATA AND TABLES</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Data table</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    An enhanced table component with built-in sorting, filtering, row selection, and pagination.
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

Grid, data grid, spreadsheet

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
import { DataTable } from '@arch-ui/components';

const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'role', header: 'Role', filterable: true },
];

const rows = [
  { id: '1', name: 'Alice Park', email: 'alice@example.com', role: 'Admin' },
  { id: '2', name: 'Bob Chen', email: 'bob@example.com', role: 'Editor' },
  { id: '3', name: 'Carol Diaz', email: 'carol@example.com', role: 'Viewer' },
];

function UserTable() {
  return (
    <DataTable
      caption="Team members"
      columns={columns}
      data={rows}
      selectable
    />
  );
}
```

## Expected props

| Prop | Type | Default | Description |
|---|---|---|---|
| `caption` | `string` | -- | Accessible description of the table. Required. |
| `columns` | `ColumnDef[]` | -- | Column definitions controlling headers, sorting, and filtering. Required. |
| `data` | `Row[]` | -- | Array of row objects. Each row should have a unique `id`. Required. |
| `selectable` | `boolean` | `false` | When true, renders checkboxes for row selection. |
| `onSelectionChange` | `(selectedIds: string[]) => void` | -- | Called when the selection changes. |
| `sortable` | `boolean` | `false` | Global toggle for column sorting (individual columns can override). |
| `paginated` | `boolean` | `false` | When true, renders a Pagination control below the table. |
| `pageSize` | `number` | `10` | Number of rows per page when `paginated` is true. |
| `emptyState` | `ReactNode` | -- | Content shown when data is empty. |
| `className` | `string` | -- | Additional class names. |

### ColumnDef

| Prop | Type | Description |
|---|---|---|
| `key` | `string` | The property name in the row object. |
| `header` | `string` | Column header label. |
| `sortable` | `boolean` | When true, the column header is clickable for sorting. |
| `filterable` | `boolean` | When true, a filter control appears for this column. |
| `width` | `string` | Optional fixed width (e.g., `'200px'`). |
| `align` | `'start' \| 'center' \| 'end'` | Cell content alignment. |
| `render` | `(value, row) => ReactNode` | Custom cell renderer. |

## Sorting

Columns marked `sortable: true` render a clickable header. Clicking toggles between ascending, descending, and unsorted states. The current sort state is indicated by an arrow icon.

```jsx
const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'created', header: 'Created', sortable: true },
];
```

## Row selection

When `selectable` is true, a checkbox column is prepended. A header checkbox toggles all rows. Selected row IDs are reported via `onSelectionChange`.

```jsx
<DataTable
  caption="Select items"
  columns={columns}
  data={rows}
  selectable
  onSelectionChange={(ids) => console.log('Selected:', ids)}
/>
```

## Pagination

Enable built-in pagination for large data sets. The Pagination component renders below the table.

```jsx
<DataTable
  caption="Transactions"
  columns={columns}
  data={transactions}
  paginated
  pageSize={25}
/>
```

## Custom cell rendering

Use the `render` function on a column definition to customise how cell values are displayed.

```jsx
const columns = [
  { key: 'status', header: 'Status', render: (value) => <Badge>{value}</Badge> },
];
```

## Empty state

Provide an `emptyState` node to display when the data array is empty.

```jsx
<DataTable
  caption="Search results"
  columns={columns}
  data={[]}
  emptyState={<p>No results found. Try adjusting your filters.</p>}
/>
```

## Accessibility

- Built on the base Table component, inheriting its semantic HTML structure and required `caption`.
- Sortable column headers use `aria-sort` (`ascending`, `descending`, or `none`).
- Row selection checkboxes have `aria-label` values such as "Select row Alice Park" and "Select all rows".
- The header checkbox uses `aria-checked="mixed"` when some but not all rows are selected.
- Pagination controls use the Pagination component's built-in ARIA attributes.

</TabItem>
</Tabs>
