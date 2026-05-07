import React, { forwardRef } from 'react';
import './BottomNavigation.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export interface BottomNavItem {
  /** Unique key identifying this navigation item. */
  key: string;
  /** Visible text label for the tab. */
  label: string;
  /** Icon element rendered above the label. */
  icon: React.ReactNode;
}

export interface BottomNavigationProps extends React.HTMLAttributes<HTMLElement> {
  /** Array of navigation items to render as bottom tabs. */
  items?: BottomNavItem[];
  /** The key of the currently active tab. */
  activeKey?: string;
  /** Callback fired when a tab is selected. */
  onChange?: (key: string) => void;
  /** Additional CSS class names. */
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * BottomNavigation
 *
 * Mobile bottom tab bar navigation for switching between top-level views.
 *
 * @example
 * <BottomNavigation
 *   items={[
 *     { key: 'home', label: 'Home', icon: <HomeIcon /> },
 *     { key: 'search', label: 'Search', icon: <SearchIcon /> },
 *   ]}
 *   activeKey="home"
 *   onChange={(key) => console.log(key)}
 * />
 */
const BottomNavigation = forwardRef<HTMLElement, BottomNavigationProps>(
  function BottomNavigation({ items = [], activeKey, onChange, className, ...rest }, ref) {
    const classes = ['arch-bottom-navigation', className].filter(Boolean).join(' ');

    return (
      <nav ref={ref} className={classes} aria-label="Bottom navigation" {...rest}>
        {items.map((item) => {
          const isActive = item.key === activeKey;

          return (
            <button
              key={item.key}
              type="button"
              className={[
                'arch-bottom-navigation__item',
                isActive && 'arch-bottom-navigation__item--active',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => onChange?.(item.key)}
            >
              <span className="arch-bottom-navigation__icon">{item.icon}</span>
              <span className="arch-bottom-navigation__label">{item.label}</span>
            </button>
          );
        })}
      </nav>
    );
  }
);

export { BottomNavigation };
export default BottomNavigation;
