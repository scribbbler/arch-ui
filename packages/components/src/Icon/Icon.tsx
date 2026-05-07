import React, { forwardRef } from 'react';
import './Icon.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface IconProps {
  /** Controls the rendered size of the icon. Defaults to 'md'. */
  size?: IconSize;
  /**
   * CSS custom property name (without '--') for the icon colour.
   * Must be a valid colour token.
   */
  color?: string;
  /** Accessible label. When provided, the icon is announced by screen readers. */
  title?: string;
  /** The SVG element to render inside the icon wrapper. */
  children?: React.ReactNode;
  /** Additional CSS class names. */
  className?: string;
}

/* ─── Icon ───────────────────────────────────────────────────────────────────── */

/**
 * Icon
 *
 * A generic icon wrapper that sizes and colors SVG icons consistently.
 *
 * @example
 * <Icon size="md" color="color-text-default" title="Search">
 *   <svg>...</svg>
 * </Icon>
 *
 * @example
 * // Decorative icon (hidden from assistive technology)
 * <Icon size="sm">
 *   <svg>...</svg>
 * </Icon>
 */
const Icon = forwardRef<HTMLSpanElement, IconProps>(
  function Icon({ size = 'md', color, title, children, className }, ref) {
    const classes = [
      'arch-icon',
      `arch-icon--${size}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const style = color
      ? ({ '--arch-icon-color': `var(--${color})` } as React.CSSProperties)
      : undefined;

    const isDecorative = !title;

    return (
      <span
        ref={ref}
        className={classes}
        style={style}
        role={isDecorative ? 'presentation' : 'img'}
        aria-label={title}
        aria-hidden={isDecorative ? true : undefined}
      >
        {children}
      </span>
    );
  },
);

Icon.displayName = 'Icon';

export { Icon };
export default Icon;
