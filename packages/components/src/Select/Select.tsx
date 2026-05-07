import React, { forwardRef } from 'react';
import { useFormControl } from '../FormControl/index';
import { Skeleton } from '../Skeleton';
import { Spinner } from '../Spinner';
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
  /** Shows a green checkmark trailing icon indicating a complete/valid field. */
  complete?: boolean;
  /** Shows a red X trailing icon indicating an incomplete/invalid field. */
  incomplete?: boolean;
  /** Shows a Spinner trailing icon indicating the field is loading. */
  loading?: boolean;
  /** Renders a Skeleton placeholder instead of the component. */
  preloading?: boolean;
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
    complete = false,
    incomplete = false,
    loading = false,
    preloading = false,
    id: idProp,
    'aria-describedby': ariaDescribedByProp,
    'aria-invalid': ariaInvalidProp,
    ...rest
  },
  ref
) {
  /* ── Preloading: render skeleton instead of component ──────────────── */
  if (preloading) {
    return <Skeleton width="100%" height="48px" />;
  }

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

  /* Determine trailing icon: loading > complete > incomplete */
  let trailingIcon: React.ReactNode = null;
  if (loading) {
    trailingIcon = <Spinner size="xs" />;
  } else if (complete) {
    trailingIcon = (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    );
  } else if (incomplete) {
    trailingIcon = (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
      </svg>
    );
  }

  const wrapperClasses = [
    'arch-select-wrapper',
    complete && 'arch-select-wrapper--complete',
    incomplete && 'arch-select-wrapper--incomplete',
    loading && 'arch-select-wrapper--loading',
    className,
  ]
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
      {trailingIcon && (
        <span className="arch-select__trailing-icon" aria-hidden="true">
          {trailingIcon}
        </span>
      )}
    </div>
  );
});

export { Select };
export default Select;
