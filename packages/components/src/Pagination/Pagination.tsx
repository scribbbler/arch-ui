import React, { forwardRef, useMemo } from 'react';
import { IconButton } from '../IconButton';
import { Button } from '../Button';
import { DEFAULT_LABELS, type PaginationLabels } from './Pagination.labels';
import './Pagination.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export interface PaginationProps {
  /** Total number of pages. */
  totalPages: number;
  /** The currently active page (1-indexed). */
  currentPage: number;
  /** Called with the target page number when the user navigates. */
  onChange: (page: number) => void;
  /** When true, renders buttons to jump to the first and last pages. */
  showFirstLast?: boolean;
  /** Number of page buttons to show on each side of the current page. Defaults to 1. */
  siblingCount?: number;
  /** Override default labels for internationalisation. */
  labels?: Partial<Omit<PaginationLabels, 'goToPage'>> & { goToPage?: (page: number) => string };
  /** Additional class names applied to the nav element. */
  className?: string;
}

/* ─── Helpers ─────────────────────────────────────────────────────────────────── */

/** Returns the sequence of page numbers and 'ellipsis' placeholders to render. */
function buildPageRange(
  currentPage: number,
  totalPages: number,
  siblingCount: number
): Array<number | 'ellipsis-start' | 'ellipsis-end'> {
  const totalPageNumbers = siblingCount * 2 + 5; // siblings + current + 2 boundaries + 2 ellipses

  // If total pages fit without ellipsis
  if (totalPages <= totalPageNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const siblingStart = Math.max(currentPage - siblingCount, 2);
  const siblingEnd = Math.min(currentPage + siblingCount, totalPages - 1);

  const showStartEllipsis = siblingStart > 2;
  const showEndEllipsis = siblingEnd < totalPages - 1;

  const result: Array<number | 'ellipsis-start' | 'ellipsis-end'> = [1];

  if (showStartEllipsis) {
    result.push('ellipsis-start');
  }

  for (let p = siblingStart; p <= siblingEnd; p++) {
    result.push(p);
  }

  if (showEndEllipsis) {
    result.push('ellipsis-end');
  }

  result.push(totalPages);

  return result;
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * Pagination
 *
 * Renders a `<nav aria-label="Pagination">` with previous/next controls,
 * numbered page buttons, optional first/last buttons, and ellipsis truncation
 * driven by `siblingCount`.
 *
 * @example
 * <Pagination
 *   totalPages={20}
 *   currentPage={5}
 *   onChange={setPage}
 *   showFirstLast
 *   siblingCount={1}
 * />
 */
const Pagination = forwardRef<HTMLElement, PaginationProps>(function Pagination(
  {
    totalPages,
    currentPage,
    onChange,
    showFirstLast = false,
    siblingCount = 1,
    labels,
    className,
  },
  ref
) {
  const mergedLabels = { ...DEFAULT_LABELS, ...labels };
  const pages = useMemo(
    () => buildPageRange(currentPage, totalPages, siblingCount),
    [currentPage, totalPages, siblingCount]
  );

  const isPrevDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;

  const classes = ['arch-pagination', className].filter(Boolean).join(' ');

  return (
    <nav ref={ref} aria-label={mergedLabels.pagination} className={classes}>
      <ol className="arch-pagination__list">
        {/* First page */}
        {showFirstLast && (
          <li className="arch-pagination__item">
            <IconButton
              variant="ghost"
              size="sm"
              className="arch-pagination__btn"
              aria-label={mergedLabels.firstPage}
              aria-disabled={isPrevDisabled ? 'true' : undefined}
              disabled={isPrevDisabled}
              onClick={() => {
                if (!isPrevDisabled) onChange(1);
              }}
              icon={<span aria-hidden="true">«</span>}
            />
          </li>
        )}

        {/* Previous page */}
        <li className="arch-pagination__item">
          <IconButton
            variant="ghost"
            size="sm"
            className="arch-pagination__btn"
            aria-label={mergedLabels.previousPage}
            aria-disabled={isPrevDisabled ? 'true' : undefined}
            disabled={isPrevDisabled}
            onClick={() => {
              if (!isPrevDisabled) onChange(currentPage - 1);
            }}
            icon={<span aria-hidden="true">‹</span>}
          />
        </li>

        {/* Page numbers and ellipses */}
        {pages.map((page, index) => {
          if (page === 'ellipsis-start' || page === 'ellipsis-end') {
            return (
              <li key={page} className="arch-pagination__item">
                <span className="arch-pagination__ellipsis" aria-hidden="true">
                  …
                </span>
              </li>
            );
          }

          const isCurrent = page === currentPage;

          return (
            <li key={`page-${page}-${index}`} className="arch-pagination__item">
              <Button
                variant={isCurrent ? 'primary' : 'ghost'}
                size="sm"
                className="arch-pagination__btn"
                aria-label={mergedLabels.goToPage(page)}
                aria-current={isCurrent ? 'page' : undefined}
                onClick={() => {
                  if (!isCurrent) onChange(page);
                }}
              >
                {page}
              </Button>
            </li>
          );
        })}

        {/* Next page */}
        <li className="arch-pagination__item">
          <IconButton
            variant="ghost"
            size="sm"
            className="arch-pagination__btn"
            aria-label={mergedLabels.nextPage}
            aria-disabled={isNextDisabled ? 'true' : undefined}
            disabled={isNextDisabled}
            onClick={() => {
              if (!isNextDisabled) onChange(currentPage + 1);
            }}
            icon={<span aria-hidden="true">›</span>}
          />
        </li>

        {/* Last page */}
        {showFirstLast && (
          <li className="arch-pagination__item">
            <IconButton
              variant="ghost"
              size="sm"
              className="arch-pagination__btn"
              aria-label={mergedLabels.lastPage}
              aria-disabled={isNextDisabled ? 'true' : undefined}
              disabled={isNextDisabled}
              onClick={() => {
                if (!isNextDisabled) onChange(totalPages);
              }}
              icon={<span aria-hidden="true">»</span>}
            />
          </li>
        )}
      </ol>
    </nav>
  );
});

export { Pagination };
export type { PaginationLabels } from './Pagination.labels';
export { DEFAULT_LABELS as DEFAULT_PAGINATION_LABELS } from './Pagination.labels';
export default Pagination;
