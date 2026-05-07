import React, { forwardRef } from 'react';
import './AppNavBar.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export interface NavItem {
  /** Text label for the navigation item. */
  label: string;
  /** URL the navigation item links to. */
  href?: string;
  /** Whether this item represents the current page. */
  active?: boolean;
  /** Optional icon rendered before the label. */
  icon?: React.ReactNode;
}

export interface AppNavBarProps extends React.HTMLAttributes<HTMLElement> {
  /** Application title displayed in the navigation bar. */
  title?: string;
  /** Logo element rendered at the start of the navigation bar. */
  logo?: React.ReactNode;
  /** Array of navigation items. */
  items?: NavItem[];
  /** Content rendered at the end, typically user profile information. */
  userInfo?: React.ReactNode;
  /** Additional CSS class names. */
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * AppNavBar
 *
 * Top-level application navigation bar with logo, menu items, and user profile area.
 *
 * @example
 * <AppNavBar
 *   title="My App"
 *   items={[{ label: 'Home', href: '/', active: true }]}
 *   userInfo={<span>John</span>}
 * />
 */
const AppNavBar = forwardRef<HTMLElement, AppNavBarProps>(function AppNavBar(
  {
    title,
    logo,
    items = [],
    userInfo,
    className,
    ...rest
  },
  ref
) {
  const classes = ['arch-app-nav-bar', className].filter(Boolean).join(' ');

  return (
    <nav ref={ref} className={classes} aria-label="Application navigation" {...rest}>
      <div className="arch-app-nav-bar__start">
        {logo && <span className="arch-app-nav-bar__logo">{logo}</span>}
        {title && <span className="arch-app-nav-bar__title">{title}</span>}
      </div>

      <ul className="arch-app-nav-bar__items">
        {items.map((item, index) => (
          <li key={index} className="arch-app-nav-bar__item-wrapper">
            <a
              className={[
                'arch-app-nav-bar__item',
                item.active && 'arch-app-nav-bar__item--active',
              ]
                .filter(Boolean)
                .join(' ')}
              href={item.href}
              aria-current={item.active ? 'page' : undefined}
            >
              {item.icon && <span className="arch-app-nav-bar__item-icon">{item.icon}</span>}
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      {userInfo && <div className="arch-app-nav-bar__end">{userInfo}</div>}
    </nav>
  );
});

export { AppNavBar };
export default AppNavBar;
