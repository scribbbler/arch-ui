import React, { forwardRef, useEffect, useId } from 'react';
import { Portal } from '../Portal';
import { Overlay } from '../Overlay';
import { FocusTrap } from '../FocusTrap';
import './Modal.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalProps {
  /** Controls modal visibility. */
  isOpen: boolean;
  /** Called when the modal should close. */
  onClose: () => void;
  /** Controls the max-width of the modal panel. Defaults to 'md'. */
  size?: ModalSize;
  /** When true, clicking the backdrop closes the modal. Defaults to true. */
  closeOnOverlayClick?: boolean;
  /** When true, pressing Escape closes the modal. Defaults to true. */
  closeOnEscape?: boolean;
  /** Modal content — typically ModalHeader, ModalBody, ModalFooter. */
  children?: React.ReactNode;
}

export interface ModalHeaderProps {
  /** Title content. */
  children: React.ReactNode;
  /** Handler for the close button. */
  onClose?: () => void;
}

export interface ModalBodyProps {
  /** Body content. */
  children?: React.ReactNode;
  /** Additional class names. */
  className?: string;
}

export interface ModalFooterProps {
  /** Footer content — usually action buttons. */
  children?: React.ReactNode;
  /** Additional class names. */
  className?: string;
}

/* ─── Context ────────────────────────────────────────────────────────────────── */

interface ModalContextValue {
  titleId: string;
}

const ModalContext = React.createContext<ModalContextValue | null>(null);

/* ─── Sub-components ─────────────────────────────────────────────────────────── */

/**
 * ModalHeader — renders the modal title and an optional close button.
 */
const ModalHeader = forwardRef<HTMLElement, ModalHeaderProps>(function ModalHeader(
  { children, onClose },
  ref
) {
  const ctx = React.useContext(ModalContext);

  return (
    <header ref={ref} className="arch-modal__header">
      <h2 id={ctx ? ctx.titleId : undefined} className="arch-modal__title">
        {children}
      </h2>
      {onClose && (
        <button
          type="button"
          className="arch-modal__close"
          aria-label="Close"
          onClick={onClose}
        >
          {/* Simple × glyph — no external icon dependency */}
          <span aria-hidden="true">&#x2715;</span>
        </button>
      )}
    </header>
  );
});

/**
 * ModalBody — scrollable body area.
 */
const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(function ModalBody(
  { children, className },
  ref
) {
  const classes = ['arch-modal__body', className].filter(Boolean).join(' ');
  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  );
});

/**
 * ModalFooter — footer area, typically containing action buttons.
 */
const ModalFooter = forwardRef<HTMLElement, ModalFooterProps>(function ModalFooter(
  { children, className },
  ref
) {
  const classes = ['arch-modal__footer', className].filter(Boolean).join(' ');
  return (
    <footer ref={ref} className={classes}>
      {children}
    </footer>
  );
});

/* ─── Modal ──────────────────────────────────────────────────────────────────── */

/**
 * Modal
 *
 * A full-overlay dialog with scroll lock, focus management, and configurable
 * size. Composed from Portal, Overlay, and FocusTrap.
 *
 * @example
 * <Modal isOpen={isOpen} onClose={onClose} size="md">
 *   <ModalHeader onClose={onClose}>Edit profile</ModalHeader>
 *   <ModalBody>…content…</ModalBody>
 *   <ModalFooter>
 *     <Button onClick={onClose}>Cancel</Button>
 *     <Button variant="primary" onClick={handleSave}>Save</Button>
 *   </ModalFooter>
 * </Modal>
 */
function Modal({
  isOpen,
  onClose,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  children,
}: ModalProps) {
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
    if (!isOpen || !closeOnEscape) return undefined;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeOnEscape, onClose]);

  if (!isOpen) return null;

  const panelClasses = [
    'arch-modal',
    `arch-modal--${size}`,
  ].join(' ');

  return (
    <Portal>
      <Overlay onClick={closeOnOverlayClick ? onClose : undefined} />
      <div className="arch-modal-wrapper">
        <FocusTrap active={isOpen} restoreFocus>
          <ModalContext.Provider value={{ titleId }}>
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className={panelClasses}
            >
              {children}
            </div>
          </ModalContext.Provider>
        </FocusTrap>
      </div>
    </Portal>
  );
}

export { Modal, ModalHeader, ModalBody, ModalFooter, ModalContext };
export default Modal;
