import React, { forwardRef, useId, useEffect, useRef } from 'react';
import './Checkbox.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export interface CheckboxProps {
  /** Whether the checkbox is checked. */
  checked?: boolean;
  /** Whether the checkbox is in an indeterminate state. Sets aria-checked="mixed". */
  indeterminate?: boolean;
  /** Disables the checkbox. */
  disabled?: boolean;
  /** Shows error styling. Border changes to color-border-danger. */
  isError?: boolean;
  /** Called when the checked state changes. */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Label content rendered next to the checkbox. */
  children?: React.ReactNode;
  /** Position of the label relative to the checkbox. Defaults to 'end'. */
  labelPlacement?: 'end' | 'start';
  /** Additional CSS class names for the wrapper. */
  className?: string;
  /** id forwarded to the native input. Auto-generated if not provided. */
  id?: string;
  /** name attribute forwarded to the native input. */
  name?: string;
  /** value attribute forwarded to the native input. */
  value?: string;
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * Checkbox
 *
 * Renders a real `<input type="checkbox">` for accessibility, with a custom
 * CSS visual overlay. Supports checked, indeterminate, disabled, and error states.
 *
 * @example
 * <Checkbox checked={isChecked} onChange={e => setChecked(e.target.checked)}>
 *   Accept terms
 * </Checkbox>
 */
const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    checked = false,
    indeterminate = false,
    disabled = false,
    isError = false,
    onChange,
    children,
    labelPlacement = 'end',
    className,
    id: idProp,
    name,
    value,
  },
  ref
) {
  const generatedId = useId();
  const inputId = idProp ?? `arch-checkbox-${generatedId}`;

  /* Apply indeterminate DOM property — cannot be done via HTML attribute */
  const internalRef = useRef<HTMLInputElement>(null);
  const resolvedRef = (ref as React.RefObject<HTMLInputElement>) ?? internalRef;

  useEffect(() => {
    if (resolvedRef && 'current' in resolvedRef && resolvedRef.current) {
      resolvedRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate, resolvedRef]);

  const wrapperClasses = [
    'arch-checkbox',
    labelPlacement === 'start' && 'arch-checkbox--label-start',
    checked && !indeterminate && 'arch-checkbox--checked',
    indeterminate && 'arch-checkbox--indeterminate',
    disabled && 'arch-checkbox--disabled',
    isError && 'arch-checkbox--error',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label htmlFor={inputId} className={wrapperClasses}>
      <input
        ref={resolvedRef}
        id={inputId}
        type="checkbox"
        className="arch-checkbox__input"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        name={name}
        value={value}
        aria-checked={indeterminate ? 'mixed' : checked}
        aria-invalid={isError || undefined}
      />
      <span className="arch-checkbox__box" aria-hidden="true" />
      {children != null && (
        <span className="arch-checkbox__label">{children}</span>
      )}
    </label>
  );
});

export { Checkbox };
export default Checkbox;
