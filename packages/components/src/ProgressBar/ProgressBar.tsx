import React, { forwardRef } from 'react';
import './ProgressBar.css';

/* ─── Types ───────────────────────────────────────────────────────────────────── */

export type ProgressBarSize = 'sm' | 'md';

export interface ProgressBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'label'> {
  /** Current progress value 0–100. Ignored when indeterminate=true. Defaults to 0. */
  value?: number;
  /** When true, displays an animated bar for operations of unknown duration. */
  indeterminate?: boolean;
  /** Height of the track. sm=4px, md=8px. Defaults to 'md'. */
  size?: ProgressBarSize;
  /** Accessible label applied as aria-label. Required for screen readers. */
  label?: string;
  /** Value at which the bar shows a success state. Defaults to 100. */
  successValue?: number;
  /** When true, renders a percentage label alongside the bar. */
  showLabel?: boolean;
  /** Additional CSS class names applied to the root element. */
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * ProgressBar
 *
 * A linear progress indicator for determinate or indeterminate operations.
 * Implements the ARIA progressbar role with aria-valuenow/min/max attributes.
 *
 * @example
 * <ProgressBar value={40} label="Upload progress" />
 * <ProgressBar indeterminate label="Loading data" />
 */
const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(function ProgressBar(
  {
    value = 0,
    indeterminate = false,
    size = 'md',
    label,
    successValue = 100,
    showLabel = false,
    className,
    ...rest
  },
  ref
) {
  const clamped = Math.min(100, Math.max(0, value));
  const isSuccess = !indeterminate && clamped >= successValue;

  const classes = [
    'arch-progressbar',
    `arch-progressbar--${size}`,
    indeterminate ? 'arch-progressbar--indeterminate' : '',
    isSuccess ? 'arch-progressbar--success' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={showLabel ? 'arch-progressbar__wrapper' : undefined}>
      <div
        {...rest}
        ref={ref}
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={indeterminate ? undefined : clamped}
        className={classes}
        style={
          indeterminate
            ? undefined
            : { '--arch-progress-value': `${clamped}%` } as React.CSSProperties
        }
      >
        <div className="arch-progressbar__fill" />
      </div>
      {showLabel && !indeterminate && (
        <span className="arch-progressbar__label" aria-hidden="true">
          {Math.round(clamped)}%
        </span>
      )}
    </div>
  );
});

export { ProgressBar };
export default ProgressBar;
