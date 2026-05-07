import React, { forwardRef, useCallback, useMemo } from 'react';
import { Skeleton } from '../Skeleton';
import { Spinner } from '../Spinner';
import './PaymentCard.css';

/* ─── Types ───────────────────────────────────────────────────────────────────── */

export type PaymentCardSize = 'mini' | 'compact' | 'default' | 'large';

export type CardType = 'visa' | 'mastercard' | 'amex' | 'discover' | 'unknown';

export interface PaymentCardProps {
  /** Card number value (digits only). */
  value?: string;
  /** Called when the card number changes. Receives digits only. */
  onChange?: (value: string) => void;
  /** Disables the input. */
  disabled?: boolean;
  /** Size variant controlling height, padding, and font size. Defaults to 'default'. */
  size?: PaymentCardSize;
  /** Shows an error (invalid) border style. */
  error?: boolean;
  /** Shows a positive (success/valid) border style. */
  positive?: boolean;
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

/* ─── Card type detection ─────────────────────────────────────────────────────── */

function detectCardType(digits: string): CardType {
  if (digits.length === 0) return 'unknown';
  const first = digits[0];
  if (first === '4') return 'visa';
  if (first === '5') return 'mastercard';
  if (first === '3') return 'amex';
  if (first === '6') return 'discover';
  return 'unknown';
}

const CARD_TYPE_LABELS: Record<CardType, string> = {
  visa: 'Visa',
  mastercard: 'MC',
  amex: 'Amex',
  discover: 'Disc',
  unknown: '',
};

/* ─── Formatting ──────────────────────────────────────────────────────────────── */

function formatCardNumber(digits: string, cardType: CardType): string {
  if (cardType === 'amex') {
    /* Amex: 4-6-5 grouping */
    const parts: string[] = [];
    if (digits.length > 0) parts.push(digits.slice(0, 4));
    if (digits.length > 4) parts.push(digits.slice(4, 10));
    if (digits.length > 10) parts.push(digits.slice(10, 15));
    return parts.join(' ');
  }
  /* Standard: 4-4-4-4 grouping */
  const parts: string[] = [];
  for (let i = 0; i < digits.length; i += 4) {
    parts.push(digits.slice(i, i + 4));
  }
  return parts.join(' ');
}

/* ─── Size map ────────────────────────────────────────────────────────────────── */

const SIZE_MAP: Record<PaymentCardSize, string> = {
  mini: 'mini',
  compact: 'compact',
  default: 'default',
  large: 'large',
};

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * PaymentCard
 *
 * A credit card number input that auto-formats with spaces and detects the card
 * type from the first digits. Displays a card type indicator at the start.
 *
 * @example
 * <PaymentCard
 *   value="4111111111111111"
 *   onChange={(v) => setValue(v)}
 * />
 */
const PaymentCard = forwardRef<HTMLInputElement, PaymentCardProps>(function PaymentCard(
  {
    value = '',
    onChange,
    disabled = false,
    size = 'default',
    error = false,
    positive = false,
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
  const cardType = useMemo(() => detectCardType(value), [value]);
  const maxDigits = cardType === 'amex' ? 15 : 16;
  const formattedValue = useMemo(() => formatCardNumber(value, cardType), [value, cardType]);
  const cardLabel = CARD_TYPE_LABELS[cardType];

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const digits = e.target.value.replace(/\D/g, '').slice(0, maxDigits);
      onChange?.(digits);
    },
    [onChange, maxDigits]
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
    'arch-payment-card',
    `arch-payment-card--${sizeClass}`,
    error ? 'arch-payment-card--error' : '',
    positive && !error ? 'arch-payment-card--positive' : '',
    disabled ? 'arch-payment-card--disabled' : '',
    complete && 'arch-payment-card--complete',
    incomplete && 'arch-payment-card--incomplete',
    loading && 'arch-payment-card--loading',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  /* Max length: digits + spaces */
  const maxLength = cardType === 'amex' ? 17 : 19;

  return (
    <div className={wrapperClasses}>
      <span
        className="arch-payment-card__indicator"
        aria-hidden="true"
      >
        {cardLabel}
      </span>
      <input
        ref={ref}
        type="text"
        inputMode="numeric"
        autoComplete="cc-number"
        value={formattedValue}
        onChange={handleChange}
        disabled={disabled}
        placeholder="Card number"
        maxLength={maxLength}
        aria-invalid={error ? true : undefined}
        aria-disabled={disabled ? true : undefined}
        aria-label="Credit card number"
        className={`arch-payment-card__input arch-payment-card__input--${sizeClass}`}
      />
      {trailingIcon && (
        <span className="arch-payment-card__trailing-icon" aria-hidden="true">
          {trailingIcon}
        </span>
      )}
    </div>
  );
});

export { PaymentCard };
export default PaymentCard;
