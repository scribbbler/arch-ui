import React, { forwardRef } from 'react';
import './Tag.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export type TagVariant = 'neutral' | 'primary' | 'info' | 'success' | 'warning' | 'danger';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Colour palette variant. Defaults to 'neutral'. */
  variant?: TagVariant;
  /**
   * When provided, renders a close button that invokes this callback.
   * The button receives aria-label="Remove {children}".
   */
  onRemove?: () => void;
  /** Optional icon rendered at the inline-start of the label. */
  icon?: React.ReactNode;
  /** Label content. */
  children?: React.ReactNode;
  /** Additional CSS class names. */
  className?: string;
}

/* ─── Close icon ─────────────────────────────────────────────────────────────── */

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M2 2L10 10M10 2L2 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * Tag
 *
 * A removable categorisation label with optional icon support.
 * Provide `onRemove` to render a close button.
 *
 * @example
 * <Tag variant="info">Design</Tag>
 * <Tag variant="success" onRemove={() => removeTag('react')}>React</Tag>
 * <Tag icon={<StarIcon />} onRemove={handleRemove}>Starred</Tag>
 */
const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag(
  {
    variant = 'neutral',
    onRemove,
    icon,
    children,
    className,
    ...rest
  },
  ref
) {
  const classes = [
    'arch-tag',
    `arch-tag--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const removeLabel =
    typeof children === 'string' ? `Remove ${children}` : 'Remove';

  return (
    <span ref={ref} className={classes} {...rest}>
      {icon && (
        <span className="arch-tag__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="arch-tag__label">{children}</span>
      {onRemove && (
        <button
          type="button"
          className="arch-tag__remove"
          aria-label={removeLabel}
          onClick={onRemove}
        >
          <CloseIcon />
        </button>
      )}
    </span>
  );
});

export { Tag };
export default Tag;
