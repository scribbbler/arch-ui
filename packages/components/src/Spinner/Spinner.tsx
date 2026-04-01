import React, { forwardRef } from 'react';
import './Spinner.css';

/* ─── Types ───────────────────────────────────────────────────────────────────── */

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg';

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Diameter of the spinner. xs=16px, sm=20px, md=32px, lg=48px. Defaults to 'md'. */
  size?: SpinnerSize;
  /** Accessible label announced by screen readers. Defaults to 'Loading'. */
  'aria-label'?: string;
  /** Additional CSS class names applied to the root element. */
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * Spinner
 *
 * A circular loading indicator for indeterminate async operations.
 * Respects prefers-reduced-motion: animation is disabled and a static
 * partial-ring is shown instead.
 *
 * @example
 * <Spinner />
 * <Spinner size="lg" aria-label="Saving changes" />
 */
const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  {
    size = 'md',
    'aria-label': ariaLabel = 'Loading',
    className,
    ...rest
  },
  ref
) {
  const classes = [
    'arch-spinner',
    `arch-spinner--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      {...rest}
      ref={ref}
      role="status"
      aria-label={ariaLabel}
      className={classes}
    />
  );
});

export { Spinner };
export default Spinner;
