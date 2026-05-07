import React, { forwardRef } from 'react';
import './MobileHeader.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export interface MobileHeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Title text displayed in the centre of the header. */
  title?: string;
  /** Callback fired when the back button is pressed. */
  onBack?: () => void;
  /** Accessible label for the back button. Defaults to 'Back'. */
  backLabel?: string;
  /** Icon rendered in the trailing action button. */
  actionIcon?: React.ReactNode;
  /** Callback fired when the action button is pressed. */
  onAction?: () => void;
  /** Additional CSS class names. */
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * MobileHeader
 *
 * Mobile-optimised header with back button, title, and action area.
 *
 * @example
 * <MobileHeader
 *   title="Settings"
 *   onBack={() => history.back()}
 *   actionIcon={<MoreIcon />}
 *   onAction={() => openMenu()}
 * />
 */
const MobileHeader = forwardRef<HTMLElement, MobileHeaderProps>(
  function MobileHeader(
    {
      title,
      onBack,
      backLabel = 'Back',
      actionIcon,
      onAction,
      className,
      ...rest
    },
    ref
  ) {
    const classes = ['arch-mobile-header', className].filter(Boolean).join(' ');

    return (
      <header ref={ref} className={classes} {...rest}>
        <div className="arch-mobile-header__start">
          {onBack && (
            <button
              type="button"
              className="arch-mobile-header__back"
              onClick={onBack}
              aria-label={backLabel}
            >
              <span className="arch-mobile-header__back-arrow" aria-hidden="true">
                &#8592;
              </span>
            </button>
          )}
        </div>

        {title && (
          <h1 className="arch-mobile-header__title">{title}</h1>
        )}

        <div className="arch-mobile-header__end">
          {actionIcon && onAction && (
            <button
              type="button"
              className="arch-mobile-header__action"
              onClick={onAction}
            >
              {actionIcon}
            </button>
          )}
        </div>
      </header>
    );
  }
);

export { MobileHeader };
export default MobileHeader;
