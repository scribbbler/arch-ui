import React, { forwardRef, useCallback, useRef } from 'react';
import { Button } from '../Button';
import { Skeleton } from '../Skeleton';
import { Spinner } from '../Spinner';
import { useFormControl } from '../FormControl/index';
import './Input.css';

/* ─── Types ───────────────────────────────────────────────────────────────────── */

export type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'search'
  | 'url'
  | 'tel';

export type InputSize = 'xs' | 'sm' | 'md' | 'lg';

export interface InputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'type'
  > {
  /** HTML input type. Defaults to 'text'. */
  type?: InputType;
  /** Size variant controlling height, padding, and font size. Defaults to 'md'. */
  size?: InputSize;
  /** Node rendered in the leading (inline-start) slot — typically an icon. */
  leftElement?: React.ReactNode;
  /** Node rendered in the trailing (inline-end) slot — typically an icon or action. */
  rightElement?: React.ReactNode;
  /** Shows a clear button when the input has a value. Fires onChange with an empty value on clear. */
  clearable?: boolean;
  /** Shows a positive (success/valid) border style. */
  positive?: boolean;
  /** Disables the input. Also picked up from nearest FormControl context. */
  disabled?: boolean;
  /** Makes the input read-only. */
  readOnly?: boolean;
  /** Shows a green checkmark icon at the trailing position to indicate completion. */
  complete?: boolean;
  /** Shows a red X icon at the trailing position to indicate incompleteness. */
  incomplete?: boolean;
  /** Shows a Spinner at the trailing position to indicate loading. */
  loading?: boolean;
  /** Renders a Skeleton placeholder instead of the input. */
  preloading?: boolean;
  /** Additional CSS class names applied to the outer wrapper div. */
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * Input
 *
 * A single-line text input. When placed inside a FormControl, it automatically
 * inherits the field id, required state, disabled state, invalid state, and
 * aria-describedby wiring.
 *
 * @example
 * // Standalone
 * <Input type="email" placeholder="you@example.com" />
 *
 * // Inside FormControl
 * <FormControl id="email" required invalid={hasError}>
 *   <FormLabel>Email</FormLabel>
 *   <Input type="email" />
 *   <FormHelperText>We will never share your email.</FormHelperText>
 *   <FormErrorMessage>A valid email is required.</FormErrorMessage>
 * </FormControl>
 */
const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    type = 'text',
    size = 'md',
    leftElement,
    rightElement,
    clearable = false,
    positive = false,
    complete = false,
    incomplete = false,
    loading = false,
    preloading = false,
    disabled: disabledProp,
    readOnly,
    className,
    id: idProp,
    'aria-describedby': ariaDescribedByProp,
    'aria-invalid': ariaInvalidProp,
    value,
    onChange,
    ...rest
  },
  ref
) {
  const internalRef = useRef<HTMLInputElement>(null);

  const setRef = useCallback(
    (node: HTMLInputElement | null) => {
      (internalRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
      }
    },
    [ref]
  );
  const ctx = useFormControl();

  /* Merge props with context — explicit props take priority */
  const id = idProp ?? ctx.id ?? undefined;
  const disabled = disabledProp ?? ctx.disabled;
  const required = rest.required ?? ctx.required;
  const invalid =
    ariaInvalidProp !== undefined ? ariaInvalidProp : ctx.invalid || undefined;

  /* Build aria-describedby from context ids when inside a FormControl */
  const describedByParts: string[] = [];
  if (ariaDescribedByProp) {
    describedByParts.push(ariaDescribedByProp as string);
  } else if (ctx.id) {
    if (ctx.invalid) describedByParts.push(`${ctx.id}-error`);
    // Always include helper id — screen readers skip it if the element is absent
    describedByParts.push(`${ctx.id}-helper`);
  }
  const ariaDescribedBy =
    describedByParts.length > 0 ? describedByParts.join(' ') : undefined;

  /* ── Preloading: render skeleton instead of input ─────────────────────── */
  if (preloading) {
    return (
      <div className={['arch-input-wrapper', className].filter(Boolean).join(' ')}>
        <Skeleton width="100%" height="48px" />
      </div>
    );
  }

  /* ── State-driven right element (complete > incomplete > loading > rightElement) */
  const stateRightElement = loading ? (
    <Spinner />
  ) : complete ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
  ) : incomplete ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>
  ) : undefined;

  const resolvedRightElement = stateRightElement ?? rightElement;

  const showClear = clearable && !disabled && !readOnly && value !== undefined && value !== '';
  const hasRight = resolvedRightElement || showClear;

  const wrapperClasses = [
    'arch-input-wrapper',
    leftElement ? 'arch-input-wrapper--has-left' : '',
    hasRight ? 'arch-input-wrapper--has-right' : '',
    complete ? 'arch-input-wrapper--complete' : '',
    incomplete ? 'arch-input-wrapper--incomplete' : '',
    loading ? 'arch-input-wrapper--loading' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const inputClasses = [
    'arch-input',
    `arch-input--${size}`,
    positive && !invalid ? 'arch-input--positive' : '',
  ]
    .filter(Boolean)
    .join(' ');

  function handleClear() {
    if (internalRef.current) {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value'
      )?.set;
      nativeInputValueSetter?.call(internalRef.current, '');
      const event = new Event('input', { bubbles: true });
      internalRef.current.dispatchEvent(event);
    }
    if (onChange) {
      const syntheticEvent = {
        target: { ...internalRef.current, value: '' },
        currentTarget: { ...internalRef.current, value: '' },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
    internalRef.current?.focus();
  }

  return (
    <div className={wrapperClasses}>
      {leftElement && (
        <span
          className="arch-input__element arch-input__element--left"
          aria-hidden="true"
        >
          {leftElement}
        </span>
      )}

      <input
        {...rest}
        ref={setRef}
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        aria-required={required ? true : undefined}
        aria-invalid={invalid ? true : undefined}
        aria-disabled={disabled ? true : undefined}
        aria-describedby={ariaDescribedBy}
        className={inputClasses}
      />

      {showClear && !resolvedRightElement && (
        <Button
          kind="tertiary"
          size="compact"
          shape="square"
          className="arch-input__clear"
          onClick={handleClear}
          aria-label="Clear input"
          tabIndex={-1}
          startEnhancer={<span aria-hidden="true">&times;</span>}
        />
      )}

      {resolvedRightElement && (
        <span
          className="arch-input__element arch-input__element--right"
          aria-hidden="true"
        >
          {resolvedRightElement}
        </span>
      )}
    </div>
  );
});

export { Input };
export default Input;
