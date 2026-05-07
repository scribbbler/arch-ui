import React, { forwardRef, useState } from 'react';
import './SideNavigation.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export interface SideNavItem {
  /** Unique identifier for the navigation item. */
  itemId: string;
  /** Display title of the navigation item. */
  title: string;
  /** Optional nested sub-navigation items. */
  subNav?: SideNavItem[];
}

export interface SideNavigationProps extends React.HTMLAttributes<HTMLElement> {
  /** Array of navigation items. */
  items?: SideNavItem[];
  /** The itemId of the currently active navigation item. */
  activeItemId?: string;
  /** Callback fired when a navigation item is selected. */
  onChange?: (itemId: string) => void;
  /** Additional CSS class names. */
  className?: string;
}

/* ─── Helper: check if an item or its children contain the active ID ─────── */

function containsActiveId(items: SideNavItem[], activeItemId: string): boolean {
  for (const item of items) {
    if (item.itemId === activeItemId) return true;
    if (item.subNav && containsActiveId(item.subNav, activeItemId)) return true;
  }
  return false;
}

/* ─── Internal item renderer ────────────────────────────────────────────────── */

interface SideNavItemRendererProps {
  item: SideNavItem;
  activeItemId?: string;
  onChange?: (itemId: string) => void;
  depth: number;
}

function SideNavItemRenderer({ item, activeItemId, onChange, depth }: SideNavItemRendererProps) {
  const hasSubNav = item.subNav && item.subNav.length > 0;
  const isActive = item.itemId === activeItemId;
  const isExpanded = hasSubNav && containsActiveId(item.subNav!, activeItemId || '');
  const [open, setOpen] = useState(isExpanded);

  const handleClick = () => {
    if (hasSubNav) {
      setOpen((prev) => !prev);
    }
    onChange?.(item.itemId);
  };

  const classes = [
    'arch-side-navigation__item',
    isActive && 'arch-side-navigation__item--active',
    depth > 0 && 'arch-side-navigation__item--nested',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <li className="arch-side-navigation__item-wrapper">
      <button
        type="button"
        className={classes}
        onClick={handleClick}
        aria-current={isActive ? 'page' : undefined}
        aria-expanded={hasSubNav ? open : undefined}
      >
        {item.title}
      </button>
      {hasSubNav && open && (
        <ul className="arch-side-navigation__sub-list">
          {item.subNav!.map((subItem) => (
            <SideNavItemRenderer
              key={subItem.itemId}
              item={subItem}
              activeItemId={activeItemId}
              onChange={onChange}
              depth={depth + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * SideNavigation
 *
 * Vertical sidebar navigation with nested items and active state.
 *
 * @example
 * <SideNavigation
 *   items={[
 *     { itemId: 'home', title: 'Home' },
 *     { itemId: 'settings', title: 'Settings', subNav: [
 *       { itemId: 'profile', title: 'Profile' },
 *     ]},
 *   ]}
 *   activeItemId="home"
 *   onChange={(id) => console.log(id)}
 * />
 */
const SideNavigation = forwardRef<HTMLElement, SideNavigationProps>(
  function SideNavigation({ items = [], activeItemId, onChange, className, ...rest }, ref) {
    const classes = ['arch-side-navigation', className].filter(Boolean).join(' ');

    return (
      <nav ref={ref} className={classes} aria-label="Side navigation" {...rest}>
        <ul className="arch-side-navigation__list">
          {items.map((item) => (
            <SideNavItemRenderer
              key={item.itemId}
              item={item}
              activeItemId={activeItemId}
              onChange={onChange}
              depth={0}
            />
          ))}
        </ul>
      </nav>
    );
  }
);

export { SideNavigation };
export default SideNavigation;
