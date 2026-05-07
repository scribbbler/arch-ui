import React, { forwardRef, useCallback } from 'react';
import './Rating.css';

/* ─── Types ───────────────────────────────────────────────────────────────────── */

export type RatingSize = 'sm' | 'md' | 'lg';

export interface RatingProps {
  /** The current rating value. */
  value?: number;
  /** Callback fired when a star is clicked. */
  onChange?: (value: number) => void;
  /** Total number of stars to display. Defaults to 5. */
  count?: number;
  /** When true, displays the rating without interaction. Supports half-star display. */
  readOnly?: boolean;
  /** Controls the size of each star icon. Defaults to 'md'. */
  size?: RatingSize;
  /** Additional CSS class names applied to the root wrapper element. */
  className?: string;
}

/* ─── Star SVG ───────────────────────────────────────────────────────────────── */

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * Rating
 *
 * A star rating input component. Supports interactive selection and read-only
 * display with half-star precision.
 *
 * @example
 * // Interactive
 * <Rating aria-label="Product rating" value={rating} onChange={setRating} />
 *
 * // Read-only with half stars
 * <Rating aria-label="Average rating" value={3.5} readOnly />
 */
const Rating = forwardRef<HTMLDivElement, RatingProps>(function Rating(
  {
    value = 0,
    onChange,
    count = 5,
    readOnly = false,
    size = 'md',
    className,
    ...rest
  },
  ref
) {
  const wrapperClasses = [
    'arch-rating',
    `arch-rating--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = useCallback(
    (starValue: number) => {
      if (!readOnly && onChange) {
        onChange(starValue);
      }
    },
    [readOnly, onChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, starValue: number) => {
      if (readOnly) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        e.preventDefault();
        const next = Math.min(starValue + 1, count);
        onChange?.(next);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        e.preventDefault();
        const prev = Math.max(starValue - 1, 1);
        onChange?.(prev);
      }
    },
    [readOnly, onChange, count]
  );

  const stars: React.ReactNode[] = [];
  for (let i = 1; i <= count; i++) {
    const filled = i <= Math.floor(value);
    const isHalf = !filled && readOnly && i === Math.floor(value) + 1 && value % 1 >= 0.25 && value % 1 < 0.75;
    const isAlmostFull = !filled && readOnly && i === Math.floor(value) + 1 && value % 1 >= 0.75;

    const starClasses = [
      'arch-rating__star',
      filled || isAlmostFull ? 'arch-rating__star--filled' : '',
      isHalf ? 'arch-rating__star--half' : '',
      readOnly ? 'arch-rating__star--readonly' : '',
    ]
      .filter(Boolean)
      .join(' ');

    stars.push(
      <button
        key={i}
        type="button"
        role="radio"
        className={starClasses}
        aria-checked={i === Math.round(value)}
        aria-label={`${i} star${i > 1 ? 's' : ''}`}
        tabIndex={readOnly ? -1 : i === Math.max(1, Math.round(value)) ? 0 : -1}
        onClick={() => handleClick(i)}
        onKeyDown={(e) => handleKeyDown(e, i)}
        disabled={readOnly}
      >
        <StarIcon />
        {isHalf && (
          <span className="arch-rating__star-half-overlay" aria-hidden="true">
            <StarIcon />
          </span>
        )}
      </button>
    );
  }

  return (
    <div
      ref={ref}
      className={wrapperClasses}
      role="radiogroup"
      aria-readonly={readOnly || undefined}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={count}
      {...rest}
    >
      {stars}
    </div>
  );
});

export { Rating };
export default Rating;
