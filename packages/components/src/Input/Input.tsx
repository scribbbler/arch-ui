import React, { forwardRef } from 'react';
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

export type InputSize = 'sm' | 'md' | 'lg';

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
    disabled: disabledProp,
    readOnly,
    className,
    id: idProp,
    'aria-describedby': ariaDescribedByProp,
    'aria-invalid': ariaInvalidProp,
    ...rest
  },
  ref
) {
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

  const wrapperClasses = [
    'arch-input-wrapper',
    leftElement ? 'arch-input-wrapper--has-left' : '',
    rightElement ? 'arch-input-wrapper--has-right' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const inputClasses = ['arch-input', `arch-input--${size}`]
    .filter(Boolean)
    .join(' ');

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
        ref={ref}
        id={id}
        type={type}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        aria-required={required ? true : undefined}
        aria-invalid={invalid ? true : undefined}
        aria-disabled={disabled ? true : undefined}
        aria-describedby={ariaDescribedBy}
        className={inputClasses}
      />

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
