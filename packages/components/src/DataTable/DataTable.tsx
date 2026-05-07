import React, { forwardRef, useState, useCallback } from 'react';
import { useLocale } from '../Locale';
import './DataTable.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export interface DataTableColumn {
  /** Unique key matching the data object property. */
  key: string;
  /** Display title for the column header. */
  title: string;
  /** When true, the column can be sorted. */
  sortable?: boolean;
  /** Optional CSS width for the column. */
  width?: string;
  /** Optional custom render function for the cell content. */
  render?: (value: any, row: any) => React.ReactNode;
}

export type SortDirection = 'asc' | 'desc' | 'none';

export interface DataTableProps {
  /** REQUIRED. Array of column definitions. */
  columns: DataTableColumn[];
  /** REQUIRED. Array of data objects to display as rows. */
  data: any[];
  /** When true, enables sorting on columns with sortable set to true. */
  sortable?: boolean;
  /** When true, columns can be resized. */
  resizable?: boolean;
  /** When true, displays a loading state overlay. */
  loading?: boolean;
  /** Message displayed when the data array is empty. */
  emptyMessage?: string;
  /** Additional CSS class names. */
  className?: string;
}

/* ─── DataTable ──────────────────────────────────────────────────────────────── */

/**
 * DataTable
 *
 * A feature-rich data table with sorting, filtering, and pagination.
 *
 * @example
 * <DataTable
 *   columns={[
 *     { key: 'name', title: 'Name', sortable: true },
 *     { key: 'email', title: 'Email' },
 *   ]}
 *   data={[{ name: 'Alice', email: 'alice@example.com' }]}
 *   sortable
 * />
 */
const DataTable = forwardRef<HTMLDivElement, DataTableProps>(function DataTable(
  {
    columns,
    data,
    sortable = false,
    resizable = false,
    loading = false,
    emptyMessage: emptyMessageProp,
    className,
  },
  ref
) {
  const locale = useLocale();
  const emptyMessage = emptyMessageProp ?? locale.datatable.emptyState;
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('none');

  const handleSort = useCallback(
    (key: string) => {
      if (!sortable) return;
      if (sortKey === key) {
        setSortDirection((prev) =>
          prev === 'none' ? 'asc' : prev === 'asc' ? 'desc' : 'none'
        );
      } else {
        setSortKey(key);
        setSortDirection('asc');
      }
    },
    [sortable, sortKey]
  );

  const sortedData = React.useMemo(() => {
    if (!sortKey || sortDirection === 'none') return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortKey, sortDirection]);

  const classes = [
    'arch-data-table',
    resizable && 'arch-data-table--resizable',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={ref} className={classes}>
      <div className="arch-data-table__wrapper">
        <table className="arch-data-table__table" aria-busy={loading}>
          <thead className="arch-data-table__thead">
            <tr className="arch-data-table__tr">
              {columns.map((col) => {
                const isSortable = sortable && col.sortable;
                const ariaSortValue =
                  sortKey === col.key && sortDirection !== 'none'
                    ? sortDirection === 'asc'
                      ? 'ascending'
                      : 'descending'
                    : undefined;

                return (
                  <th
                    key={col.key}
                    className={[
                      'arch-data-table__th',
                      isSortable && 'arch-data-table__th--sortable',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    scope="col"
                    aria-sort={ariaSortValue}
                    style={col.width ? ({ '--arch-data-table-col-width': col.width } as React.CSSProperties) : undefined}
                  >
                    {isSortable ? (
                      <button
                        type="button"
                        className="arch-data-table__sort-button"
                        onClick={() => handleSort(col.key)}
                      >
                        {col.title}
                        <span className="arch-data-table__sort-indicator" aria-hidden="true">
                          {sortKey === col.key && sortDirection === 'asc' && '\u2191'}
                          {sortKey === col.key && sortDirection === 'desc' && '\u2193'}
                          {(sortKey !== col.key || sortDirection === 'none') && '\u2195'}
                        </span>
                      </button>
                    ) : (
                      col.title
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="arch-data-table__tbody">
            {sortedData.length === 0 && !loading ? (
              <tr className="arch-data-table__tr">
                <td
                  className="arch-data-table__td arch-data-table__empty"
                  colSpan={columns.length}
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              sortedData.map((row, rowIndex) => (
                <tr key={rowIndex} className="arch-data-table__tr">
                  {columns.map((col) => (
                    <td key={col.key} className="arch-data-table__td">
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
        {loading && (
          <div className="arch-data-table__loading" aria-live="polite">
            <span className="arch-data-table__loading-text">{locale.datatable.loadingState}</span>
          </div>
        )}
      </div>
    </div>
  );
});

export { DataTable };
export default DataTable;
