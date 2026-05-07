import React, { forwardRef, useEffect, useId } from 'react';
import { Portal } from '../Portal';
import { Overlay } from '../Overlay';
import { FocusTrap } from '../FocusTrap';
import { Button } from '../Button';
import './Sheet.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export interface SheetProps {
  /** Controls sheet visibility. */
  isOpen: boolean;
  /** Called when the sheet should close. */
  onClose: () => void;
  /** Sheet content. */
  children?: React.ReactNode;
  /** Heading text for the sheet. */
  title?: string;
  /** Additional CSS class names. */
  className?: string;
}

/* ─── Close icon ─────────────────────────────────────────────────────────────── */

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 3L3 11M3 3l8 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * Sheet
 *
 * A bottom sheet overlay that slides up from the bottom of the screen.
 * Ideal for mobile-first interactions such as action menus or filters.
 *
 * @example
 * <Sheet isOpen={isOpen} onClose={onClose} title="Filter options">
 *   <p>Sheet content here</p>
 * </Sheet>
 */
const Sheet = forwardRef<HTMLDivElement, SheetProps>(function Sheet(
  { isOpen, onClose, children, title, className },
  ref
) {
  const titleId = useId();

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

  if (!isOpen) return null;

  const classes = ['arch-sheet', className].filter(Boolean).join(' ');

  return (
    <Portal>
      <Overlay onClick={onClose} />
      <FocusTrap active={isOpen} restoreFocus>
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className={classes}
        >
          <div className="arch-sheet__handle" />
          <header className="arch-sheet__header">
            <h2 id={titleId} className="arch-sheet__title">
              {title}
            </h2>
            <Button
              kind="tertiary"
              size="compact"
              shape="square"
              className="arch-sheet__close"
              aria-label="Close sheet"
              onClick={onClose}
              startEnhancer={<CloseIcon />}
            />
          </header>
          <div className="arch-sheet__body">{children}</div>
        </div>
      </FocusTrap>
    </Portal>
  );
});

export { Sheet };
export default Sheet;
