import React, { forwardRef, useId } from 'react';
import './RadioV2.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export interface RadioV2Props {
  /** Whether the radio is selected. */
  checked?: boolean;
  /** Called with true when the radio is selected. */
  onChange?: (checked: boolean) => void;
  /** Name attribute for the native input. Groups radios with the same name. */
  name?: string;
  /** Value attribute for the native input. */
  value?: string;
  /** Primary label text rendered next to the radio. */
  label: string;
  /** Secondary description text rendered below the label. */
  description?: string;
  /** Disables the radio. */
  disabled?: boolean;
  /** Shows error styling. Border changes to color-border-danger. */
  error?: boolean;
  /** Additional CSS class names for the wrapper. */
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * RadioV2
 *
 * An enhanced radio button with built-in label and description text support.
 * Renders a real `<input type="radio">` for accessibility, with a custom CSS
 * visual circle. Supports checked, disabled, and error states.
 *
 * @example
 * <RadioV2
 *   checked={selected === 'option1'}
 *   onChange={() => setSelected('option1')}
 *   name="options"
 *   value="option1"
 *   label="Option 1"
 *   description="This is the first option with a description."
 * />
 */
const RadioV2 = forwardRef<HTMLInputElement, RadioV2Props>(function RadioV2(
  {
    checked = false,
    onChange,
    name,
    value,
    label,
    description,
    disabled = false,
    error = false,
    className,
  },
  ref
) {
  const generatedId = useId();
  const inputId = `arch-radio-v2-${generatedId}`;
  const descriptionId = description ? `arch-radio-v2-desc-${generatedId}` : undefined;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange && e.target.checked) {
      onChange(true);
    }
  };

  const wrapperClasses = [
    'arch-radio-v2',
    checked && 'arch-radio-v2--selected',
    disabled && 'arch-radio-v2--disabled',
    error && 'arch-radio-v2--error',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label htmlFor={inputId} className={wrapperClasses}>
      <input
        ref={ref}
        id={inputId}
        type="radio"
        className="arch-radio-v2__input"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        aria-checked={checked}
        aria-invalid={error || undefined}
        aria-describedby={descriptionId}
      />
      <span className="arch-radio-v2__circle" aria-hidden="true" />
      <span className="arch-radio-v2__content">
        <span className="arch-radio-v2__label">{label}</span>
        {description && (
          <span id={descriptionId} className="arch-radio-v2__description">
            {description}
          </span>
        )}
      </span>
    </label>
  );
});

export { RadioV2 };
export default RadioV2;
