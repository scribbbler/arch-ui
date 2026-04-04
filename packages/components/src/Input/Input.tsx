import React, { forwardRef, useCallback, useRef } from 'react';
import { IconButton } from '../IconButton';
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

  const showClear = clearable && !disabled && !readOnly && value !== undefined && value !== '';
  const hasRight = rightElement || showClear;

  const wrapperClasses = [
    'arch-input-wrapper',
    leftElement ? 'arch-input-wrapper--has-left' : '',
    hasRight ? 'arch-input-wrapper--has-right' : '',
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

      {showClear && !rightElement && (
        <IconButton
          variant="ghost"
          size="sm"
          className="arch-input__clear"
          onClick={handleClear}
          aria-label="Clear input"
          tabIndex={-1}
          icon={<span aria-hidden="true">&times;</span>}
        />
      )}

      {rightElement && (
        <span
          className="arch-input__element arch-input__element--right"
          aria-hidden="true"
        >
          {rightElement}
        </span>
      )}
    </div>
  );
});

export { Input };
export default Input;
