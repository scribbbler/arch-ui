import React, { forwardRef, Children } from 'react';
import './AvatarGroup.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export type AvatarGroupSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Maximum number of avatars to show. Extras are collapsed into a '+N' badge.
   * When undefined, all children are shown.
   */
  max?: number;
  /** Size forwarded to all contained avatars and the overflow badge. Defaults to 'md'. */
  size?: AvatarGroupSize;
  /** Avatar components to display. */
  children?: React.ReactNode;
  /** Additional CSS class names. */
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * AvatarGroup
 *
 * Renders a visually overlapping row of Avatar components. Use the `max` prop
 * to limit visible avatars and show an overflow count badge for the rest.
 *
 * @example
 * <AvatarGroup max={3} size="md">
 *   <Avatar name="Alice Smith" src="/alice.jpg" size="md" />
 *   <Avatar name="Bob Jones" size="md" />
 *   <Avatar name="Carol White" size="md" />
 *   <Avatar name="Dan Brown" size="md" />
 * </AvatarGroup>
 */
const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  function AvatarGroup(
    {
      max,
      size = 'md',
      children,
      className,
      ...rest
    },
    ref
  ) {
    const allChildren = Children.toArray(children);
    const hasMax = typeof max === 'number' && max > 0;
    const visibleChildren = hasMax ? allChildren.slice(0, max) : allChildren;
    const overflowCount = hasMax ? allChildren.length - (max ?? 0) : 0;

    const classes = [
      'arch-avatar-group',
      `arch-avatar-group--${size}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={classes}
        role="group"
        {...rest}
      >
        {visibleChildren.map((child, index) => (
          <span key={index} className="arch-avatar-group__item">
            {child}
          </span>
        ))}
        {overflowCount > 0 && (
          <span
            className="arch-avatar-group__overflow"
            aria-label={`${overflowCount} more`}
            role="img"
          >
            +{overflowCount}
          </span>
        )}
      </div>
    );
  }
);

export { AvatarGroup };
export default AvatarGroup;
