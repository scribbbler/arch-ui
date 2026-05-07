import React, { forwardRef } from 'react';
import './TableSemantic.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export type TableSemanticSize = 'compact' | 'default' | 'spacious';

export interface TableSemanticProps {
  /** Table content using native HTML table elements (thead, tbody, tr, th, td). */
  children?: React.ReactNode;
  /** When true, alternating rows receive a subtle background. */
  striped?: boolean;
  /** When true, rows highlight on hover. */
  hoverable?: boolean;
  /** Controls cell padding density. Defaults to 'default'. */
  size?: TableSemanticSize;
  /** Additional CSS class names. */
  className?: string;
}

/* ─── TableSemantic ──────────────────────────────────────────────────────────── */

/**
 * TableSemantic
 *
 * A simple semantic HTML table wrapper with consistent styling.
 *
 * @example
 * <TableSemantic striped hoverable size="compact">
 *   <thead>
 *     <tr>
 *       <th scope="col">Name</th>
 *       <th scope="col">Role</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <tr>
 *       <td>Alice</td>
 *       <td>Engineer</td>
 *     </tr>
 *   </tbody>
 * </TableSemantic>
 */
const TableSemantic = forwardRef<HTMLTableElement, TableSemanticProps>(
  function TableSemantic(
    { children, striped = false, hoverable = false, size = 'default', className },
    ref
  ) {
    const classes = [
      'arch-table-semantic',
      `arch-table-semantic--${size}`,
      striped && 'arch-table-semantic--striped',
      hoverable && 'arch-table-semantic--hoverable',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className="arch-table-semantic__wrapper">
        <table ref={ref} className={classes}>
          {children}
        </table>
      </div>
    );
  }
);

export { TableSemantic };
export default TableSemantic;
