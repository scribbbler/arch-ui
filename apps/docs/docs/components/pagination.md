---
sidebar_label: Pagination
hide_title: true
---

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>NAVIGATION</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Pagination</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    A navigation control for moving between pages of content with numbered buttons and ellipsis truncation.
  </p>
</div>

## Usage

```jsx
import { Pagination } from '@arch-ui/components';
import { useState } from 'react';

function ProductList() {
  const [page, setPage] = useState(1);

  return (
    <div>
      {/* ...list content... */}
      <Pagination
        totalPages={20}
        currentPage={page}
        onChange={setPage}
      />
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `totalPages` | `number` | -- | Total number of pages. Required. |
| `currentPage` | `number` | -- | The currently active page (1-indexed). Required. |
| `onChange` | `(page: number) => void` | -- | Called with the target page number when the user navigates. Required. |
| `size` | `'mini' \| 'compact' \| 'default' \| 'large'` | `'compact'` | Size of the pagination buttons. |
| `shape` | `'circle' \| 'square'` | `'circle'` | Shape of the pagination buttons. |
| `showFirstLast` | `boolean` | `false` | When true, renders buttons to jump to the first and last pages. |
| `siblingCount` | `number` | `1` | Number of page buttons to show on each side of the current page before ellipsis truncation. |
| `labels` | `Partial<PaginationLabels>` | -- | Override default labels for internationalisation. |
| `className` | `string` | -- | Additional class names applied to the `<nav>` element. |

Pagination supports `ref` forwarding to the `<nav>` element.

## Size variants

The `size` prop controls the density of the pagination buttons, mapping directly to Button sizes.

```jsx
<Pagination totalPages={10} currentPage={1} onChange={setPage} size="mini" />
<Pagination totalPages={10} currentPage={1} onChange={setPage} size="compact" />
<Pagination totalPages={10} currentPage={1} onChange={setPage} size="default" />
<Pagination totalPages={10} currentPage={1} onChange={setPage} size="large" />
```

## First and last buttons

Enable `showFirstLast` to add double-chevron buttons that jump directly to page 1 or the final page.

```jsx
<Pagination totalPages={50} currentPage={25} onChange={setPage} showFirstLast />
```

## Ellipsis truncation

When the total page count exceeds the visible range, ellipsis indicators appear. The `siblingCount` prop controls how many numbered buttons surround the current page.

```jsx
// Shows: 1 ... 4 [5] 6 ... 20
<Pagination totalPages={20} currentPage={5} onChange={setPage} siblingCount={1} />

// Shows: 1 ... 3 4 [5] 6 7 ... 20
<Pagination totalPages={20} currentPage={5} onChange={setPage} siblingCount={2} />
```

## Internationalisation

Override the default button labels for localisation.

```jsx
<Pagination
  totalPages={10}
  currentPage={1}
  onChange={setPage}
  labels={{
    pagination: 'Navigation par pages',
    previousPage: 'Page precedente',
    nextPage: 'Page suivante',
    firstPage: 'Premiere page',
    lastPage: 'Derniere page',
    goToPage: (page) => `Aller a la page ${page}`,
  }}
/>
```

## Accessibility

- Wraps the control in `<nav aria-label="Pagination">`.
- Page buttons use `aria-label` with the page number (e.g., "Go to page 3").
- The active page button carries `aria-current="page"`.
- Previous and next buttons are disabled (not hidden) when at the boundary, preserving a consistent layout.
- Ellipsis elements are marked `aria-hidden="true"`.
