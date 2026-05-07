import React, { forwardRef } from 'react';
import './AspectRatioBox.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export interface AspectRatioBoxProps {
  /**
   * The width-to-height ratio. For example, 16/9 for widescreen, 1 for square.
   * Defaults to 1.
   */
  aspectRatio?: number;
  /** Content rendered inside the aspect ratio container. */
  children?: React.ReactNode;
  /** Additional CSS class names. */
  className?: string;
}

/* ─── AspectRatioBox ─────────────────────────────────────────────────────────── */

/**
 * AspectRatioBox
 *
 * A container that maintains a fixed aspect ratio regardless of its content.
 *
 * @example
 * <AspectRatioBox aspectRatio={16 / 9}>
 *   <img src="hero.jpg" alt="Hero" />
 * </AspectRatioBox>
 *
 * @example
 * <AspectRatioBox aspectRatio={1}>
 *   <div>Square content</div>
 * </AspectRatioBox>
 */
const AspectRatioBox = forwardRef<HTMLDivElement, AspectRatioBoxProps>(
  function AspectRatioBox({ aspectRatio = 1, children, className }, ref) {
    const classes = ['arch-aspect-ratio-box', className]
      .filter(Boolean)
      .join(' ');

    const style = {
      '--arch-aspect-ratio': String(aspectRatio),
    } as React.CSSProperties;

    return (
      <div ref={ref} className={classes} style={style}>
        <div className="arch-aspect-ratio-box__inner">{children}</div>
      </div>
    );
  },
);

AspectRatioBox.displayName = 'AspectRatioBox';

export { AspectRatioBox };
export default AspectRatioBox;
