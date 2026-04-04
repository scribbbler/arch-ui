import React, { forwardRef, useMemo } from 'react';
import { IconButton, type IconButtonSize, type IconButtonShape } from '../IconButton';
import { Button, type ButtonSize, type ButtonShape } from '../Button';
import { DEFAULT_LABELS, type PaginationLabels } from './Pagination.labels';
import './Pagination.css';

/* ─── Nav icons (inline SVG for zero-dependency) ─────────────────────────────── */

const ChevronLeftSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
  </svg>
);

const ChevronRightSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
  </svg>
);

const ChevronDoubleLeftSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.41,7.41L17,6L11,12L17,18L18.41,16.59L13.83,12L18.41,7.41M12.41,7.41L11,6L5,12L11,18L12.41,16.59L7.83,12L12.41,7.41Z" />
  </svg>
);

const ChevronDoubleRightSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M5.59,7.41L7,6L13,12L7,18L5.59,16.59L10.17,12L5.59,7.41M11.59,7.41L13,6L19,12L13,18L11.59,16.59L16.17,12L11.59,7.41Z" />
  </svg>
);

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export type PaginationSize = 'mini' | 'compact' | 'default' | 'large';
export type PaginationShape = 'default' | 'pill' | 'circle' | 'square';

export interface PaginationProps {
  /** Total number of pages. */
  totalPages: number;
  /** The currently active page (1-indexed). */
  currentPage: number;
  /** Called with the target page number when the user navigates. */
  onChange: (page: number) => void;
  /** Size of the pagination buttons. Defaults to 'compact'. */
  size?: PaginationSize;
  /** Shape of the pagination buttons. Defaults to 'default'. */
  shape?: PaginationShape;
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
  const totalPageNumbers = siblingCount * 2 + 5;

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

/* ─── Size class map for CSS ─────────────────────────────────────────────────── */

const sizeClassMap: Record<PaginationSize, string> = {
  mini: 'arch-pagination--mini',
  compact: 'arch-pagination--compact',
  default: 'arch-pagination--default',
  large: 'arch-pagination--large',
};

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
 *   size="compact"
 *   showFirstLast
 *   siblingCount={1}
 * />
 */
const Pagination = forwardRef<HTMLElement, PaginationProps>(function Pagination(
  {
    totalPages,
    currentPage,
    onChange,
    size = 'compact',
    shape = 'default',
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

  const btnSize = size as ButtonSize;
  const iconBtnSize = size as IconButtonSize;

  // Map pagination shape to Button/IconButton shape props
  // Button has: default, pill, circle, square
  // IconButton has: square, circle
  // Map pagination shape to both consistently
  const btnShape: ButtonShape = shape === 'circle' ? 'circle' : shape === 'pill' ? 'pill' : shape === 'square' ? 'square' : 'default';
  const iconBtnShape: IconButtonShape = (shape === 'circle' || shape === 'pill') ? 'circle' : 'square';

  const classes = ['arch-pagination', sizeClassMap[size], className].filter(Boolean).join(' ');

  return (
    <nav ref={ref} aria-label={mergedLabels.pagination} className={classes}>
      <ol className="arch-pagination__list">
        {/* First page */}
        {showFirstLast && (
          <li className="arch-pagination__item">
            <IconButton
              kind="tertiary"
              size={iconBtnSize}
              shape={iconBtnShape}
              aria-label={mergedLabels.firstPage}
              disabled={isPrevDisabled}
              onClick={() => {
                if (!isPrevDisabled) onChange(1);
              }}
              icon={<ChevronDoubleLeftSvg />}
            />
          </li>
        )}

        {/* Previous page */}
        <li className="arch-pagination__item">
          <IconButton
            kind="tertiary"
            size={iconBtnSize}
            shape={iconBtnShape}
            aria-label={mergedLabels.previousPage}
            disabled={isPrevDisabled}
            onClick={() => {
              if (!isPrevDisabled) onChange(currentPage - 1);
            }}
            icon={<ChevronLeftSvg />}
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
                kind={isCurrent ? 'primary' : 'tertiary'}
                size={btnSize}
                shape={btnShape}
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
            kind="tertiary"
            size={iconBtnSize}
            shape={iconBtnShape}
            aria-label={mergedLabels.nextPage}
            disabled={isNextDisabled}
            onClick={() => {
              if (!isNextDisabled) onChange(currentPage + 1);
            }}
            icon={<ChevronRightSvg />}
          />
        </li>

        {/* Last page */}
        {showFirstLast && (
          <li className="arch-pagination__item">
            <IconButton
              kind="tertiary"
              size={iconBtnSize}
              shape={iconBtnShape}
              aria-label={mergedLabels.lastPage}
              disabled={isNextDisabled}
              onClick={() => {
                if (!isNextDisabled) onChange(totalPages);
              }}
              icon={<ChevronDoubleRightSvg />}
            />
          </li>
        )}
      </ol>
    </nav>
  );
});

export { Pagination };
export type { PaginationSize, PaginationShape };
export type { PaginationLabels } from './Pagination.labels';
export { DEFAULT_LABELS as DEFAULT_PAGINATION_LABELS } from './Pagination.labels';
export default Pagination;
