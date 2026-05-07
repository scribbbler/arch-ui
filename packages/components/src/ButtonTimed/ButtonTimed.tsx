import React, { forwardRef, useState, useEffect, useRef, useCallback } from 'react';
import './ButtonTimed.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export type ButtonTimedKind =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'dangerPrimary'
  | 'dangerSecondary'
  | 'dangerTertiary';

export type ButtonTimedSize = 'mini' | 'compact' | 'default' | 'large';

export interface ButtonTimedProps {
  /** Countdown duration in seconds. */
  initialTime: number;
  /** Called when the countdown reaches zero. */
  onTimeout: () => void;
  /** Visual style. Defaults to 'primary'. */
  kind?: ButtonTimedKind;
  /** Size. Defaults to 'default'. */
  size?: ButtonTimedSize;
  /** Disables the button and pauses the countdown. */
  disabled?: boolean;
  /** Additional class names. */
  className?: string;
  /** Button label content. Countdown is appended. */
  children?: React.ReactNode;
  /** Click handler. */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

/* ─── Kind → CSS class mapping ───────────────────────────────────────────────── */

const kindClassMap: Record<ButtonTimedKind, string> = {
  primary: 'arch-button-timed--primary',
  secondary: 'arch-button-timed--secondary',
  tertiary: 'arch-button-timed--tertiary',
  dangerPrimary: 'arch-button-timed--danger-primary',
  dangerSecondary: 'arch-button-timed--danger-secondary',
  dangerTertiary: 'arch-button-timed--danger-tertiary',
};

const sizeClassMap: Record<ButtonTimedSize, string> = {
  mini: 'arch-button-timed--mini',
  compact: 'arch-button-timed--compact',
  default: 'arch-button-timed--default',
  large: 'arch-button-timed--large',
};

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * ButtonTimed
 *
 * A button with a built-in countdown timer. Displays the remaining seconds
 * alongside the children label and auto-triggers onTimeout when the timer
 * reaches zero.
 *
 * @example
 * <ButtonTimed initialTime={5} onTimeout={handleUndo} onClick={handleCancel}>
 *   Undo
 * </ButtonTimed>
 * // Renders: "Undo (5s)" → "Undo (4s)" → ... → triggers onTimeout
 */
const ButtonTimed = forwardRef<HTMLButtonElement, ButtonTimedProps>(function ButtonTimed(
  {
    initialTime,
    onTimeout,
    kind = 'primary',
    size = 'default',
    disabled = false,
    className,
    children,
    onClick,
  },
  ref
) {
  const [remaining, setRemaining] = useState(initialTime);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onTimeoutRef = useRef(onTimeout);

  /* Keep callback ref fresh without restarting timer */
  useEffect(() => {
    onTimeoutRef.current = onTimeout;
  }, [onTimeout]);

  const clearTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  /* Start / stop the countdown */
  useEffect(() => {
    if (disabled) {
      clearTimer();
      return;
    }

    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearTimer();
          onTimeoutRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return clearTimer;
  }, [disabled, clearTimer]);

  const classes = [
    'arch-button-timed',
    kindClassMap[kind],
    sizeClassMap[size],
    disabled && 'arch-button-timed--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      ref={ref}
      type="button"
      className={classes}
      disabled={disabled}
      onClick={onClick}
    >
      <span className="arch-button-timed__label">{children}</span>
      <span className="arch-button-timed__timer" aria-live="polite">
        ({remaining}s)
      </span>
    </button>
  );
});

export { ButtonTimed };
export default ButtonTimed;
