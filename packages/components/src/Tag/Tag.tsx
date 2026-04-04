import React, { forwardRef } from 'react';
import { IconButton } from '../IconButton';
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
  /**
   * Whether the close button is visible when onRemove is provided.
   * Defaults to true when onRemove is provided.
   */
  closeable?: boolean;
  /**
   * When true, makes the tag behave like a toggle chip.
   * The entire tag becomes clickable (via onClick).
   */
  clickable?: boolean;
  /**
   * Whether the tag is currently in a checked/selected state.
   * Only relevant when clickable is true.
   */
  isChecked?: boolean;
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
    closeable,
    clickable = false,
    isChecked,
    icon,
    children,
    className,
    ...rest
  },
  ref
) {
  const showRemove = onRemove != null && closeable !== false;

  const classes = [
    'arch-tag',
    `arch-tag--${variant}`,
    clickable && 'arch-tag--clickable',
    clickable && isChecked && 'arch-tag--checked',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const removeLabel =
    typeof children === 'string' ? `Remove ${children}` : 'Remove';

  return (
    <span
      ref={ref}
      className={classes}
      role={clickable ? 'option' : undefined}
      aria-selected={clickable ? Boolean(isChecked) : undefined}
      tabIndex={clickable ? 0 : undefined}
      {...rest}
    >
      {icon && (
        <span className="arch-tag__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="arch-tag__label">{children}</span>
      {showRemove && (
        <IconButton
          variant="ghost"
          size="sm"
          className="arch-tag__remove"
          aria-label={removeLabel}
          onClick={onRemove}
          icon={<CloseIcon />}
        />
      )}
    </span>
  );
});

export { Tag };
export default Tag;
