import React, { forwardRef, useState } from 'react';
import './Avatar.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type AvatarShape = 'circle' | 'square';

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** URL of the avatar image. Falls back to initials when absent or on error. */
  src?: string;
  /** Full name of the person. Drives alt text and initials. */
  name: string;
  /** Rendered size. Defaults to 'md'. */
  size?: AvatarSize;
  /** Shape of the avatar. Defaults to 'circle'. */
  shape?: AvatarShape;
  /** Additional CSS class names. */
  className?: string;
}

/* ─── Helpers ────────────────────────────────────────────────────────────────── */

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  const first = words[0]?.[0] ?? '';
  const second = words[1]?.[0] ?? '';
  return (first + second).toUpperCase();
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * Avatar
 *
 * Displays a user's profile image with a graceful initials fallback.
 * Always provide `name` — it powers the alt text and the initials fallback.
 *
 * @example
 * <Avatar src="/images/jane.jpg" name="Jane Doe" size="md" />
 * <Avatar name="John Smith" size="lg" shape="square" />
 */
const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  {
    src,
    name,
    size = 'md',
    shape = 'circle',
    className,
    ...rest
  },
  ref
) {
  const [imgError, setImgError] = useState(false);

  const showImage = Boolean(src) && !imgError;
  const initials = getInitials(name);

  const classes = [
    'arch-avatar',
    `arch-avatar--${size}`,
    `arch-avatar--${shape}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      ref={ref}
      className={classes}
      role={showImage ? undefined : 'img'}
      aria-label={showImage ? undefined : name}
      {...rest}
    >
      {showImage ? (
        <img
          className="arch-avatar__image"
          src={src}
          alt={name}
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="arch-avatar__initials" aria-hidden="true">
          {initials}
        </span>
      )}
    </span>
  );
});

export { Avatar };
export default Avatar;
