import React, { forwardRef, useRef, useCallback } from 'react';
import './PageControl.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export type PageControlSize = 'sm' | 'md';

export interface PageControlProps {
  /** Total number of pages (dots) to render. */
  numPages: number;
  /** Zero-based index of the currently active page. */
  currentPage: number;
  /** Called when the user selects a different page dot. */
  onChange: (page: number) => void;
  /** Size of the dots. Defaults to 'md'. */
  size?: PageControlSize;
  /** Additional CSS class names applied to the root element. */
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * PageControl
 *
 * A dot-based page indicator for carousels and onboarding flows. Each dot is
 * an interactive button following the ARIA tab pattern for keyboard navigation.
 *
 * @example
 * <PageControl numPages={5} currentPage={currentPage} onChange={setCurrentPage} />
 */
const PageControl = forwardRef<HTMLDivElement, PageControlProps>(function PageControl(
  { numPages, currentPage, onChange, size = 'md', className },
  ref
) {
  const dotRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const focusDot = useCallback((index: number) => {
    const btn = dotRefs.current[index];
    if (btn) btn.focus();
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      let nextIndex: number | null = null;

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        nextIndex = index < numPages - 1 ? index + 1 : 0;
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        nextIndex = index > 0 ? index - 1 : numPages - 1;
      } else if (event.key === 'Home') {
        event.preventDefault();
        nextIndex = 0;
      } else if (event.key === 'End') {
        event.preventDefault();
        nextIndex = numPages - 1;
      }

      if (nextIndex !== null) {
        focusDot(nextIndex);
        onChange(nextIndex);
      }
    },
    [numPages, onChange, focusDot]
  );

  const rootClasses = [
    'arch-page-control',
    size === 'sm' && 'arch-page-control--sm',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={ref}
      className={rootClasses}
      role="tablist"
      aria-label="Page navigation"
    >
      {Array.from({ length: numPages }, (_, index) => {
        const isActive = index === currentPage;
        return (
          <button
            key={index}
            ref={(el) => {
              dotRefs.current[index] = el;
            }}
            role="tab"
            type="button"
            className={`arch-page-control__dot${isActive ? ' arch-page-control__dot--active' : ''}`}
            aria-selected={isActive}
            aria-label={`Page ${index + 1}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        );
      })}
    </div>
  );
});

export { PageControl };
export default PageControl;
