import React, { forwardRef, useId, useEffect, useRef } from 'react';
import './CheckboxV2.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export interface CheckboxV2Props {
  /** Whether the checkbox is checked. */
  checked?: boolean;
  /** Called with the new checked state when toggled. */
  onChange?: (checked: boolean) => void;
  /** Primary label text rendered next to the checkbox. */
  label: string;
  /** Secondary description text rendered below the label. */
  description?: string;
  /** Disables the checkbox. */
  disabled?: boolean;
  /** Whether the checkbox is in an indeterminate state. Sets aria-checked="mixed". */
  indeterminate?: boolean;
  /** Shows error styling. Border changes to color-border-danger. */
  error?: boolean;
  /** Additional CSS class names for the wrapper. */
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * CheckboxV2
 *
 * An enhanced checkbox with built-in label and description text support.
 * Renders a real `<input type="checkbox">` for accessibility, with a custom
 * CSS visual overlay. Supports checked, indeterminate, disabled, and error states.
 *
 * @example
 * <CheckboxV2
 *   checked={isChecked}
 *   onChange={setChecked}
 *   label="Accept terms"
 *   description="By checking this you agree to our terms of service."
 * />
 */
const CheckboxV2 = forwardRef<HTMLInputElement, CheckboxV2Props>(function CheckboxV2(
  {
    checked = false,
    onChange,
    label,
    description,
    disabled = false,
    indeterminate = false,
    error = false,
    className,
  },
  ref
) {
  const generatedId = useId();
  const inputId = `arch-checkbox-v2-${generatedId}`;
  const descriptionId = description ? `arch-checkbox-v2-desc-${generatedId}` : undefined;

  /* Apply indeterminate DOM property — cannot be done via HTML attribute */
  const internalRef = useRef<HTMLInputElement>(null);
  const resolvedRef = (ref as React.RefObject<HTMLInputElement>) ?? internalRef;

  useEffect(() => {
    if (resolvedRef && 'current' in resolvedRef && resolvedRef.current) {
      resolvedRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate, resolvedRef]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  const wrapperClasses = [
    'arch-checkbox-v2',
    checked && !indeterminate && 'arch-checkbox-v2--checked',
    indeterminate && 'arch-checkbox-v2--indeterminate',
    disabled && 'arch-checkbox-v2--disabled',
    error && 'arch-checkbox-v2--error',
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
        className="arch-checkbox-v2__input"
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        aria-checked={indeterminate ? 'mixed' : checked}
        aria-invalid={error || undefined}
        aria-describedby={descriptionId}
      />
      <span className="arch-checkbox-v2__box" aria-hidden="true" />
      <span className="arch-checkbox-v2__content">
        <span className="arch-checkbox-v2__label">{label}</span>
        {description && (
          <span id={descriptionId} className="arch-checkbox-v2__description">
            {description}
          </span>
        )}
      </span>
    </label>
  );
});

export { CheckboxV2 };
export default CheckboxV2;
