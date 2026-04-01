import React, { forwardRef } from 'react';
import './Banner.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export type BannerVariant = 'info' | 'success' | 'warning' | 'danger';

export interface BannerProps {
  /** Semantic variant controlling color. Defaults to 'info'. */
  variant?: BannerVariant;
  /** Banner content. Keep brief — one or two sentences. */
  children?: React.ReactNode;
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
 * Banner
 *
 * A full-width top-of-page announcement bar for site-wide or page-level status
 * messages. Uses role="alert" for danger/warning and role="status" for
 * success/info.
 *
 * @example
 * <Banner variant="warning" onClose={() => setVisible(false)}>
 *   Scheduled maintenance on Saturday 10 pm – 2 am UTC.
 * </Banner>
 */
const Banner = forwardRef<HTMLDivElement, BannerProps>(function Banner(
  { variant = 'info', children, onClose, className },
  ref
) {
  const role =
    variant === 'danger' || variant === 'warning' ? 'alert' : 'status';

  const classes = [
    'arch-banner',
    `arch-banner--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={ref} role={role} className={classes}>
      <span className="arch-banner__content">{children}</span>
      {onClose && (
        <button
          type="button"
          className="arch-banner__close"
          aria-label="Dismiss banner"
          onClick={onClose}
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
});

export { Banner };
export default Banner;
