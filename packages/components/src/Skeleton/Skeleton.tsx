import React, { forwardRef } from 'react';
import './Skeleton.css';

/* ─── Types ───────────────────────────────────────────────────────────────────── */

export type SkeletonVariant = 'text' | 'circular' | 'rectangular';

export interface SkeletonProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Shape of the placeholder. Defaults to 'text'. */
  variant?: SkeletonVariant;
  /** Inline size override. Accepts any CSS value e.g. '100%' or '200px'. */
  width?: string;
  /** Block size override. Accepts any CSS value. For circular variant, matches width when omitted. */
  height?: string;
  /** Whether to show the shimmer animation. Defaults to true. Has no effect when prefers-reduced-motion is set. */
  animated?: boolean;
  /** Additional CSS class names applied to the root element. */
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * Skeleton
 *
 * A decorative placeholder shown while content is loading.
 * Always aria-hidden — pair with aria-busy on the parent container
 * so screen readers know content is pending.
 *
 * @example
 * <Skeleton variant="text" />
 * <Skeleton variant="circular" width="40px" height="40px" />
 * <Skeleton variant="rectangular" width="100%" height="120px" />
 */
const Skeleton = forwardRef<HTMLSpanElement, SkeletonProps>(function Skeleton(
  {
    variant = 'text',
    width,
    height,
    animated = true,
    className,
    style,
    ...rest
  },
  ref
) {
  const classes = [
    'arch-skeleton',
    `arch-skeleton--${variant}`,
    animated ? 'arch-skeleton--animated' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Build inline dimensions — only set when the caller provides explicit values.
  // For circular, if only width is given we mirror it to height to keep it square.
  const resolvedHeight =
    variant === 'circular' && height === undefined && width !== undefined
      ? width
      : height;

  const dimensionStyle: React.CSSProperties = {};
  if (width !== undefined) dimensionStyle.inlineSize = width;
  if (resolvedHeight !== undefined) dimensionStyle.blockSize = resolvedHeight;

  const mergedStyle =
    Object.keys(dimensionStyle).length > 0
      ? { ...dimensionStyle, ...style }
      : style;

  return (
    <span
      {...rest}
      ref={ref}
      aria-hidden="true"
      className={classes}
      style={mergedStyle}
    />
  );
});

export { Skeleton };
export default Skeleton;
