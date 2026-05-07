import React, { forwardRef } from 'react';
import './Layout.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export interface LayoutProps {
  /** Layout sub-components. */
  children?: React.ReactNode;
  /** Additional CSS class names. */
  className?: string;
}

export interface LayoutSectionProps {
  /** Section content. */
  children?: React.ReactNode;
  /** Additional CSS class names. */
  className?: string;
}

/* ─── Sub-components ─────────────────────────────────────────────────────────── */

/**
 * LayoutHeader — renders a <header> element for the top area of the page.
 */
const LayoutHeader = forwardRef<HTMLElement, LayoutSectionProps>(
  function LayoutHeader({ children, className }, ref) {
    const classes = ['arch-layout__header', className]
      .filter(Boolean)
      .join(' ');
    return (
      <header ref={ref} className={classes}>
        {children}
      </header>
    );
  },
);

LayoutHeader.displayName = 'LayoutHeader';

/**
 * LayoutSidebar — renders an <aside> element for side navigation.
 */
const LayoutSidebar = forwardRef<HTMLElement, LayoutSectionProps>(
  function LayoutSidebar({ children, className }, ref) {
    const classes = ['arch-layout__sidebar', className]
      .filter(Boolean)
      .join(' ');
    return (
      <aside ref={ref} className={classes}>
        {children}
      </aside>
    );
  },
);

LayoutSidebar.displayName = 'LayoutSidebar';

/**
 * LayoutContent — renders a <main> element for the primary content area.
 */
const LayoutContent = forwardRef<HTMLElement, LayoutSectionProps>(
  function LayoutContent({ children, className }, ref) {
    const classes = ['arch-layout__content', className]
      .filter(Boolean)
      .join(' ');
    return (
      <main ref={ref} className={classes}>
        {children}
      </main>
    );
  },
);

LayoutContent.displayName = 'LayoutContent';

/**
 * LayoutFooter — renders a <footer> element for the bottom area of the page.
 */
const LayoutFooter = forwardRef<HTMLElement, LayoutSectionProps>(
  function LayoutFooter({ children, className }, ref) {
    const classes = ['arch-layout__footer', className]
      .filter(Boolean)
      .join(' ');
    return (
      <footer ref={ref} className={classes}>
        {children}
      </footer>
    );
  },
);

LayoutFooter.displayName = 'LayoutFooter';

/* ─── Layout ─────────────────────────────────────────────────────────────────── */

/**
 * Layout
 *
 * Page-level layout with header, sidebar, content, and footer areas.
 *
 * @example
 * <Layout>
 *   <LayoutHeader>App Header</LayoutHeader>
 *   <LayoutSidebar>Navigation</LayoutSidebar>
 *   <LayoutContent>Main content</LayoutContent>
 *   <LayoutFooter>Footer</LayoutFooter>
 * </Layout>
 */
const Layout = forwardRef<HTMLDivElement, LayoutProps>(
  function Layout({ children, className }, ref) {
    const classes = ['arch-layout', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes}>
        {children}
      </div>
    );
  },
);

Layout.displayName = 'Layout';

export { Layout, LayoutHeader, LayoutSidebar, LayoutContent, LayoutFooter };
export default Layout;
