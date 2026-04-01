import React, { forwardRef, ElementType, ComponentPropsWithRef } from 'react';
import './Button.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * PolymorphicRef — resolves the ref type for the rendered element.
 */
type PolymorphicRef<E extends ElementType> = ComponentPropsWithRef<E>['ref'];

/**
 * BaseButtonProps — the component's own prop surface, independent of the
 * underlying element.
 */
export interface BaseButtonProps {
  /** Visual style. Defaults to 'primary'. */
  variant?: ButtonVariant;
  /** Size. Defaults to 'md'. */
  size?: ButtonSize;
  /** Disables the button. */
  disabled?: boolean;
  /** Shows a spinner and disables the button. Sets aria-busy. */
  loading?: boolean;
  /** Visible label to display while loading. Replaces children. */
  loadingText?: string;
  /** Node rendered to the inline-start of the label. */
  leftIcon?: React.ReactNode;
  /** Node rendered to the inline-end of the label. */
  rightIcon?: React.ReactNode;
  /** Stretches button to 100% container width. */
  fullWidth?: boolean;
  /** HTML button type. Defaults to 'button'. */
  type?: 'button' | 'submit' | 'reset';
  /** Additional class names. */
  className?: string;
  /** Button label content. */
  children?: React.ReactNode;
  /** Click handler. */
  onClick?: React.MouseEventHandler;
}

/**
 * ButtonProps — merges BaseButtonProps with the underlying element's props
 * (excluding collisions), plus the polymorphic `as` prop.
 */
export type ButtonProps<E extends ElementType = 'button'> = BaseButtonProps & {
  /** The element or component to render. Defaults to 'button'. */
  as?: E;
} & Omit<ComponentPropsWithRef<E>, keyof BaseButtonProps | 'as'>;

/* ─── Component ──────────────────────────────────────────────────────────────── */

type ButtonComponent = <E extends ElementType = 'button'>(
  props: ButtonProps<E> & { ref?: PolymorphicRef<E> }
) => React.ReactElement | null;

/**
 * Button
 *
 * A polymorphic, accessible button component. Always renders a `<button>` by
 * default; pass `as="a"` (or any element / component) to change the root element
 * while keeping the visual style.
 *
 * @example
 * <Button variant="primary" size="md" onClick={handleSave}>Save</Button>
 * <Button as="a" href="/profile" variant="link">View profile</Button>
 * <Button loading loadingText="Saving…">Save</Button>
 */
const Button: ButtonComponent = forwardRef(function Button<
  E extends ElementType = 'button'
>(
  {
    as,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    loadingText,
    leftIcon,
    rightIcon,
    fullWidth = false,
    type = 'button',
    className,
    children,
    onClick,
    ...rest
  }: ButtonProps<E>,
  ref: PolymorphicRef<E>
) {
  const Tag = (as ?? 'button') as ElementType;
  const isDisabled = disabled || loading;

  const classes = [
    'arch-button',
    `arch-button--${variant}`,
    `arch-button--${size}`,
    loading && 'arch-button--loading',
    fullWidth && 'arch-button--full-width',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  /* Only pass `type` when rendering a <button> element to avoid invalid HTML. */
  const typeAttr = Tag === 'button' ? type : undefined;

  const label = loading && loadingText ? loadingText : children;

  return (
    <Tag
      {...rest}
      ref={ref}
      type={typeAttr}
      className={classes}
      disabled={Tag === 'button' ? isDisabled : undefined}
      aria-disabled={Tag !== 'button' && isDisabled ? true : undefined}
      aria-busy={loading ? true : undefined}
      onClick={isDisabled ? undefined : onClick}
    >
      {loading ? (
        <>
          <span
            className="arch-button__spinner"
            role="presentation"
            aria-hidden="true"
          />
          {label && (
            <span className="arch-button__label">{label}</span>
          )}
        </>
      ) : (
        <>
          {leftIcon && (
            <span className="arch-button__icon arch-button__icon--left" aria-hidden="true">
              {leftIcon}
            </span>
          )}
          {label && (
            <span className="arch-button__label">{label}</span>
          )}
          {rightIcon && (
            <span className="arch-button__icon arch-button__icon--right" aria-hidden="true">
              {rightIcon}
            </span>
          )}
        </>
      )}
    </Tag>
  );
}) as ButtonComponent;

export { Button };
export default Button;
