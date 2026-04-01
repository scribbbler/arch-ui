import React, { forwardRef } from 'react';
import './Slider.css';

/* ─── Types ───────────────────────────────────────────────────────────────────── */

export interface SliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'value'> {
  /** Current value. Use with onChange for controlled usage. */
  value?: number;
  /** Initial value for uncontrolled usage. */
  defaultValue?: number;
  /** Minimum allowed value. Defaults to 0. */
  min?: number;
  /** Maximum allowed value. Defaults to 100. */
  max?: number;
  /** Increment size for each step. Defaults to 1. */
  step?: number;
  /** Callback fired with the numeric value when the slider changes. */
  onChange?: (value: number) => void;
  /** Disables the slider. */
  disabled?: boolean;
  /** Additional CSS class names applied to the wrapper div. */
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * Slider
 *
 * A range slider built on a native <input type="range">. Track and thumb are
 * styled via vendor-prefixed CSS pseudo-elements. Keyboard arrow key behaviour
 * (step navigation, Home/End for min/max) is provided natively by the browser.
 * aria-valuemin, aria-valuemax, and aria-valuenow are provided natively.
 *
 * @example
 * // Controlled
 * <Slider
 *   aria-label="Volume"
 *   value={volume}
 *   min={0}
 *   max={100}
 *   step={5}
 *   onChange={(v) => setVolume(v)}
 * />
 */
const Slider = forwardRef<HTMLInputElement, SliderProps>(function Slider(
  {
    value,
    defaultValue,
    min = 0,
    max = 100,
    step = 1,
    onChange,
    disabled = false,
    className,
    ...rest
  },
  ref
) {
  const wrapperClasses = ['arch-slider-wrapper', className]
    .filter(Boolean)
    .join(' ');

  const inputClasses = [
    'arch-slider',
    disabled ? 'arch-slider--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (disabled || !onChange) return;
    onChange(Number(e.target.value));
  }

  return (
    <div className={wrapperClasses}>
      <input
        {...rest}
        ref={ref}
        type="range"
        value={value}
        defaultValue={defaultValue}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        aria-disabled={disabled ? true : undefined}
        onChange={handleChange}
        className={inputClasses}
      />
    </div>
  );
});

export { Slider };
export default Slider;
