import React, { forwardRef } from 'react';
import { Button } from '../Button';
import './Notification.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export type NotificationVariant = 'info' | 'success' | 'warning' | 'error';

export interface NotificationProps {
  /** Semantic variant controlling color and default icon. Defaults to 'info'. */
  variant?: NotificationVariant;
  /** Bold heading text for the notification. */
  title?: string;
  /** Body content of the notification. */
  children?: React.ReactNode;
  /** Whether the close button is visible. Defaults to false. */
  closeable?: boolean;
  /** Callback to dismiss the notification. */
  onClose?: () => void;
  /** Additional CSS class names. */
  className?: string;
}

/* ─── Default icons ──────────────────────────────────────────────────────────── */

function InfoIcon() {
  return (
    <svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 7v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="5" r="0.75" fill="currentColor" />
    </svg>
  );
}

function SuccessIcon() {
  return (
    <svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 8.5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 2L14.5 13.5H1.5L8 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 6.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="11" r="0.75" fill="currentColor" />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 6L6 10M6 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" focusable="false" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 3L3 11M3 3l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const defaultIcons: Record<NotificationVariant, React.ReactNode> = {
  info: <InfoIcon />,
  success: <SuccessIcon />,
  warning: <WarningIcon />,
  error: <ErrorIcon />,
};

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * Notification
 *
 * An inline notification with icon, title, message, and optional close button.
 * Uses role="alert" for error/warning (assertive) and role="status" for
 * success/info (polite).
 *
 * @example
 * <Notification variant="success" title="Saved" closeable onClose={() => setVisible(false)}>
 *   Your changes have been saved successfully.
 * </Notification>
 */
const Notification = forwardRef<HTMLDivElement, NotificationProps>(function Notification(
  { variant = 'info', title, children, closeable = false, onClose, className },
  ref
) {
  const showClose = closeable && onClose != null;
  const role =
    variant === 'error' || variant === 'warning' ? 'alert' : 'status';

  const classes = [
    'arch-notification',
    `arch-notification--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={ref} role={role} className={classes}>
      <span className="arch-notification__icon" aria-hidden="true">
        {defaultIcons[variant]}
      </span>
      <div className="arch-notification__body">
        {title && (
          <strong className="arch-notification__title">{title}</strong>
        )}
        {children && (
          <div className="arch-notification__content">{children}</div>
        )}
      </div>
      {showClose && (
        <Button
          kind="tertiary"
          size="compact"
          shape="square"
          className="arch-notification__close"
          aria-label="Dismiss notification"
          onClick={onClose}
          startEnhancer={<CloseIcon />}
        />
      )}
    </div>
  );
});

export { Notification };
export default Notification;
