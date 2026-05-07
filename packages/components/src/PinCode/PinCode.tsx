import React, { forwardRef, useCallback, useRef } from 'react';
import { Skeleton } from '../Skeleton';
import { Spinner } from '../Spinner';
import './PinCode.css';

/* ─── Types ───────────────────────────────────────────────────────────────────── */

export type PinCodeSize = 'mini' | 'compact' | 'default' | 'large';

export interface PinCodeProps {
  /** Number of digit fields. Defaults to 4. */
  length?: number;
  /** Current value string (e.g. "1234" or "12"). */
  value: string;
  /** Called when the value changes. */
  onChange: (value: string) => void;
  /** Shows error state (red border). */
  error?: boolean;
  /** Disables all inputs. */
  disabled?: boolean;
  /** Size variant controlling input dimensions. Defaults to 'default'. */
  size?: PinCodeSize;
  /** Shows dots instead of digits (for passwords). Defaults to false. */
  mask?: boolean;
  /** Placeholder character for empty inputs. Defaults to '○'. */
  placeholder?: string;
  /** Additional CSS class names applied to the outer wrapper. */
  className?: string;
  /** Shows a Spinner indicating the field is loading. */
  loading?: boolean;
  /** Renders a Skeleton placeholder instead of the component. */
  preloading?: boolean;
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * PinCode
 *
 * Multi-digit code input with auto-advance between fields. Each input accepts
 * a single character. Supports paste distribution, backspace navigation, and
 * masked display for passwords.
 *
 * @example
 * <PinCode value={pin} onChange={setPin} />
 * <PinCode value={pin} onChange={setPin} length={6} mask />
 */
const PinCode = forwardRef<HTMLDivElement, PinCodeProps>(function PinCode(
  {
    length = 4,
    value,
    onChange,
    error = false,
    disabled = false,
    size = 'default',
    mask = false,
    placeholder = '\u25CB',
    className,
    loading = false,
    preloading = false,
  },
  ref
) {
  /* ── Preloading: render skeleton instead of component ──────────────── */
  if (preloading) {
    return <Skeleton width="100%" height="48px" />;
  }
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const setInputRef = useCallback(
    (index: number) => (node: HTMLInputElement | null) => {
      inputRefs.current[index] = node;
    },
    []
  );

  const focusInput = useCallback((index: number) => {
    const input = inputRefs.current[index];
    if (input) {
      input.focus();
      input.select();
    }
  }, []);

  const updateValue = useCallback(
    (newChars: string[]) => {
      onChange(newChars.join(''));
    },
    [onChange]
  );

  const handleChange = useCallback(
    (index: number, char: string) => {
      const chars = value.split('').concat(Array(length).fill('')).slice(0, length);
      chars[index] = char;
      updateValue(chars);

      /* Auto-advance to next input */
      if (char && index < length - 1) {
        focusInput(index + 1);
      }
    },
    [value, length, updateValue, focusInput]
  );

  const handleInputChange = useCallback(
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      /* Take only the last character entered (handles overwrite) */
      const char = inputValue.slice(-1);
      if (char && !/^\d$/.test(char)) return;
      handleChange(index, char);
    },
    [handleChange]
  );

  const handleKeyDown = useCallback(
    (index: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace') {
        e.preventDefault();
        const chars = value.split('').concat(Array(length).fill('')).slice(0, length);
        if (chars[index]) {
          /* Clear current field */
          chars[index] = '';
          updateValue(chars);
        } else if (index > 0) {
          /* Move to previous field and clear it */
          chars[index - 1] = '';
          updateValue(chars);
          focusInput(index - 1);
        }
      } else if (e.key === 'ArrowLeft' && index > 0) {
        e.preventDefault();
        focusInput(index - 1);
      } else if (e.key === 'ArrowRight' && index < length - 1) {
        e.preventDefault();
        focusInput(index + 1);
      }
    },
    [value, length, updateValue, focusInput]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
      if (!pastedData) return;

      const chars = value.split('').concat(Array(length).fill('')).slice(0, length);
      for (let i = 0; i < pastedData.length; i++) {
        chars[i] = pastedData[i];
      }
      updateValue(chars);

      /* Focus the next empty input, or the last filled one */
      const nextIndex = Math.min(pastedData.length, length - 1);
      focusInput(nextIndex);
    },
    [value, length, updateValue, focusInput]
  );

  const handleFocus = useCallback(
    (index: number) => () => {
      const input = inputRefs.current[index];
      if (input) {
        input.select();
      }
    },
    []
  );

  const chars = value.split('').concat(Array(length).fill('')).slice(0, length);

  const wrapperClasses = [
    'arch-pincode',
    `arch-pincode--${size}`,
    error ? 'arch-pincode--error' : '',
    loading && 'arch-pincode--loading',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={ref} className={wrapperClasses} role="group" aria-label="Pin code input">
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={setInputRef(index)}
          className="arch-pincode__input"
          type={mask ? 'password' : 'text'}
          inputMode="numeric"
          maxLength={1}
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          value={chars[index]}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-label={`Digit ${index + 1} of ${length}`}
          onChange={handleInputChange(index)}
          onKeyDown={handleKeyDown(index)}
          onPaste={handlePaste}
          onFocus={handleFocus(index)}
        />
      ))}
      {loading && (
        <span className="arch-pincode__trailing-icon" aria-hidden="true">
          <Spinner size="xs" />
        </span>
      )}
    </div>
  );
});

export { PinCode };
export default PinCode;
