import React, { forwardRef } from 'react';
import { useFormControl } from '../FormControl/index';
import './Select.css';

/* ─── Types ───────────────────────────────────────────────────────────────────── */

export type SelectSize = 'xs' | 'sm' | 'md' | 'lg';

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Size variant controlling height, padding, and font size. Defaults to 'md'. */
  size?: SelectSize;
  /** Inserts a disabled empty-value option as a placeholder prompt. */
  placeholder?: string;
  /** Enables multi-select listbox mode. */
  multiple?: boolean;
  /** Disables the select. Also picked up from nearest FormControl context. */
  disabled?: boolean;
  /** Puts the select into an error visual state. Also triggered by FormControl invalid. */
  isError?: boolean;
  /** Shows a positive (success/valid) border style. */
  positive?: boolean;
  /** <option> and <optgroup> elements. */
  children?: React.ReactNode;
  /** Additional CSS class names applied to the wrapper div. */
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * Select
 *
 * A native <select> element styled consistently with Input. The native arrow
 * is hidden and replaced with a custom chevron via CSS background-image.
 * When placed inside a FormControl, it automatically inherits the field id,
 * required state, disabled state, invalid state, and aria-describedby wiring.
 *
 * @example
 * // Standalone
 * <Select aria-label="Country" placeholder="Select a country">
 *   <option value="us">United States</option>
 *   <option value="ca">Canada</option>
 * </Select>
 *
 * // Inside FormControl
 * <FormControl id="country" required invalid={hasError}>
 *   <FormLabel>Country</FormLabel>
 *   <Select placeholder="Select a country">
 *     <option value="us">United States</option>
 *   </Select>
 *   <FormErrorMessage>Please select a country.</FormErrorMessage>
 * </FormControl>
 */
const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    size = 'md',
    placeholder,
    multiple = false,
    disabled: disabledProp,
    isError = false,
    positive = false,
    children,
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
    ariaInvalidProp !== undefined
      ? ariaInvalidProp
      : isError || ctx.invalid || undefined;

  /* Build aria-describedby from context ids when inside a FormControl */
  const describedByParts: string[] = [];
  if (ariaDescribedByProp) {
    describedByParts.push(ariaDescribedByProp as string);
  } else if (ctx.id) {
    if (ctx.invalid || isError) describedByParts.push(`${ctx.id}-error`);
    describedByParts.push(`${ctx.id}-helper`);
  }
  const ariaDescribedBy =
    describedByParts.length > 0 ? describedByParts.join(' ') : undefined;

  const wrapperClasses = ['arch-select-wrapper', className]
    .filter(Boolean)
    .join(' ');

  const selectClasses = [
    'arch-select',
    `arch-select--${size}`,
    invalid ? 'arch-select--error' : '',
    positive && !invalid ? 'arch-select--positive' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses}>
      <select
        {...rest}
        ref={ref}
        id={id}
        disabled={disabled}
        multiple={multiple}
        required={required}
        aria-required={required ? true : undefined}
        aria-invalid={invalid ? true : undefined}
        aria-disabled={disabled ? true : undefined}
        aria-describedby={ariaDescribedBy}
        className={selectClasses}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children}
      </select>
    </div>
  );
});

export { Select };
export default Select;
