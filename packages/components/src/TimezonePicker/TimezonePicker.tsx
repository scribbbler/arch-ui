import React, { forwardRef, useState, useCallback, useRef, useEffect, useMemo } from 'react';
import './TimezonePicker.css';

/* ─── Types ───────────────────────────────────────────────────────────────────── */

export type TimezonePickerSize = 'compact' | 'default' | 'large';

export interface TimezonePickerProps {
  /** The currently selected IANA timezone identifier (e.g. 'America/New_York'). */
  value?: string | null;
  /** Callback fired when a timezone is selected. */
  onChange?: (tz: string | null) => void;
  /** Disables the timezone picker input. */
  disabled?: boolean;
  /** Controls the input height, padding, and font size. Defaults to 'default'. */
  size?: TimezonePickerSize;
  /** Additional CSS class names applied to the root wrapper element. */
  className?: string;
}

/* ─── Timezone data ──────────────────────────────────────────────────────────── */

interface TimezoneEntry {
  id: string;
  label: string;
  offset: string;
}

const TIMEZONES: TimezoneEntry[] = [
  { id: 'Pacific/Midway', label: 'Midway Island', offset: 'UTC-11:00' },
  { id: 'Pacific/Honolulu', label: 'Hawaii', offset: 'UTC-10:00' },
  { id: 'America/Anchorage', label: 'Alaska', offset: 'UTC-09:00' },
  { id: 'America/Los_Angeles', label: 'Pacific Time (US)', offset: 'UTC-08:00' },
  { id: 'America/Denver', label: 'Mountain Time (US)', offset: 'UTC-07:00' },
  { id: 'America/Chicago', label: 'Central Time (US)', offset: 'UTC-06:00' },
  { id: 'America/New_York', label: 'Eastern Time (US)', offset: 'UTC-05:00' },
  { id: 'America/Caracas', label: 'Caracas', offset: 'UTC-04:30' },
  { id: 'America/Halifax', label: 'Atlantic Time (Canada)', offset: 'UTC-04:00' },
  { id: 'America/St_Johns', label: 'Newfoundland', offset: 'UTC-03:30' },
  { id: 'America/Sao_Paulo', label: 'Sao Paulo', offset: 'UTC-03:00' },
  { id: 'Atlantic/South_Georgia', label: 'Mid-Atlantic', offset: 'UTC-02:00' },
  { id: 'Atlantic/Azores', label: 'Azores', offset: 'UTC-01:00' },
  { id: 'UTC', label: 'UTC', offset: 'UTC+00:00' },
  { id: 'Europe/London', label: 'London', offset: 'UTC+00:00' },
  { id: 'Europe/Berlin', label: 'Berlin, Frankfurt', offset: 'UTC+01:00' },
  { id: 'Europe/Paris', label: 'Paris, Madrid', offset: 'UTC+01:00' },
  { id: 'Africa/Cairo', label: 'Cairo', offset: 'UTC+02:00' },
  { id: 'Europe/Istanbul', label: 'Istanbul', offset: 'UTC+03:00' },
  { id: 'Europe/Moscow', label: 'Moscow', offset: 'UTC+03:00' },
  { id: 'Asia/Dubai', label: 'Dubai', offset: 'UTC+04:00' },
  { id: 'Asia/Kolkata', label: 'Mumbai, Kolkata', offset: 'UTC+05:30' },
  { id: 'Asia/Kathmandu', label: 'Kathmandu', offset: 'UTC+05:45' },
  { id: 'Asia/Dhaka', label: 'Dhaka', offset: 'UTC+06:00' },
  { id: 'Asia/Bangkok', label: 'Bangkok, Jakarta', offset: 'UTC+07:00' },
  { id: 'Asia/Shanghai', label: 'Beijing, Shanghai', offset: 'UTC+08:00' },
  { id: 'Asia/Singapore', label: 'Singapore', offset: 'UTC+08:00' },
  { id: 'Asia/Tokyo', label: 'Tokyo', offset: 'UTC+09:00' },
  { id: 'Australia/Sydney', label: 'Sydney', offset: 'UTC+10:00' },
  { id: 'Pacific/Noumea', label: 'Noumea', offset: 'UTC+11:00' },
  { id: 'Pacific/Auckland', label: 'Auckland', offset: 'UTC+12:00' },
];

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * TimezonePicker
 *
 * A searchable timezone selection dropdown. Renders a filterable list of IANA
 * timezone options with UTC offset display.
 *
 * @example
 * <TimezonePicker
 *   aria-label="Timezone"
 *   value={tz}
 *   onChange={setTz}
 * />
 */
const TimezonePicker = forwardRef<HTMLDivElement, TimezonePickerProps>(function TimezonePicker(
  {
    value = null,
    onChange,
    disabled = false,
    size = 'default',
    className,
    ...rest
  },
  ref
) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedEntry = useMemo(
    () => TIMEZONES.find((tz) => tz.id === value) ?? null,
    [value]
  );

  const filteredTimezones = useMemo(() => {
    if (!search.trim()) return TIMEZONES;
    const query = search.toLowerCase();
    return TIMEZONES.filter(
      (tz) =>
        tz.label.toLowerCase().includes(query) ||
        tz.id.toLowerCase().includes(query) ||
        tz.offset.toLowerCase().includes(query)
    );
  }, [search]);

  const wrapperClasses = [
    'arch-timezone-picker',
    `arch-timezone-picker--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  /* Close on outside click */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch('');
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const handleFocus = useCallback(() => {
    if (!disabled) {
      setOpen(true);
    }
  }, [disabled]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        setSearch('');
      }
    },
    []
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      if (!open) setOpen(true);
    },
    [open]
  );

  const handleSelect = useCallback(
    (tzId: string) => {
      onChange?.(tzId);
      setOpen(false);
      setSearch('');
    },
    [onChange]
  );

  return (
    <div ref={wrapperRef} className={wrapperClasses} onKeyDown={handleKeyDown}>
      <input
        ref={ref as React.Ref<HTMLInputElement>}
        type="text"
        className="arch-timezone-picker__input"
        value={open ? search : selectedEntry ? `${selectedEntry.label} (${selectedEntry.offset})` : ''}
        placeholder={selectedEntry ? `${selectedEntry.label} (${selectedEntry.offset})` : 'Search timezone...'}
        disabled={disabled}
        onFocus={handleFocus}
        onChange={handleChange}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-autocomplete="list"
        role="combobox"
        {...rest}
      />
      {open && (
        <div className="arch-timezone-picker__dropdown" role="listbox" aria-label="Timezone options">
          {filteredTimezones.length === 0 ? (
            <div className="arch-timezone-picker__empty">No timezones found</div>
          ) : (
            filteredTimezones.map((tz) => {
              const selected = tz.id === value;
              return (
                <button
                  key={tz.id}
                  type="button"
                  role="option"
                  className={[
                    'arch-timezone-picker__option',
                    selected ? 'arch-timezone-picker__option--selected' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  aria-selected={selected}
                  onClick={() => handleSelect(tz.id)}
                >
                  <span>{tz.label}</span>
                  <span className="arch-timezone-picker__offset">{tz.offset}</span>
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
});

export { TimezonePicker };
export default TimezonePicker;
