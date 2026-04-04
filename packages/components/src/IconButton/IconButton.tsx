import React, { forwardRef, ButtonHTMLAttributes } from 'react';
import './IconButton.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export type IconButtonKind = 'primary' | 'secondary' | 'tertiary' | 'dangerPrimary' | 'dangerSecondary' | 'dangerTertiary';
export type IconButtonSize = 'mini' | 'compact' | 'default' | 'large';
export type IconButtonShape = 'square' | 'circle';

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
  kind?: IconButtonKind;
  /** Size. Defaults to 'default'. */
  size?: IconButtonSize;
  /** Shape of the button. Defaults to 'square'. */
  shape?: IconButtonShape;
  /** Disables the button. */
  disabled?: boolean;
  /** Shows a spinner and disables the button. Sets aria-busy. */
  isLoading?: boolean;
  /** Additional class names. */
  className?: string;
}

/* ─── Kind/size → CSS class maps ─────────────────────────────────────────────── */

const kindClassMap: Record<IconButtonKind, string> = {
  primary: 'arch-icon-button--primary',
  secondary: 'arch-icon-button--secondary',
  tertiary: 'arch-icon-button--tertiary',
  dangerPrimary: 'arch-icon-button--danger-primary',
  dangerSecondary: 'arch-icon-button--danger-secondary',
  dangerTertiary: 'arch-icon-button--danger-tertiary',
};

const sizeClassMap: Record<IconButtonSize, string> = {
  mini: 'arch-icon-button--mini',
  compact: 'arch-icon-button--compact',
  default: 'arch-icon-button--default',
  large: 'arch-icon-button--large',
};

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * IconButton
 *
 * An icon-only button. Always renders a native `<button>`. The `aria-label`
 * prop is required and enforced with a development-time console error when
 * omitted, because without it the button has no accessible name.
 *
 * @example
 * <IconButton aria-label="Close dialog" icon={<CloseIcon />} kind="tertiary" />
 * <IconButton aria-label="Delete item" icon={<TrashIcon />} kind="dangerPrimary" shape="circle" />
 */
const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      'aria-label': ariaLabel,
      icon,
      kind = 'primary',
      size = 'default',
      shape = 'square',
      disabled = false,
      isLoading = false,
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

    const isDisabled = disabled || isLoading;

    const resolvedShape = shape ?? 'square';

    const classes = [
      'arch-icon-button',
      kindClassMap[kind],
      sizeClassMap[size],
      `arch-icon-button--shape-${resolvedShape}`,
      isLoading && 'arch-icon-button--loading',
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
        aria-busy={isLoading ? true : undefined}
        onClick={isDisabled ? undefined : onClick}
      >
        {isLoading ? (
          <span
            className="arch-icon-button__spinner"
            role="presentation"
            aria-hidden="true"
          />
        ) : (
          icon
        )}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

export { IconButton };
export default IconButton;
