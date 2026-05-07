import React, { forwardRef, useEffect, useId } from 'react';
import { Portal } from '../Portal';
import { Overlay } from '../Overlay';
import { FocusTrap } from '../FocusTrap';
import { Button } from '../Button';
import './Dialog.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export type DialogVariant = 'default' | 'danger';

export interface DialogProps {
  /** Controls dialog visibility. */
  isOpen: boolean;
  /** Called when the dialog should close. */
  onClose: () => void;
  /** Called when the confirm button is clicked. */
  onConfirm: () => void;
  /** Heading text for the dialog. */
  title: string;
  /** Body content of the dialog. */
  children?: React.ReactNode;
  /** Label for the confirm action button. Defaults to 'Confirm'. */
  confirmLabel?: string;
  /** Label for the cancel action button. Defaults to 'Cancel'. */
  cancelLabel?: string;
  /** Visual variant. Use 'danger' for destructive confirmations. Defaults to 'default'. */
  variant?: DialogVariant;
  /** Additional CSS class names. */
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * Dialog
 *
 * A lightweight confirmation dialog for simple confirm/cancel actions.
 * Simpler than Modal — use for quick decisions like deletions or confirmations.
 *
 * @example
 * <Dialog isOpen={isOpen} onClose={onClose} onConfirm={handleDelete} title="Delete item?" variant="danger" confirmLabel="Delete">
 *   This action cannot be undone.
 * </Dialog>
 */
const Dialog = forwardRef<HTMLDivElement, DialogProps>(function Dialog(
  {
    isOpen,
    onClose,
    onConfirm,
    title,
    children,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    variant = 'default',
    className,
  },
  ref
) {
  const titleId = useId();
  const bodyId = useId();

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

  const classes = [
    'arch-dialog',
    variant !== 'default' && `arch-dialog--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Portal>
      <Overlay onClick={onClose} />
      <div className="arch-dialog-wrapper">
        <FocusTrap active={isOpen} restoreFocus>
          <div
            ref={ref}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={bodyId}
            className={classes}
          >
            <h2 id={titleId} className="arch-dialog__title">
              {title}
            </h2>
            {children && (
              <div id={bodyId} className="arch-dialog__body">
                {children}
              </div>
            )}
            <footer className="arch-dialog__footer">
              <Button
                kind="tertiary"
                onClick={onClose}
                className="arch-dialog__cancel"
              >
                {cancelLabel}
              </Button>
              <Button
                kind={variant === 'danger' ? 'primary' : 'primary'}
                onClick={onConfirm}
                className={
                  variant === 'danger'
                    ? 'arch-dialog__confirm arch-dialog__confirm--danger'
                    : 'arch-dialog__confirm'
                }
              >
                {confirmLabel}
              </Button>
            </footer>
          </div>
        </FocusTrap>
      </div>
    </Portal>
  );
});

export { Dialog };
export default Dialog;
