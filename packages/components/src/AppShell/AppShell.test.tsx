import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AppShell } from './AppShell';

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('AppShell — rendering', () => {
  it('renders without crashing', () => {
    render(<AppShell sidebar={<div>Sidebar</div>}>Content</AppShell>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders sidebar content', () => {
    render(<AppShell sidebar={<div>Sidebar</div>}>Content</AppShell>);
    expect(screen.getByText('Sidebar')).toBeInTheDocument();
  });

  it('renders main content area', () => {
    render(<AppShell sidebar={<div>Sidebar</div>}>Main content</AppShell>);
    expect(screen.getByText('Main content')).toBeInTheDocument();
  });

  it('renders an <aside> for the sidebar', () => {
    const { container } = render(<AppShell sidebar={<div>Sidebar</div>}>Content</AppShell>);
    expect(container.querySelector('aside')).toBeInTheDocument();
  });

  it('applies a custom className', () => {
    const { container } = render(
      <AppShell sidebar={<div>Sidebar</div>} className="custom">Content</AppShell>
    );
    expect(container.firstChild).toHaveClass('arch-app-shell', 'custom');
  });

  it('forwards a ref to the root element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<AppShell ref={ref} sidebar={<div>Sidebar</div>}>Content</AppShell>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });
});

/* ─── Collapsed state ────────────────────────────────────────────────────────── */

describe('AppShell — collapsed', () => {
  it('does not apply collapsed class by default', () => {
    const { container } = render(<AppShell sidebar={<div>Sidebar</div>}>Content</AppShell>);
    expect(container.firstChild).not.toHaveClass('arch-app-shell--collapsed');
  });

  it('applies collapsed class when collapsed is true', () => {
    const { container } = render(
      <AppShell sidebar={<div>Sidebar</div>} collapsed>Content</AppShell>
    );
    expect(container.firstChild).toHaveClass('arch-app-shell--collapsed');
  });

  it('sets sidebar width CSS variable to default sidebarWidth when not collapsed', () => {
    const { container } = render(<AppShell sidebar={<div>Sidebar</div>}>Content</AppShell>);
    const root = container.firstChild as HTMLElement;
    expect(root.style.getPropertyValue('--arch-app-shell-sidebar-width')).toBe('240px');
  });

  it('sets sidebar width CSS variable to collapsedWidth when collapsed', () => {
    const { container } = render(
      <AppShell sidebar={<div>Sidebar</div>} collapsed>Content</AppShell>
    );
    const root = container.firstChild as HTMLElement;
    expect(root.style.getPropertyValue('--arch-app-shell-sidebar-width')).toBe('60px');
  });

  it('uses custom sidebarWidth when provided', () => {
    const { container } = render(
      <AppShell sidebar={<div>Sidebar</div>} sidebarWidth="300px">Content</AppShell>
    );
    const root = container.firstChild as HTMLElement;
    expect(root.style.getPropertyValue('--arch-app-shell-sidebar-width')).toBe('300px');
  });

  it('uses custom collapsedWidth when provided', () => {
    const { container } = render(
      <AppShell sidebar={<div>Sidebar</div>} collapsed collapsedWidth="80px">Content</AppShell>
    );
    const root = container.firstChild as HTMLElement;
    expect(root.style.getPropertyValue('--arch-app-shell-sidebar-width')).toBe('80px');
  });
});
