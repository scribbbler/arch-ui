import React, { forwardRef, useState } from 'react';
import './SideNavigation.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export interface SideNavItem {
  /** Unique identifier for the navigation item. */
  itemId: string;
  /** Display title of the navigation item. */
  title: string;
  /** Optional icon rendered before the title. */
  icon?: React.ReactNode;
  /** Optional URL. When provided, renders as an anchor instead of a button. */
  href?: string;
  /** Optional badge rendered on the right side of the item. */
  badge?: string | number;
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
  /** When true, only show icons and hide labels. */
  collapsed?: boolean;
  /** Content rendered above the nav list (e.g. avatar/user info). */
  header?: React.ReactNode;
  /** Content rendered below the nav list, pushed to the bottom (e.g. settings/theme toggle). */
  footer?: React.ReactNode;
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
  collapsed?: boolean;
  depth: number;
}

function SideNavItemRenderer({ item, activeItemId, onChange, collapsed, depth }: SideNavItemRendererProps) {
  const hasSubNav = item.subNav && item.subNav.length > 0;
  const isActive = item.itemId === activeItemId;
  const isExpanded = hasSubNav && containsActiveId(item.subNav!, activeItemId || '');
  const [open, setOpen] = useState(isExpanded);

  const handleClick = (e: React.MouseEvent) => {
    if (hasSubNav) {
      setOpen((prev) => !prev);
    }
    if (item.href) {
      // Let the anchor navigate naturally, but still notify onChange
      onChange?.(item.itemId);
      return;
    }
    e.preventDefault();
    onChange?.(item.itemId);
  };

  const classes = [
    'arch-side-navigation__item',
    isActive && 'arch-side-navigation__item--active',
    depth > 0 && 'arch-side-navigation__item--nested',
    collapsed && 'arch-side-navigation__item--collapsed',
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {item.icon && (
        <span className="arch-side-navigation__icon" aria-hidden="true">
          {item.icon}
        </span>
      )}
      {!collapsed && <span className="arch-side-navigation__title">{item.title}</span>}
      {!collapsed && item.badge != null && (
        <span className="arch-side-navigation__badge">{item.badge}</span>
      )}
    </>
  );

  const Tag = item.href ? 'a' : 'button';
  const tagProps = item.href
    ? { href: item.href }
    : { type: 'button' as const };

  return (
    <li className="arch-side-navigation__item-wrapper">
      <Tag
        className={classes}
        onClick={handleClick}
        aria-current={isActive ? 'page' : undefined}
        aria-expanded={hasSubNav && !collapsed ? open : undefined}
        title={collapsed ? item.title : undefined}
        {...tagProps}
      >
        {content}
      </Tag>
      {hasSubNav && open && !collapsed && (
        <ul className="arch-side-navigation__sub-list">
          {item.subNav!.map((subItem) => (
            <SideNavItemRenderer
              key={subItem.itemId}
              item={subItem}
              activeItemId={activeItemId}
              onChange={onChange}
              collapsed={collapsed}
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
 * Vertical sidebar navigation with nested items, icons, badges, and active state.
 * Supports a collapsed mode that shows only icons.
 *
 * @example
 * <SideNavigation
 *   items={[
 *     { itemId: 'home', title: 'Home', icon: <HomeIcon /> },
 *     { itemId: 'settings', title: 'Settings', badge: 3, subNav: [
 *       { itemId: 'profile', title: 'Profile', href: '/profile' },
 *     ]},
 *   ]}
 *   activeItemId="home"
 *   onChange={(id) => console.log(id)}
 *   header={<UserAvatar />}
 *   footer={<ThemeToggle />}
 * />
 */
const SideNavigation = forwardRef<HTMLElement, SideNavigationProps>(
  function SideNavigation(
    { items = [], activeItemId, onChange, collapsed = false, header, footer, className, ...rest },
    ref
  ) {
    const classes = [
      'arch-side-navigation',
      collapsed && 'arch-side-navigation--collapsed',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <nav ref={ref} className={classes} aria-label="Side navigation" {...rest}>
        {header && <div className="arch-side-navigation__header">{header}</div>}
        <ul className="arch-side-navigation__list">
          {items.map((item) => (
            <SideNavItemRenderer
              key={item.itemId}
              item={item}
              activeItemId={activeItemId}
              onChange={onChange}
              collapsed={collapsed}
              depth={0}
            />
          ))}
        </ul>
        {footer && <div className="arch-side-navigation__footer">{footer}</div>}
      </nav>
    );
  }
);

export { SideNavigation };
export default SideNavigation;
