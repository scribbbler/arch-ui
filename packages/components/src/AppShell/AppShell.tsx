import React, { forwardRef } from 'react';
import './AppShell.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Sidebar content, typically a SideNavigation component. */
  sidebar: React.ReactNode;
  /** Width of the expanded sidebar. Defaults to '240px'. */
  sidebarWidth?: string;
  /** Width of the collapsed sidebar. Defaults to '60px'. */
  collapsedWidth?: string;
  /** Whether the sidebar is in collapsed mode. */
  collapsed?: boolean;
  /** Main content area. */
  children: React.ReactNode;
  /** Additional CSS class names. */
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * AppShell
 *
 * A layout wrapper that provides a sidebar + main content structure.
 * The sidebar is sticky and full-viewport-height; the main content
 * fills the remaining horizontal space.
 *
 * On screens below 768px the sidebar is hidden entirely.
 *
 * @example
 * <AppShell
 *   sidebar={<SideNavigation items={items} activeItemId="home" />}
 *   collapsed={isSidebarCollapsed}
 * >
 *   <main>Page content</main>
 * </AppShell>
 */
const AppShell = forwardRef<HTMLDivElement, AppShellProps>(function AppShell(
  {
    sidebar,
    sidebarWidth = '240px',
    collapsedWidth = '60px',
    collapsed = false,
    children,
    className,
    ...rest
  },
  ref
) {
  const classes = [
    'arch-app-shell',
    collapsed && 'arch-app-shell--collapsed',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const cssVars = {
    '--arch-app-shell-sidebar-width': collapsed ? collapsedWidth : sidebarWidth,
  } as React.CSSProperties;

  return (
    <div ref={ref} className={classes} style={cssVars} {...rest}>
      <aside className="arch-app-shell__sidebar">{sidebar}</aside>
      <div className="arch-app-shell__content">{children}</div>
    </div>
  );
});

export { AppShell };
export default AppShell;
