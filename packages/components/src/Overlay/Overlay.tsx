import React, { forwardRef } from 'react';
import './Overlay.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export interface OverlayProps {
  /**
   * When true, the overlay background is fully transparent.
   * Useful for popovers that need click-outside detection without a visible dimming.
   */
  transparent?: boolean;
  /** Called when the backdrop is clicked. */
  onClick?: () => void;
  /** Additional CSS class names. */
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * Overlay
 *
 * A fixed-position semi-transparent backdrop rendered behind modal dialogs and
 * drawers. Marked `aria-hidden` as it is purely decorative.
 *
 * @example
 * <Overlay onClick={onClose} />
 * <Overlay transparent onClick={onClose} />
 */
const Overlay = forwardRef<HTMLDivElement, OverlayProps>(function Overlay(
  { transparent = false, onClick, className },
  ref
) {
  const classes = [
    'arch-overlay',
    transparent && 'arch-overlay--transparent',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={ref}
      className={classes}
      aria-hidden="true"
      onClick={onClick}
    />
  );
});

export { Overlay };
export default Overlay;
