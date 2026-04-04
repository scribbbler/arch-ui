import React, { forwardRef } from 'react';
import { IconButton } from '../IconButton';
import { DEFAULT_LABELS, type AlertLabels } from './Alert.labels';
import './Alert.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

export interface AlertProps {
  /** Semantic variant controlling color and default icon. Defaults to 'info'. */
  variant?: AlertVariant;
  /** Bold heading text for the alert. */
  title?: string;
  /** Body content of the alert. */
  description?: React.ReactNode;
  /** Callback to dismiss the alert. When provided, a close button is rendered (unless closeable is false). */
  onClose?: () => void;
  /**
   * Whether the close button is visible. Defaults to true when onClose is provided.
   * Set to false to hide the close button even when onClose is provided.
   */
  closeable?: boolean;
  /**
   * Override the default variant icon. Pass null to suppress the icon entirely.
   * When undefined, the default icon for the variant is used.
   */
  icon?: React.ReactNode;
  /** Override default labels for internationalisation. */
  labels?: Partial<AlertLabels>;
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

function DangerIcon() {
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

const defaultIcons: Record<AlertVariant, React.ReactNode> = {
  info: <InfoIcon />,
  success: <SuccessIcon />,
  warning: <WarningIcon />,
  danger: <DangerIcon />,
};

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * Alert
 *
 * An inline feedback message for communicating status or important context.
 * Uses role="alert" for danger/warning (assertive) and role="status" for
 * success/info (polite).
 *
 * @example
 * <Alert variant="success" title="Saved" description="Your changes have been saved." />
 * <Alert variant="danger" title="Error" description="Something went wrong." onClose={() => setOpen(false)} />
 */
const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { variant = 'info', title, description, onClose, closeable, icon, labels, className },
  ref
) {
  const showClose = onClose != null && closeable !== false;
  const mergedLabels = { ...DEFAULT_LABELS, ...labels };
  const role =
    variant === 'danger' || variant === 'warning' ? 'alert' : 'status';

  const resolvedIcon =
    icon === undefined ? defaultIcons[variant] : icon;

  const classes = [
    'arch-alert',
    `arch-alert--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={ref} role={role} className={classes}>
      {resolvedIcon !== null && (
        <span className="arch-alert__icon" aria-hidden="true">
          {resolvedIcon}
        </span>
      )}
      <span className="arch-alert__body">
        {title && (
          <strong className="arch-alert__title">{title}</strong>
        )}
        {description && (
          <span className="arch-alert__description">{description}</span>
        )}
      </span>
      {showClose && (
        <IconButton
          variant="ghost"
          size="sm"
          className="arch-alert__close"
          aria-label={mergedLabels.dismiss}
          onClick={onClose}
          icon={<CloseIcon />}
        />
      )}
    </div>
  );
});

export { Alert };
export type { AlertLabels } from './Alert.labels';
export { DEFAULT_LABELS as DEFAULT_ALERT_LABELS } from './Alert.labels';
export default Alert;
