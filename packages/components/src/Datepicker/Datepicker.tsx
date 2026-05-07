import React, { forwardRef, useState, useCallback, useRef, useEffect } from 'react';
import './Datepicker.css';

/* ─── Types ───────────────────────────────────────────────────────────────────── */

export type DatepickerSize = 'compact' | 'default' | 'large';

export interface DatepickerProps {
  /** The currently selected date. */
  value?: Date | null;
  /** Callback fired when a date is selected or cleared. */
  onChange?: (date: Date | null) => void;
  /** The earliest selectable date. */
  minDate?: Date;
  /** The latest selectable date. */
  maxDate?: Date;
  /** Placeholder text shown when no date is selected. */
  placeholder?: string;
  /** Disables the datepicker input and prevents opening the calendar. */
  disabled?: boolean;
  /** Controls the input height, padding, and font size. Defaults to 'default'. */
  size?: DatepickerSize;
  /** Date format string used to display the selected date. Defaults to 'MM/DD/YYYY'. */
  formatString?: string;
  /** Additional CSS class names applied to the root wrapper element. */
  className?: string;
}

/* ─── Helpers ────────────────────────────────────────────────────────────────── */

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

function formatDate(date: Date, formatStr: string): string {
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const yyyy = String(date.getFullYear());
  return formatStr.replace('MM', mm).replace('DD', dd).replace('YYYY', yyyy);
}

function isDateDisabled(date: Date, minDate?: Date, maxDate?: Date): boolean {
  if (minDate && date < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) {
    return true;
  }
  if (maxDate && date > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())) {
    return true;
  }
  return false;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * Datepicker
 *
 * A date selection input that displays a calendar grid popover on focus or
 * click. Supports min/max date constraints, multiple sizes, and custom date
 * formatting.
 *
 * @example
 * <Datepicker
 *   aria-label="Start date"
 *   value={startDate}
 *   onChange={setStartDate}
 *   minDate={new Date()}
 * />
 */
const Datepicker = forwardRef<HTMLDivElement, DatepickerProps>(function Datepicker(
  {
    value = null,
    onChange,
    minDate,
    maxDate,
    placeholder = 'Select date',
    disabled = false,
    size = 'default',
    formatString = 'MM/DD/YYYY',
    className,
    ...rest
  },
  ref
) {
  const [open, setOpen] = useState(false);
  const today = new Date();
  const viewDate = value ?? today;
  const [viewMonth, setViewMonth] = useState(viewDate.getMonth());
  const [viewYear, setViewYear] = useState(viewDate.getFullYear());
  const wrapperRef = useRef<HTMLDivElement>(null);

  const wrapperClasses = [
    'arch-datepicker',
    `arch-datepicker--${size}`,
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

  const handleDayClick = useCallback(
    (day: Date) => {
      if (isDateDisabled(day, minDate, maxDate)) return;
      onChange?.(day);
      setOpen(false);
    },
    [onChange, minDate, maxDate]
  );

  const prevMonth = useCallback(() => {
    setViewMonth((m) => {
      if (m === 0) {
        setViewYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
  }, []);

  const nextMonth = useCallback(() => {
    setViewMonth((m) => {
      if (m === 11) {
        setViewYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
  }, []);

  /* Build day cells */
  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
  const prevMonthDays = getDaysInMonth(viewYear, viewMonth - 1);
  const dayCells: React.ReactNode[] = [];

  /* Leading days from previous month */
  for (let i = firstDay - 1; i >= 0; i--) {
    const day = new Date(viewYear, viewMonth - 1, prevMonthDays - i);
    dayCells.push(
      <button
        key={`prev-${i}`}
        type="button"
        className="arch-datepicker__day arch-datepicker__day--outside"
        disabled={isDateDisabled(day, minDate, maxDate)}
        onClick={() => handleDayClick(day)}
        tabIndex={-1}
      >
        {prevMonthDays - i}
      </button>
    );
  }

  /* Current month days */
  for (let d = 1; d <= daysInMonth; d++) {
    const day = new Date(viewYear, viewMonth, d);
    const selected = value ? isSameDay(day, value) : false;
    const todayClass = isToday(day) ? 'arch-datepicker__day--today' : '';
    const selectedClass = selected ? 'arch-datepicker__day--selected' : '';
    dayCells.push(
      <button
        key={d}
        type="button"
        className={['arch-datepicker__day', todayClass, selectedClass].filter(Boolean).join(' ')}
        disabled={isDateDisabled(day, minDate, maxDate)}
        onClick={() => handleDayClick(day)}
        aria-selected={selected}
        aria-current={isToday(day) ? 'date' : undefined}
        tabIndex={0}
      >
        {d}
      </button>
    );
  }

  /* Trailing days from next month */
  const remaining = 42 - dayCells.length;
  for (let i = 1; i <= remaining; i++) {
    const day = new Date(viewYear, viewMonth + 1, i);
    dayCells.push(
      <button
        key={`next-${i}`}
        type="button"
        className="arch-datepicker__day arch-datepicker__day--outside"
        disabled={isDateDisabled(day, minDate, maxDate)}
        onClick={() => handleDayClick(day)}
        tabIndex={-1}
      >
        {i}
      </button>
    );
  }

  return (
    <div ref={wrapperRef} className={wrapperClasses} onKeyDown={handleKeyDown}>
      <input
        ref={ref as React.Ref<HTMLInputElement>}
        type="text"
        readOnly
        className="arch-datepicker__input"
        value={value ? formatDate(value, formatString) : ''}
        placeholder={placeholder}
        disabled={disabled}
        onClick={handleToggle}
        aria-haspopup="dialog"
        aria-expanded={open}
        {...rest}
      />
      {open && (
        <div className="arch-datepicker__popover" role="dialog" aria-label="Calendar">
          <div className="arch-datepicker__header">
            <button
              type="button"
              className="arch-datepicker__nav-btn"
              onClick={prevMonth}
              aria-label="Previous month"
            >
              &#8249;
            </button>
            <span className="arch-datepicker__header-label">
              {MONTH_NAMES[viewMonth]} {viewYear}
            </span>
            <button
              type="button"
              className="arch-datepicker__nav-btn"
              onClick={nextMonth}
              aria-label="Next month"
            >
              &#8250;
            </button>
          </div>
          <div className="arch-datepicker__weekdays" role="row">
            {WEEKDAYS.map((wd) => (
              <span key={wd} className="arch-datepicker__weekday" role="columnheader">
                {wd}
              </span>
            ))}
          </div>
          <div className="arch-datepicker__grid" role="grid" aria-label="Calendar days">
            {dayCells}
          </div>
        </div>
      )}
    </div>
  );
});

export { Datepicker };
export default Datepicker;
