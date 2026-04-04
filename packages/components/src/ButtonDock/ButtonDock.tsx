import React, { forwardRef } from 'react';
import './ButtonDock.css';

/* ─── Types ───────────────────────────────────────────────────────────────────── */

export type ButtonDockPosition = 'fixed' | 'sticky';

export interface ButtonDockProps {
  /** Primary action button (typically a full-width Button). */
  primaryAction?: React.ReactNode;
  /** Secondary action button rendered below the primary action. */
  secondaryAction?: React.ReactNode;
  /** Dismiss/cancel link rendered below the secondary action. */
  dismissAction?: React.ReactNode;
  /** Controls whether the dock is fixed to the viewport or sticky. Defaults to 'fixed'. */
  position?: ButtonDockPosition;
  /** Additional CSS class names. */
  className?: string;
}

/* ─── Component ───────────────────────────────────────────────────────────────── */

/**
 * ButtonDock
 *
 * A fixed-position bottom action bar for primary and secondary actions.
 * Commonly used at the bottom of forms or pages to dock action buttons.
 *
 * @example
 * <ButtonDock
 *   primaryAction={<Button kind="primary">Save</Button>}
 *   secondaryAction={<Button kind="secondary">Save Draft</Button>}
 *   dismissAction={<Link href="/cancel">Cancel</Link>}
 * />
 */
const ButtonDock = forwardRef<HTMLDivElement, ButtonDockProps>(
  function ButtonDock(
    {
      primaryAction,
      secondaryAction,
      dismissAction,
      position = 'fixed',
      className,
    },
    ref
  ) {
    const classes = [
      'arch-button-dock',
      `arch-button-dock--${position}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} role="contentinfo">
        {primaryAction && (
          <div className="arch-button-dock__primary">{primaryAction}</div>
        )}
        {secondaryAction && (
          <div className="arch-button-dock__secondary">
            {secondaryAction}
          </div>
        )}
        {dismissAction && (
          <div className="arch-button-dock__dismiss">{dismissAction}</div>
        )}
      </div>
    );
  }
);

export { ButtonDock };
export default ButtonDock;
