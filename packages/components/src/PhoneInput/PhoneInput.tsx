import React, { forwardRef, useCallback, useMemo } from 'react';
import { Button } from '../Button';
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
  },
  ref
) {
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

  const wrapperClasses = [
    'arch-phone-input',
    `arch-phone-input--${sizeClass}`,
    error ? 'arch-phone-input--error' : '',
    positive && !error ? 'arch-phone-input--positive' : '',
    disabled ? 'arch-phone-input--disabled' : '',
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
    </div>
  );
});

export { PhoneInput };
export default PhoneInput;
