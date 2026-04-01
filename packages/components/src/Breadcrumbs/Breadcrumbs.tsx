import React, { forwardRef } from 'react';
import './Breadcrumbs.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export interface BreadcrumbItem {
  /** Visible text for this breadcrumb step. */
  label: string;
  /** The URL this step links to. Omit for the last (current) item. */
  href?: string;
}

export interface BreadcrumbsProps {
  /** Ordered array of breadcrumb items. Last item is the current page. */
  items: BreadcrumbItem[];
  /** Separator rendered between items. Defaults to '/'. */
  separator?: React.ReactNode;
  /** Additional class names applied to the nav element. */
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * Breadcrumbs
 *
 * Renders an accessible breadcrumb trail inside a `<nav aria-label="Breadcrumb">`.
 * The last item is always the current page: it renders as a `<span>` with
 * `aria-current="page"` rather than a link. Separator elements are `aria-hidden`
 * so screen readers only announce the labels.
 *
 * @example
 * <Breadcrumbs
 *   items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Products', href: '/products' },
 *     { label: 'Widget' },
 *   ]}
 * />
 */
const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(function Breadcrumbs(
  { items, separator = '/', className },
  ref
) {
  const classes = ['arch-breadcrumbs', className].filter(Boolean).join(' ');

  return (
    <nav ref={ref} aria-label="Breadcrumb" className={classes}>
      <ol className="arch-breadcrumbs__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isFirst = index === 0;

          return (
            <li key={`${item.label}-${index}`} className="arch-breadcrumbs__item">
              {!isFirst && (
                <span className="arch-breadcrumbs__separator" aria-hidden="true">
                  {separator}
                </span>
              )}
              {isLast ? (
                <span className="arch-breadcrumbs__current" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <a className="arch-breadcrumbs__link" href={item.href}>
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
});

export { Breadcrumbs };
export default Breadcrumbs;
