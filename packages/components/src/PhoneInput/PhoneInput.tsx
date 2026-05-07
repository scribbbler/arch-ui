import React, { forwardRef, useCallback, useMemo } from 'react';
import { Button } from '../Button';
import { Skeleton } from '../Skeleton';
import { Spinner } from '../Spinner';
import './PhoneInput.css';

/* ─── Types ───────────────────────────────────────────────────────────────────── */

export type PhoneInputSize = 'mini' | 'compact' | 'default' | 'large';

export interface PhoneInputProps {
  /** Phone number value (digits only). */
  value?: string;
  /** Called when the phone number changes. Receives digits only. */
  onChange?: (value: string) => void;
  /** ISO 2-letter country code. Defaults to 'US'. */
  country?: string;
  /** Called when the country code changes. */
  onCountryChange?: (country: string) => void;
  /** Disables the component. */
  disabled?: boolean;
  /** Size variant controlling height, padding, and font size. Defaults to 'default'. */
  size?: PhoneInputSize;
  /** Shows an error (invalid) border style. */
  error?: boolean;
  /** Shows a positive (success/valid) border style. */
  positive?: boolean;
  /** Placeholder text for the phone number input. Defaults to 'Phone number'. */
  placeholder?: string;
  /** Additional CSS class names applied to the outer wrapper div. */
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

/* ─── Country data ────────────────────────────────────────────────────────────── */

export const COUNTRY_DIAL_CODES: Record<string, string> = {
  US: '+1',
  GB: '+44',
  IN: '+91',
  DE: '+49',
  FR: '+33',
  JP: '+81',
  AU: '+61',
  CA: '+1',
  BR: '+55',
  CN: '+86',
};

/* ─── Size map ────────────────────────────────────────────────────────────────── */

const SIZE_MAP: Record<PhoneInputSize, string> = {
  mini: 'mini',
  compact: 'compact',
  default: 'default',
  large: 'large',
};

/* Map PhoneInput sizes to Button sizes */
const BUTTON_SIZE_MAP: Record<PhoneInputSize, 'mini' | 'compact' | 'default' | 'large'> = {
  mini: 'mini',
  compact: 'compact',
  default: 'default',
  large: 'large',
};

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * PhoneInput
 *
 * A phone number input with a country code selector button.
 * The country code button displays the dial code for the selected country.
 *
 * @example
 * <PhoneInput
 *   value="5551234567"
 *   onChange={(v) => setValue(v)}
 *   country="US"
 *   onCountryChange={(c) => setCountry(c)}
 * />
 */
const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(function PhoneInput(
  {
    value = '',
    onChange,
    country = 'US',
    onCountryChange,
    disabled = false,
    size = 'default',
    error = false,
    positive = false,
    placeholder = 'Phone number',
    className,
    complete = false,
    incomplete = false,
    loading = false,
    preloading = false,
  },
  ref
) {
  /* ── Preloading: render skeleton instead of component ──────────────── */
  if (preloading) {
    return <Skeleton width="100%" height="48px" />;
  }
  const dialCode = useMemo(
    () => COUNTRY_DIAL_CODES[country] ?? '+1',
    [country]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      /* Strip non-digit characters so value is always digits only */
      const digits = e.target.value.replace(/\D/g, '');
      onChange?.(digits);
    },
    [onChange]
  );

  const sizeClass = SIZE_MAP[size];

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
    'arch-phone-input',
    `arch-phone-input--${sizeClass}`,
    error ? 'arch-phone-input--error' : '',
    positive && !error ? 'arch-phone-input--positive' : '',
    disabled ? 'arch-phone-input--disabled' : '',
    complete && 'arch-phone-input--complete',
    incomplete && 'arch-phone-input--incomplete',
    loading && 'arch-phone-input--loading',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses} role="group" aria-label="Phone number input">
      <Button
        kind="secondary"
        size={BUTTON_SIZE_MAP[size]}
        disabled={disabled}
        className="arch-phone-input__country-btn"
        type="button"
        aria-label={`Country code ${country} ${dialCode}`}
      >
        {dialCode}
      </Button>
      <input
        ref={ref}
        type="tel"
        inputMode="tel"
        value={value}
        onChange={handleInputChange}
        disabled={disabled}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-disabled={disabled ? true : undefined}
        aria-label="Phone number"
        className={`arch-phone-input__input arch-phone-input__input--${sizeClass}`}
      />
      {trailingIcon && (
        <span className="arch-phone-input__trailing-icon" aria-hidden="true">
          {trailingIcon}
        </span>
      )}
    </div>
  );
});

export { PhoneInput };
export default PhoneInput;
