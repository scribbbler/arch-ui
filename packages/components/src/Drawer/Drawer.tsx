import React, { forwardRef, useEffect } from 'react';
import { Portal } from '../Portal';
import { Overlay } from '../Overlay';
import { FocusTrap } from '../FocusTrap';
import './Drawer.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export type DrawerPosition = 'start' | 'end' | 'top' | 'bottom';

export interface DrawerProps {
  /** Controls drawer visibility. */
  isOpen: boolean;
  /** Called when the drawer should close. */
  onClose: () => void;
  /**
   * Side from which the drawer slides in.
   * Uses CSS logical properties for RTL support. Defaults to 'end'.
   */
  position?: DrawerPosition;
  /**
   * Inline-size (for start/end) or block-size (for top/bottom) of the drawer.
   * Defaults to '20rem'.
   */
  size?: string;
  /** Drawer content. */
  children?: React.ReactNode;
  /** Accessible label for the drawer dialog. */
  'aria-label'?: string;
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * Drawer
 *
 * A panel that slides in from a configurable side of the screen.
 * Uses Portal, Overlay, and FocusTrap. Manages scroll lock and focus.
 *
 * @example
 * <Drawer isOpen={isOpen} onClose={onClose} position="end" size="24rem">
 *   <div>…drawer content…</div>
 * </Drawer>
 */
const Drawer = forwardRef<HTMLDivElement, DrawerProps>(function Drawer(
  {
    isOpen,
    onClose,
    position = 'end',
    size = '20rem',
    children,
    'aria-label': ariaLabel,
  },
  ref
) {
  /* Body scroll lock. */
  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  /* Escape key handler. */
  useEffect(() => {
    if (!isOpen) return undefined;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  /* Compute the size style depending on position axis. */
  const sizeStyle: React.CSSProperties =
    position === 'start' || position === 'end'
      ? { inlineSize: size }
      : { blockSize: size };

  const panelClasses = [
    'arch-drawer',
    `arch-drawer--${position}`,
    isOpen ? 'arch-drawer--open' : 'arch-drawer--closed',
  ].join(' ');

  if (!isOpen) return null;

  return (
    <Portal>
      <Overlay onClick={onClose} />
      <FocusTrap active={isOpen} restoreFocus>
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
          className={panelClasses}
          style={sizeStyle}
        >
          {children}
        </div>
      </FocusTrap>
    </Portal>
  );
});

export { Drawer };
export default Drawer;
