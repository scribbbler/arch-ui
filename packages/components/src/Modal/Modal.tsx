import React, { forwardRef, useEffect, useId } from 'react';
import { Portal } from '../Portal';
import { Overlay } from '../Overlay';
import { FocusTrap } from '../FocusTrap';
import { Button } from '../Button';
import { DEFAULT_LABELS, type ModalLabels } from './Modal.labels';
import './Modal.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export type ModalRole = 'dialog' | 'alertdialog';

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
  /** ARIA role for the dialog element. Use 'alertdialog' for confirmation dialogs. Defaults to 'dialog'. */
  role?: ModalRole;
  /** When true, the modal animates in and out. Defaults to true. */
  animate?: boolean;
  /** Modal content — typically ModalHeader, ModalBody, ModalFooter. */
  children?: React.ReactNode;
}

export interface ModalHeaderProps {
  /** Title content. */
  children: React.ReactNode;
  /** Handler for the close button. */
  onClose?: () => void;
  /** Override default labels for internationalisation. */
  labels?: Partial<ModalLabels>;
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
  { children, onClose, labels },
  ref
) {
  const ctx = React.useContext(ModalContext);
  const mergedLabels = { ...DEFAULT_LABELS, ...labels };

  return (
    <header ref={ref} className="arch-modal__header">
      <h2 id={ctx ? ctx.titleId : undefined} className="arch-modal__title">
        {children}
      </h2>
      {onClose && (
        <Button
          kind="tertiary"
          size="compact"
          shape="square"
          className="arch-modal__close"
          aria-label={mergedLabels.close}
          onClick={onClose}
          startEnhancer={<span aria-hidden="true">&#x2715;</span>}
        />
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
 *     <Button kind="primary" onClick={handleSave}>Save</Button>
 *   </ModalFooter>
 * </Modal>
 */
function Modal({
  isOpen,
  onClose,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  role = 'dialog',
  animate = true,
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
    animate ? 'arch-modal--animate' : '',
  ].filter(Boolean).join(' ');

  return (
    <Portal>
      <Overlay onClick={closeOnOverlayClick ? onClose : undefined} />
      <div className="arch-modal-wrapper">
        <FocusTrap active={isOpen} restoreFocus>
          <ModalContext.Provider value={{ titleId }}>
            <div
              role={role}
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
export type { ModalLabels } from './Modal.labels';
export { DEFAULT_LABELS as DEFAULT_MODAL_LABELS } from './Modal.labels';
export default Modal;
