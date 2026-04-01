import React, { forwardRef, useId } from 'react';
import { useRadioGroup } from '../RadioGroup/RadioGroup';
import './Radio.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export interface RadioProps {
  /** The value this radio represents. Compared against RadioGroup's selected value. */
  value: string;
  /** Disables this radio. Also disabled if parent RadioGroup is disabled. */
  disabled?: boolean;
  /** Label content rendered next to the radio circle. */
  children?: React.ReactNode;
  /** Additional CSS class names for the wrapper. */
  className?: string;
  /** id forwarded to the native input. Auto-generated if not provided. */
  id?: string;
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * Radio
 *
 * Renders a real `<input type="radio">` for accessibility, with a custom CSS
 * visual circle. Must be used inside a RadioGroup — reads name, selectedValue,
 * onChange, and disabled via context.
 *
 * @example
 * <RadioGroup legend="Size" name="size" value={size} onChange={setSize}>
 *   <Radio value="sm">Small</Radio>
 *   <Radio value="lg">Large</Radio>
 * </RadioGroup>
 */
const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { value, disabled: disabledProp = false, children, className, id: idProp },
  ref
) {
  const generatedId = useId();
  const inputId = idProp ?? `arch-radio-${generatedId}`;

  const {
    name,
    value: groupValue,
    onChange,
    disabled: groupDisabled,
  } = useRadioGroup();

  const isDisabled = disabledProp || groupDisabled;
  const isSelected = groupValue === value;

  /* ARIA radio group pattern: only selected (or first-in-group) is tabbable.
     We use tabIndex on the native input to achieve this. The parent fieldset
     handles arrow key navigation. tabIndex=0 for selected, -1 for others
     so Tab focuses the group as a whole (one stop). */
  const tabIndex = isSelected ? 0 : -1;

  const wrapperClasses = [
    'arch-radio',
    isSelected && 'arch-radio--selected',
    isDisabled && 'arch-radio--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!isDisabled && e.target.checked) {
      onChange(value);
    }
  }

  return (
    <label htmlFor={inputId} className={wrapperClasses}>
      <input
        ref={ref}
        id={inputId}
        type="radio"
        className="arch-radio__input"
        name={name}
        value={value}
        checked={isSelected}
        disabled={isDisabled}
        onChange={handleChange}
        tabIndex={tabIndex}
        aria-checked={isSelected}
      />
      <span className="arch-radio__circle" aria-hidden="true" />
      {children != null && (
        <span className="arch-radio__label">{children}</span>
      )}
    </label>
  );
});

export { Radio };
export default Radio;
