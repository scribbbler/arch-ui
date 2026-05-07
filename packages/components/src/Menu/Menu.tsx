import React, { forwardRef } from 'react';
import './Menu.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export interface MenuItem {
  /** Display label for the menu item. */
  label: string;
  /** Optional icon rendered before the label. */
  icon?: React.ReactNode;
  /** Whether the item is disabled. */
  disabled?: boolean;
  /** When true, renders a visual divider instead of a clickable item. */
  divider?: boolean;
}

export interface MenuProps extends React.HTMLAttributes<HTMLUListElement> {
  /** Array of menu items. Items with divider=true render as separators. */
  items?: MenuItem[];
  /** Callback fired when a non-disabled menu item is selected. */
  onItemSelect?: (item: MenuItem) => void;
  /** Additional CSS class names. */
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * Menu
 *
 * Dropdown menu with items, groups, and dividers.
 *
 * @example
 * <Menu
 *   items={[
 *     { label: 'Edit', icon: <EditIcon /> },
 *     { label: '', divider: true },
 *     { label: 'Delete', disabled: true },
 *   ]}
 *   onItemSelect={(item) => console.log(item.label)}
 * />
 */
const Menu = forwardRef<HTMLUListElement, MenuProps>(
  function Menu({ items = [], onItemSelect, className, ...rest }, ref) {
    const classes = ['arch-menu', className].filter(Boolean).join(' ');

    return (
      <ul ref={ref} className={classes} role="menu" {...rest}>
        {items.map((item, index) => {
          if (item.divider) {
            return (
              <li
                key={index}
                className="arch-menu__divider"
                role="separator"
              />
            );
          }

          const handleClick = () => {
            if (!item.disabled) {
              onItemSelect?.(item);
            }
          };

          const handleKeyDown = (event: React.KeyboardEvent) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              handleClick();
            }
          };

          return (
            <li
              key={index}
              className={[
                'arch-menu__item',
                item.disabled && 'arch-menu__item--disabled',
              ]
                .filter(Boolean)
                .join(' ')}
              role="menuitem"
              tabIndex={item.disabled ? -1 : 0}
              aria-disabled={item.disabled || undefined}
              onClick={handleClick}
              onKeyDown={handleKeyDown}
            >
              {item.icon && <span className="arch-menu__item-icon">{item.icon}</span>}
              <span className="arch-menu__item-label">{item.label}</span>
            </li>
          );
        })}
      </ul>
    );
  }
);

export { Menu };
export default Menu;
