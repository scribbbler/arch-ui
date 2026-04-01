import React, { forwardRef } from 'react';
import './Badge.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export type BadgeVariant = 'neutral' | 'info' | 'success' | 'warning' | 'danger';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Colour palette variant. Defaults to 'neutral'. */
  variant?: BadgeVariant;
  /** Size of the badge. Defaults to 'md'. */
  size?: BadgeSize;
  /**
   * When true, renders a small circular dot indicator instead of text.
   * Requires aria-label when no children are provided.
   */
  dot?: boolean;
  /** Label content displayed inside the badge. */
  children?: React.ReactNode;
  /** Additional CSS class names. */
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * Badge
 *
 * An inline label for communicating status, count, or category.
 * Use `dot` for a compact indicator and provide `aria-label` when no
 * visible text is present.
 *
 * @example
 * <Badge variant="success">Active</Badge>
 * <Badge variant="danger" dot aria-label="Error" />
 * <Badge variant="info" size="sm">3</Badge>
 */
const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    variant = 'neutral',
    size = 'md',
    dot = false,
    children,
    className,
    ...rest
  },
  ref
) {
  const classes = [
    'arch-badge',
    `arch-badge--${variant}`,
    `arch-badge--${size}`,
    dot && 'arch-badge--dot',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // When dot=true with no children, aria-label is provided by the caller.
  // A <span> cannot accept aria-label without a role, so we set role="img".
  const hasAriaLabel = Boolean(rest['aria-label']);
  const roleAttr = dot && hasAriaLabel && !children ? 'img' : undefined;

  return (
    <span ref={ref} className={classes} role={roleAttr} {...rest}>
      {dot && (
        <span className="arch-badge__dot" aria-hidden={children ? true : undefined} />
      )}
      {children}
    </span>
  );
});

export { Badge };
export default Badge;
