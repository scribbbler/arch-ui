import React, { forwardRef, useCallback, useMemo } from 'react';
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
  },
  ref
) {
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

  const wrapperClasses = [
    'arch-payment-card',
    `arch-payment-card--${sizeClass}`,
    error ? 'arch-payment-card--error' : '',
    positive && !error ? 'arch-payment-card--positive' : '',
    disabled ? 'arch-payment-card--disabled' : '',
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
    </div>
  );
});

export { PaymentCard };
export default PaymentCard;
