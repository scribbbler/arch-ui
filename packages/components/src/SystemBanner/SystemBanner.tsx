import React, { forwardRef } from 'react';
import { Button } from '../Button';
import './SystemBanner.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export type SystemBannerVariant = 'info' | 'warning' | 'error';

export interface SystemBannerProps {
  /** Semantic variant controlling color and urgency. Defaults to 'info'. */
  variant?: SystemBannerVariant;
  /** Banner message content. */
  children?: React.ReactNode;
  /** Text for an inline action button. */
  actionLabel?: string;
  /** Callback fired when the action button is clicked. */
  onAction?: () => void;
  /** When provided, a dismiss button is rendered. */
  onClose?: () => void;
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
 * SystemBanner
 *
 * A full-width system-level banner at the top of the page for critical system
 * messages, maintenance notices, or service degradation alerts.
 *
 * @example
 * <SystemBanner variant="warning" actionLabel="Learn more" onAction={handleAction} onClose={handleClose}>
 *   Scheduled maintenance on Saturday 10 pm – 2 am UTC.
 * </SystemBanner>
 */
const SystemBanner = forwardRef<HTMLDivElement, SystemBannerProps>(function SystemBanner(
  { variant = 'info', children, actionLabel, onAction, onClose, className },
  ref
) {
  const role =
    variant === 'error' || variant === 'warning' ? 'alert' : 'status';

  const classes = [
    'arch-system-banner',
    `arch-system-banner--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={ref} role={role} className={classes}>
      <span className="arch-system-banner__content">{children}</span>
      {actionLabel && onAction && (
        <Button
          kind="tertiary"
          size="compact"
          className="arch-system-banner__action"
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
      {onClose && (
        <Button
          kind="tertiary"
          size="compact"
          shape="square"
          className="arch-system-banner__close"
          aria-label="Dismiss system banner"
          onClick={onClose}
          startEnhancer={<CloseIcon />}
        />
      )}
    </div>
  );
});

export { SystemBanner };
export default SystemBanner;
