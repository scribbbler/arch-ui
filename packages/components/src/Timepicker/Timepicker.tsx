import React, { forwardRef, useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { Skeleton } from '../Skeleton';
import { Spinner } from '../Spinner';
import './Timepicker.css';

/* ─── Types ───────────────────────────────────────────────────────────────────── */

export type TimepickerSize = 'compact' | 'default' | 'large';
export type TimepickerFormat = '12' | '24';

export interface TimepickerProps {
  /** The currently selected time string (e.g. '09:30' or '09:30 AM'). */
  value?: string | null;
  /** Callback fired when a time is selected. */
  onChange?: (time: string | null) => void;
  /** Step interval in minutes between each time slot. Defaults to 30. */
  step?: number;
  /** Whether to show time in 12-hour or 24-hour format. Defaults to '12'. */
  format?: TimepickerFormat;
  /** Placeholder text shown when no time is selected. */
  placeholder?: string;
  /** Disables the timepicker input. */
  disabled?: boolean;
  /** Controls the input height, padding, and font size. Defaults to 'default'. */
  size?: TimepickerSize;
  /** Additional CSS class names applied to the root wrapper element. */
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

/* ─── Helpers ────────────────────────────────────────────────────────────────── */

function generateTimeSlots(step: number, format: TimepickerFormat): string[] {
  const slots: string[] = [];
  for (let minutes = 0; minutes < 24 * 60; minutes += step) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (format === '24') {
      slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
    } else {
      const period = h < 12 ? 'AM' : 'PM';
      const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
      slots.push(`${String(h12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${period}`);
    }
  }
  return slots;
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * Timepicker
 *
 * A time selection dropdown that renders a scrollable list of time slots.
 * Supports 12-hour and 24-hour formats with configurable step intervals.
 *
 * @example
 * <Timepicker
 *   aria-label="Meeting time"
 *   value={time}
 *   onChange={setTime}
 *   step={15}
 *   format="12"
 * />
 */
const Timepicker = forwardRef<HTMLDivElement, TimepickerProps>(function Timepicker(
  {
    value = null,
    onChange,
    step = 30,
    format = '12',
    placeholder = 'Select time',
    disabled = false,
    size = 'default',
    className,
    complete = false,
    incomplete = false,
    loading = false,
    preloading = false,
    ...rest
  },
  ref
) {
  /* ── Preloading: render skeleton instead of component ──────────────── */
  if (preloading) {
    return <Skeleton width="100%" height="48px" />;
  }
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const timeSlots = useMemo(() => generateTimeSlots(step, format), [step, format]);

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
    'arch-timepicker',
    `arch-timepicker--${size}`,
    complete && 'arch-timepicker--complete',
    incomplete && 'arch-timepicker--incomplete',
    loading && 'arch-timepicker--loading',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  /* Close on outside click */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const handleToggle = useCallback(() => {
    if (!disabled) {
      setOpen((prev) => !prev);
    }
  }, [disabled]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    },
    []
  );

  const handleSelect = useCallback(
    (slot: string) => {
      onChange?.(slot);
      setOpen(false);
    },
    [onChange]
  );

  return (
    <div ref={wrapperRef} className={wrapperClasses} onKeyDown={handleKeyDown}>
      <input
        ref={ref as React.Ref<HTMLInputElement>}
        type="text"
        readOnly
        className="arch-timepicker__input"
        value={value ?? ''}
        placeholder={placeholder}
        disabled={disabled}
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={open}
        {...rest}
      />
      {trailingIcon && (
        <span className="arch-timepicker__trailing-icon" aria-hidden="true">
          {trailingIcon}
        </span>
      )}
      {open && (
        <div className="arch-timepicker__dropdown" role="listbox" aria-label="Time options">
          {timeSlots.map((slot) => {
            const selected = slot === value;
            return (
              <button
                key={slot}
                type="button"
                role="option"
                className={[
                  'arch-timepicker__option',
                  selected ? 'arch-timepicker__option--selected' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                aria-selected={selected}
                onClick={() => handleSelect(slot)}
              >
                {slot}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
});

export { Timepicker };
export default Timepicker;
