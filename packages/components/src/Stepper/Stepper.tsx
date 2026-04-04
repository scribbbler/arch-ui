import React, { forwardRef, useCallback } from 'react';
import { Button } from '../Button';
import './Stepper.css';

/* ─── Types ───────────────────────────────────────────────────────────────────── */

export type StepperSize = 'mini' | 'compact' | 'default' | 'large';

export interface StepperProps {
  /** Current numeric value. */
  value: number;
  /** Called when the value changes. */
  onChange: (value: number) => void;
  /** Minimum allowed value. Defaults to 0. */
  min?: number;
  /** Maximum allowed value. Defaults to Infinity. */
  max?: number;
  /** Step increment/decrement amount. Defaults to 1. */
  step?: number;
  /** Size variant controlling height and font size. Defaults to 'default'. */
  size?: StepperSize;
  /** Disables the stepper. */
  disabled?: boolean;
  /** Additional CSS class names applied to the outer wrapper. */
  className?: string;
}

/* ─── Icons ───────────────────────────────────────────────────────────────────── */

const MinusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M3 8a.75.75 0 0 1 .75-.75h8.5a.75.75 0 0 1 0 1.5h-8.5A.75.75 0 0 1 3 8Z" />
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 3a.75.75 0 0 1 .75.75v3.5h3.5a.75.75 0 0 1 0 1.5h-3.5v3.5a.75.75 0 0 1-1.5 0v-3.5h-3.5a.75.75 0 0 1 0-1.5h3.5v-3.5A.75.75 0 0 1 8 3Z" />
  </svg>
);

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * Stepper
 *
 * A numeric input with increment/decrement buttons. Renders a flex row with
 * a minus button, a value display, and a plus button.
 *
 * @example
 * <Stepper value={count} onChange={setCount} min={0} max={10} />
 */
const Stepper = forwardRef<HTMLDivElement, StepperProps>(function Stepper(
  {
    value,
    onChange,
    min = 0,
    max = Infinity,
    step = 1,
    size = 'default',
    disabled = false,
    className,
  },
  ref
) {
  const handleDecrement = useCallback(() => {
    const next = value - step;
    if (next >= min) {
      onChange(next);
    }
  }, [value, step, min, onChange]);

  const handleIncrement = useCallback(() => {
    const next = value + step;
    if (next <= max) {
      onChange(next);
    }
  }, [value, step, max, onChange]);

  const atMin = value <= min;
  const atMax = value >= max;

  const classes = [
    'arch-stepper',
    `arch-stepper--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={ref} className={classes} role="group" aria-label="Stepper">
      <Button
        kind="secondary"
        size={size}
        shape="square"
        disabled={disabled || atMin}
        onClick={handleDecrement}
        aria-label="Decrease value"
        startEnhancer={<MinusIcon />}
        className="arch-stepper__button arch-stepper__button--minus"
      />
      <span
        className="arch-stepper__value"
        aria-live="polite"
        aria-label={`Current value: ${value}`}
      >
        {value}
      </span>
      <Button
        kind="secondary"
        size={size}
        shape="square"
        disabled={disabled || atMax}
        onClick={handleIncrement}
        aria-label="Increase value"
        startEnhancer={<PlusIcon />}
        className="arch-stepper__button arch-stepper__button--plus"
      />
    </div>
  );
});

export { Stepper };
export default Stepper;
