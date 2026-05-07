import React, { forwardRef } from 'react';
import './TableGrid.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export interface TableGridProps {
  /** REQUIRED. CSS grid-template-columns value, e.g. '1fr 2fr 1fr'. */
  columns: string;
  /** Grid content — use TableGridHeader and TableGridCell sub-components. */
  children?: React.ReactNode;
  /** Additional CSS class names. */
  className?: string;
}

export interface TableGridCellProps {
  children?: React.ReactNode;
  className?: string;
}

export interface TableGridHeaderProps {
  children?: React.ReactNode;
  className?: string;
}

/* ─── Sub-components ─────────────────────────────────────────────────────────── */

/** TableGridHeader — renders a column header cell within the grid layout. */
const TableGridHeader = forwardRef<HTMLDivElement, TableGridHeaderProps>(
  function TableGridHeader({ children, className }, ref) {
    const classes = ['arch-table-grid__header', className].filter(Boolean).join(' ');
    return (
      <div ref={ref} className={classes} role="columnheader">
        {children}
      </div>
    );
  }
);

/** TableGridCell — renders a data cell within the grid layout. */
const TableGridCell = forwardRef<HTMLDivElement, TableGridCellProps>(
  function TableGridCell({ children, className }, ref) {
    const classes = ['arch-table-grid__cell', className].filter(Boolean).join(' ');
    return (
      <div ref={ref} className={classes} role="gridcell">
        {children}
      </div>
    );
  }
);

/* ─── TableGrid ──────────────────────────────────────────────────────────────── */

/**
 * TableGrid
 *
 * A CSS Grid-based table layout for complex data display.
 *
 * @example
 * <TableGrid columns="1fr 2fr 1fr">
 *   <TableGridHeader>Name</TableGridHeader>
 *   <TableGridHeader>Description</TableGridHeader>
 *   <TableGridHeader>Status</TableGridHeader>
 *   <TableGridCell>Item A</TableGridCell>
 *   <TableGridCell>A long description</TableGridCell>
 *   <TableGridCell>Active</TableGridCell>
 * </TableGrid>
 */
const TableGrid = forwardRef<HTMLDivElement, TableGridProps>(function TableGrid(
  { columns, children, className },
  ref
) {
  const classes = ['arch-table-grid', className].filter(Boolean).join(' ');
  const style = { '--arch-table-grid-columns': columns } as React.CSSProperties;

  return (
    <div ref={ref} className={classes} role="grid" style={style}>
      {children}
    </div>
  );
});

export { TableGrid, TableGridHeader, TableGridCell };
export default TableGrid;
