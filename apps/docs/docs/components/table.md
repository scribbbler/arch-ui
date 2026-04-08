---
sidebar_label: Table
hide_title: true
---

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>DATA AND TABLES</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Table</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    A semantic, accessible data table for presenting structured information in rows and columns.
  </p>
</div>

## Usage

```jsx
import { Table, Thead, Tbody, Tr, Th, Td } from '@arch-ui/components';

function MonthlySales() {
  return (
    <Table caption="Monthly sales figures">
      <Thead>
        <Tr>
          <Th scope="col">Month</Th>
          <Th scope="col">Revenue</Th>
          <Th scope="col">Orders</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>January</Td>
          <Td>$12,000</Td>
          <Td>340</Td>
        </Tr>
        <Tr>
          <Td>February</Td>
          <Td>$14,500</Td>
          <Td>410</Td>
        </Tr>
      </Tbody>
    </Table>
  );
}
```

## Props

### Table

| Prop | Type | Default | Description |
|---|---|---|---|
| `caption` | `string` | -- | Accessible description of the table, rendered as a `<caption>`. Required. |
| `striped` | `boolean` | `false` | When true, alternating body rows get a subtle background. |
| `bordered` | `boolean` | `false` | When true, all cells have visible borders. |
| `size` | `'sm' \| 'md'` | `'md'` | Cell padding density. |
| `children` | `ReactNode` | -- | Table structure -- Thead, Tbody, Tfoot, Tr, Th, Td. |
| `className` | `string` | -- | Additional CSS class names. |

### Th

| Prop | Type | Default | Description |
|---|---|---|---|
| `scope` | `'col' \| 'row' \| 'colgroup' \| 'rowgroup'` | -- | Identifies the header cell scope. Required. |
| `children` | `ReactNode` | -- | Header content. |
| `className` | `string` | -- | Additional CSS class names. |

Th also accepts all native `ThHTMLAttributes`.

### Td

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | -- | Cell content. |
| `className` | `string` | -- | Additional CSS class names. |

Td also accepts all native `TdHTMLAttributes`.

### Thead / Tbody / Tfoot / Tr

Each accepts `children` and `className`. All sub-components support `ref` forwarding.

## Striped rows

Alternating row backgrounds improve scanability in dense tables.

```jsx
<Table caption="Inventory" striped>
  <Thead>...</Thead>
  <Tbody>...</Tbody>
</Table>
```

## Bordered cells

Add visible borders to every cell for precise alignment and data-heavy layouts.

```jsx
<Table caption="Quarterly report" bordered>
  <Thead>...</Thead>
  <Tbody>...</Tbody>
</Table>
```

## Compact size

Use `size="sm"` for tighter cell padding in space-constrained layouts.

```jsx
<Table caption="Log entries" size="sm">
  <Thead>...</Thead>
  <Tbody>...</Tbody>
</Table>
```

## Table with footer

Use Tfoot for summary rows such as totals or averages.

```jsx
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td } from '@arch-ui/components';

<Table caption="Expenses">
  <Thead>
    <Tr>
      <Th scope="col">Category</Th>
      <Th scope="col">Amount</Th>
    </Tr>
  </Thead>
  <Tbody>
    <Tr><Td>Travel</Td><Td>$2,400</Td></Tr>
    <Tr><Td>Equipment</Td><Td>$5,100</Td></Tr>
  </Tbody>
  <Tfoot>
    <Tr>
      <Th scope="row">Total</Th>
      <Td>$7,500</Td>
    </Tr>
  </Tfoot>
</Table>
```

## Responsive behaviour

Table renders inside a wrapper `<div>` with `overflow-x: auto`, so wide tables scroll horizontally on narrow viewports rather than breaking the page layout.

## Accessibility

- A `<caption>` element is always rendered, providing an accessible name for the table. The caption is required.
- Every `<Th>` requires a `scope` attribute (`col`, `row`, `colgroup`, or `rowgroup`) so assistive technology can associate headers with data cells.
- The native `<table>`, `<thead>`, `<tbody>`, `<tfoot>`, `<tr>`, `<th>`, and `<td>` elements are used directly, preserving full semantic structure.
