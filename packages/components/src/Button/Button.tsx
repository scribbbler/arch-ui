import React, { forwardRef, ElementType, ComponentPropsWithRef } from 'react';
import './Button.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export type ButtonKind =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'dangerPrimary'
  | 'dangerSecondary'
  | 'dangerTertiary';

export type ButtonSize = 'mini' | 'compact' | 'default' | 'large';
export type ButtonShape = 'default' | 'pill' | 'circle' | 'square';

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
  kind?: ButtonKind;
  /** Size. Defaults to 'default'. */
  size?: ButtonSize;
  /** Shape of the button. Defaults to 'default'. */
  shape?: ButtonShape;
  /** Indicates that the button is selected (for toggle button groups). */
  isSelected?: boolean;
  /** Disables the button. */
  disabled?: boolean;
  /** Shows a spinner and disables the button. Sets aria-busy. */
  isLoading?: boolean;
  /** Visible label to display while loading. Replaces children. */
  loadingText?: string;
  /** A helper rendered at the start of the button. */
  startEnhancer?: React.ReactNode;
  /** A helper rendered at the end of the button. */
  endEnhancer?: React.ReactNode;
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

/* ─── Kind → CSS class mapping ───────────────────────────────────────────────── */

const kindClassMap: Record<ButtonKind, string> = {
  primary: 'arch-button--primary',
  secondary: 'arch-button--secondary',
  tertiary: 'arch-button--tertiary',
  dangerPrimary: 'arch-button--danger-primary',
  dangerSecondary: 'arch-button--danger-secondary',
  dangerTertiary: 'arch-button--danger-tertiary',
};

const sizeClassMap: Record<ButtonSize, string> = {
  mini: 'arch-button--mini',
  compact: 'arch-button--compact',
  default: 'arch-button--default',
  large: 'arch-button--large',
};

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
 * <Button kind="primary" size="default" onClick={handleSave}>Save</Button>
 * <Button as="a" href="/profile" kind="tertiary">View profile</Button>
 * <Button isLoading loadingText="Saving…">Save</Button>
 */
const Button = forwardRef(function Button(
  {
    as,
    kind = 'primary',
    size = 'default',
    shape = 'default',
    isSelected = false,
    disabled = false,
    isLoading = false,
    loadingText,
    startEnhancer,
    endEnhancer,
    fullWidth = false,
    type = 'button',
    className,
    children,
    onClick,
    ...rest
  }: ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const Tag = (as ?? 'button') as ElementType;
  const isDisabled = disabled || isLoading;

  const classes = [
    'arch-button',
    kindClassMap[kind],
    sizeClassMap[size],
    shape !== 'default' && `arch-button--shape-${shape}`,
    isSelected && 'arch-button--selected',
    isLoading && 'arch-button--loading',
    fullWidth && 'arch-button--full-width',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  /* Only pass `type` when rendering a <button> element to avoid invalid HTML. */
  const typeAttr = Tag === 'button' ? type : undefined;

  const label = isLoading && loadingText ? loadingText : children;

  return (
    <Tag
      {...rest}
      ref={ref}
      type={typeAttr}
      className={classes}
      disabled={Tag === 'button' ? isDisabled : undefined}
      aria-disabled={Tag !== 'button' && isDisabled ? true : undefined}
      aria-busy={isLoading ? true : undefined}
      aria-pressed={isSelected ? true : undefined}
      onClick={isDisabled ? undefined : onClick}
    >
      {isLoading ? (
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
          {startEnhancer && (
            <span className="arch-button__enhancer arch-button__enhancer--start" aria-hidden="true">
              {startEnhancer}
            </span>
          )}
          {label && (
            <span className="arch-button__label">{label}</span>
          )}
          {endEnhancer && (
            <span className="arch-button__enhancer arch-button__enhancer--end" aria-hidden="true">
              {endEnhancer}
            </span>
          )}
        </>
      )}
    </Tag>
  );
}) as ButtonComponent;

export { Button };
export default Button;
