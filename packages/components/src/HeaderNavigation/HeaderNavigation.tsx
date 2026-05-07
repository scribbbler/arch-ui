import React, { forwardRef } from 'react';
import './HeaderNavigation.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export interface HeaderNavigationProps extends React.HTMLAttributes<HTMLElement> {
  /** Content to render, typically HeaderNavigationLeft and HeaderNavigationRight. */
  children?: React.ReactNode;
  /** Additional CSS class names. */
  className?: string;
}

export interface HeaderNavigationSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Content to render inside the section. */
  children?: React.ReactNode;
  /** Additional CSS class names. */
  className?: string;
}

/* ─── Sub-components ────────────────────────────────────────────────────────── */

/**
 * HeaderNavigationLeft
 *
 * Groups items on the left side of the header navigation.
 */
const HeaderNavigationLeft = forwardRef<HTMLDivElement, HeaderNavigationSectionProps>(
  function HeaderNavigationLeft({ children, className, ...rest }, ref) {
    const classes = ['arch-header-navigation__left', className].filter(Boolean).join(' ');
    return (
      <div ref={ref} className={classes} {...rest}>
        {children}
      </div>
    );
  }
);

/**
 * HeaderNavigationRight
 *
 * Groups items on the right side of the header navigation.
 */
const HeaderNavigationRight = forwardRef<HTMLDivElement, HeaderNavigationSectionProps>(
  function HeaderNavigationRight({ children, className, ...rest }, ref) {
    const classes = ['arch-header-navigation__right', className].filter(Boolean).join(' ');
    return (
      <div ref={ref} className={classes} {...rest}>
        {children}
      </div>
    );
  }
);

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * HeaderNavigation
 *
 * Horizontal header navigation with items grouped in left and right sections.
 *
 * @example
 * <HeaderNavigation>
 *   <HeaderNavigationLeft>
 *     <a href="/">Logo</a>
 *   </HeaderNavigationLeft>
 *   <HeaderNavigationRight>
 *     <a href="/profile">Profile</a>
 *   </HeaderNavigationRight>
 * </HeaderNavigation>
 */
const HeaderNavigation = forwardRef<HTMLElement, HeaderNavigationProps>(
  function HeaderNavigation({ children, className, ...rest }, ref) {
    const classes = ['arch-header-navigation', className].filter(Boolean).join(' ');

    return (
      <nav ref={ref} className={classes} aria-label="Header navigation" {...rest}>
        {children}
      </nav>
    );
  }
);

export { HeaderNavigation, HeaderNavigationLeft, HeaderNavigationRight };
export default HeaderNavigation;
