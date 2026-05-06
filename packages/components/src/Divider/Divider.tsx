import React, { forwardRef } from 'react';
import './Divider.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export type DividerOrientation = 'horizontal' | 'vertical';

export interface DividerProps extends Omit<React.HTMLAttributes<HTMLElement>, 'label'> {
  /** Orientation of the separator. Defaults to 'horizontal'. */
  orientation?: DividerOrientation;
  /**
   * Optional label centred along the divider.
   * Only renders when orientation is 'horizontal'.
   */
  label?: string;
  /** Additional CSS class names. */
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * Divider
 *
 * A semantic separator between sections or inline content.
 * Pass `label` to display text centred along a horizontal divider.
 *
 * @example
 * <Divider />
 * <Divider orientation="vertical" />
 * <Divider label="or" />
 */
const Divider = forwardRef<HTMLElement, DividerProps>(function Divider(
  {
    orientation = 'horizontal',
    label,
    className,
    ...rest
  },
  ref
) {
  const hasLabel = orientation === 'horizontal' && Boolean(label);

  if (hasLabel) {
    const classes = [
      'arch-divider',
      'arch-divider--horizontal',
      'arch-divider--with-label',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref as any}
        className={classes}
        role="separator"
        aria-orientation="horizontal"
        {...rest}
      >
        <span className="arch-divider__line" aria-hidden="true" />
        <span className="arch-divider__label">{label}</span>
        <span className="arch-divider__line" aria-hidden="true" />
      </div>
    );
  }

  const classes = [
    'arch-divider',
    `arch-divider--${orientation}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <hr
      ref={ref as any}
      className={classes}
      role="separator"
      aria-orientation={orientation}
      {...rest}
    />
  );
});

export { Divider };
export default Divider;
