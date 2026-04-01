import React, { forwardRef, ButtonHTMLAttributes } from 'react';
import './IconButton.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export type IconButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'link';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /**
   * Accessible label for the button. REQUIRED — must describe the action.
   * A console error is logged in development if this is missing.
   */
  'aria-label': string;
  /** The icon to render inside the button. */
  icon?: React.ReactNode;
  /** Visual style. Defaults to 'primary'. */
  variant?: IconButtonVariant;
  /** Size. Defaults to 'md'. */
  size?: IconButtonSize;
  /** Disables the button. */
  disabled?: boolean;
  /** Shows a spinner and disables the button. Sets aria-busy. */
  loading?: boolean;
  /** Additional class names. */
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * IconButton
 *
 * An icon-only button. Always renders a native `<button>`. The `aria-label`
 * prop is required and enforced with a development-time console error when
 * omitted, because without it the button has no accessible name.
 *
 * @example
 * <IconButton aria-label="Close dialog" icon={<CloseIcon />} variant="ghost" />
 * <IconButton aria-label="Delete item" icon={<TrashIcon />} variant="destructive" />
 */
const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      'aria-label': ariaLabel,
      icon,
      variant = 'primary',
      size = 'md',
      disabled = false,
      loading = false,
      className,
      onClick,
      type = 'button',
      ...rest
    },
    ref
  ) {
    /* Development-time guard — aria-label is required */
    if (process.env.NODE_ENV !== 'production') {
      if (!ariaLabel) {
        // eslint-disable-next-line no-console
        console.error(
          '[arch-ui] IconButton: The `aria-label` prop is required for accessibility. ' +
            'Provide a concise description of the action this button performs.'
        );
      }
    }

    const isDisabled = disabled || loading;

    const classes = [
      'arch-icon-button',
      `arch-icon-button--${variant}`,
      `arch-icon-button--${size}`,
      loading && 'arch-icon-button--loading',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        {...rest}
        ref={ref}
        type={type}
        className={classes}
        disabled={isDisabled}
        aria-label={ariaLabel}
        aria-busy={loading ? true : undefined}
        onClick={isDisabled ? undefined : onClick}
      >
        {loading ? (
          <span
            className="arch-icon-button__spinner"
            role="presentation"
            aria-hidden="true"
          />
        ) : (
          icon && (
            <span className="arch-icon-button__icon" aria-hidden="true">
              {icon}
            </span>
          )
        )}
      </button>
    );
  }
);

export { IconButton };
export default IconButton;
