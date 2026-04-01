import React, { forwardRef } from 'react';
import './Table.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export type TableSize = 'sm' | 'md';

export interface TableProps {
  /** REQUIRED. Accessible description of the table rendered as a <caption>. */
  caption: string;
  /** When true, alternating body rows get a subtle background. */
  striped?: boolean;
  /** When true, all cells have visible borders. */
  bordered?: boolean;
  /** Cell padding density. Defaults to 'md'. */
  size?: TableSize;
  /** Table content — use Thead, Tbody, Tfoot, Tr, Th, Td sub-components. */
  children?: React.ReactNode;
  /** Additional CSS class names. */
  className?: string;
}

export interface TableSectionProps {
  children?: React.ReactNode;
  className?: string;
}

export interface TrProps {
  children?: React.ReactNode;
  className?: string;
}

export interface ThProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /** REQUIRED. Identifies the header cell scope. */
  scope: 'col' | 'row' | 'colgroup' | 'rowgroup';
  children?: React.ReactNode;
  className?: string;
}

export interface TdProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children?: React.ReactNode;
  className?: string;
}

/* ─── Sub-components ─────────────────────────────────────────────────────────── */

/** Thead — renders the <thead> element. */
const Thead = forwardRef<HTMLTableSectionElement, TableSectionProps>(
  function Thead({ children, className }, ref) {
    const classes = ['arch-thead', className].filter(Boolean).join(' ');
    return (
      <thead ref={ref} className={classes}>
        {children}
      </thead>
    );
  }
);

/** Tbody — renders the <tbody> element. */
const Tbody = forwardRef<HTMLTableSectionElement, TableSectionProps>(
  function Tbody({ children, className }, ref) {
    const classes = ['arch-tbody', className].filter(Boolean).join(' ');
    return (
      <tbody ref={ref} className={classes}>
        {children}
      </tbody>
    );
  }
);

/** Tfoot — renders the <tfoot> element. */
const Tfoot = forwardRef<HTMLTableSectionElement, TableSectionProps>(
  function Tfoot({ children, className }, ref) {
    const classes = ['arch-tfoot', className].filter(Boolean).join(' ');
    return (
      <tfoot ref={ref} className={classes}>
        {children}
      </tfoot>
    );
  }
);

/** Tr — renders a <tr> element. */
const Tr = forwardRef<HTMLTableRowElement, TrProps>(function Tr(
  { children, className },
  ref
) {
  const classes = ['arch-tr', className].filter(Boolean).join(' ');
  return (
    <tr ref={ref} className={classes}>
      {children}
    </tr>
  );
});

/** Th — renders a <th> header cell. Requires scope attribute. */
const Th = forwardRef<HTMLTableCellElement, ThProps>(function Th(
  { children, className, scope, ...rest },
  ref
) {
  const classes = ['arch-th', className].filter(Boolean).join(' ');
  return (
    <th ref={ref} scope={scope} className={classes} {...rest}>
      {children}
    </th>
  );
});

/** Td — renders a <td> data cell. */
const Td = forwardRef<HTMLTableCellElement, TdProps>(function Td(
  { children, className, ...rest },
  ref
) {
  const classes = ['arch-td', className].filter(Boolean).join(' ');
  return (
    <td ref={ref} className={classes} {...rest}>
      {children}
    </td>
  );
});

/* ─── Table ──────────────────────────────────────────────────────────────────── */

/**
 * Table
 *
 * A semantic, accessible data table. Always provide a caption. Use Thead,
 * Tbody, Tfoot, Tr, Th, and Td sub-components for structure.
 *
 * @example
 * <Table caption="Monthly sales" striped>
 *   <Thead>
 *     <Tr>
 *       <Th scope="col">Month</Th>
 *       <Th scope="col">Revenue</Th>
 *     </Tr>
 *   </Thead>
 *   <Tbody>
 *     <Tr>
 *       <Td>January</Td>
 *       <Td>$12,000</Td>
 *     </Tr>
 *   </Tbody>
 * </Table>
 */
const Table = forwardRef<HTMLTableElement, TableProps>(function Table(
  { caption, striped = false, bordered = false, size = 'md', children, className },
  ref
) {
  const classes = [
    'arch-table',
    `arch-table--${size}`,
    striped && 'arch-table--striped',
    bordered && 'arch-table--bordered',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="arch-table-wrapper">
      <table ref={ref} className={classes}>
        <caption className="arch-table__caption">{caption}</caption>
        {children}
      </table>
    </div>
  );
});

export { Table, Thead, Tbody, Tfoot, Tr, Th, Td };
export default Table;
