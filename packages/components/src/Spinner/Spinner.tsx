import React, { forwardRef } from 'react';
import { DEFAULT_LABELS, type SpinnerLabels } from './Spinner.labels';
import './Spinner.css';

/* ─── Types ───────────────────────────────────────────────────────────────────── */

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg';

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Diameter of the spinner. xs=16px, sm=20px, md=32px, lg=48px. Defaults to 'md'. */
  size?: SpinnerSize;
  /** Accessible label announced by screen readers. Defaults to 'Loading'. */
  'aria-label'?: string;
  /** Override default labels for internationalisation. */
  labels?: Partial<SpinnerLabels>;
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
    'aria-label': ariaLabel,
    labels,
    className,
    ...rest
  },
  ref
) {
  const mergedLabels = { ...DEFAULT_LABELS, ...labels };
  const resolvedAriaLabel = ariaLabel ?? mergedLabels.loading;
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
      aria-label={resolvedAriaLabel}
      className={classes}
    />
  );
});

export { Spinner };
export type { SpinnerLabels } from './Spinner.labels';
export { DEFAULT_LABELS as DEFAULT_SPINNER_LABELS } from './Spinner.labels';
export default Spinner;
