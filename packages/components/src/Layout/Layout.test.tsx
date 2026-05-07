import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Layout, LayoutHeader, LayoutSidebar, LayoutContent, LayoutFooter } from './Layout';

/* ─── Layout — rendering ─────────────────────────────────────────────────────── */

describe('Layout — rendering', () => {
  it('renders without crashing', () => {
    const { container } = render(<Layout />);
    expect(container.querySelector('.arch-layout')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<Layout><span>Content</span></Layout>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders a <div> element', () => {
    const { container } = render(<Layout />);
    expect(container.querySelector('.arch-layout')?.tagName).toBe('DIV');
  });

  it('applies a custom className', () => {
    const { container } = render(<Layout className="my-layout" />);
    expect(container.querySelector('.arch-layout')).toHaveClass('arch-layout', 'my-layout');
  });
});

/* ─── LayoutHeader ───────────────────────────────────────────────────────────── */

describe('LayoutHeader', () => {
  it('renders a <header> element', () => {
    render(<LayoutHeader>Header</LayoutHeader>);
    expect(screen.getByText('Header').closest('header')).toBeInTheDocument();
  });

  it('applies the header class', () => {
    const { container } = render(<LayoutHeader>Header</LayoutHeader>);
    expect(container.querySelector('.arch-layout__header')).toBeInTheDocument();
  });

  it('applies a custom className', () => {
    const { container } = render(<LayoutHeader className="custom">Header</LayoutHeader>);
    expect(container.querySelector('.arch-layout__header')).toHaveClass('arch-layout__header', 'custom');
  });

  it('forwards a ref', () => {
    const ref = React.createRef<HTMLElement>();
    render(<LayoutHeader ref={ref}>Header</LayoutHeader>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('HEADER');
  });
});

/* ─── LayoutSidebar ──────────────────────────────────────────────────────────── */

describe('LayoutSidebar', () => {
  it('renders an <aside> element', () => {
    render(<LayoutSidebar>Sidebar</LayoutSidebar>);
    expect(screen.getByText('Sidebar').closest('aside')).toBeInTheDocument();
  });

  it('applies the sidebar class', () => {
    const { container } = render(<LayoutSidebar>Sidebar</LayoutSidebar>);
    expect(container.querySelector('.arch-layout__sidebar')).toBeInTheDocument();
  });

  it('forwards a ref', () => {
    const ref = React.createRef<HTMLElement>();
    render(<LayoutSidebar ref={ref}>Sidebar</LayoutSidebar>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('ASIDE');
  });
});

/* ─── LayoutContent ──────────────────────────────────────────────────────────── */

describe('LayoutContent', () => {
  it('renders a <main> element', () => {
    render(<LayoutContent>Main</LayoutContent>);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('applies the content class', () => {
    const { container } = render(<LayoutContent>Main</LayoutContent>);
    expect(container.querySelector('.arch-layout__content')).toBeInTheDocument();
  });

  it('forwards a ref', () => {
    const ref = React.createRef<HTMLElement>();
    render(<LayoutContent ref={ref}>Main</LayoutContent>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('MAIN');
  });
});

/* ─── LayoutFooter ───────────────────────────────────────────────────────────── */

describe('LayoutFooter', () => {
  it('renders a <footer> element', () => {
    render(<LayoutFooter>Footer</LayoutFooter>);
    expect(screen.getByText('Footer').closest('footer')).toBeInTheDocument();
  });

  it('applies the footer class', () => {
    const { container } = render(<LayoutFooter>Footer</LayoutFooter>);
    expect(container.querySelector('.arch-layout__footer')).toBeInTheDocument();
  });

  it('forwards a ref', () => {
    const ref = React.createRef<HTMLElement>();
    render(<LayoutFooter ref={ref}>Footer</LayoutFooter>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('FOOTER');
  });
});

/* ─── Full composition ───────────────────────────────────────────────────────── */

describe('Layout — full composition', () => {
  it('renders all sub-components together', () => {
    render(
      <Layout>
        <LayoutHeader>App Header</LayoutHeader>
        <LayoutSidebar>Navigation</LayoutSidebar>
        <LayoutContent>Main content</LayoutContent>
        <LayoutFooter>App Footer</LayoutFooter>
      </Layout>
    );
    expect(screen.getByText('App Header')).toBeInTheDocument();
    expect(screen.getByText('Navigation')).toBeInTheDocument();
    expect(screen.getByText('Main content')).toBeInTheDocument();
    expect(screen.getByText('App Footer')).toBeInTheDocument();
  });
});

/* ─── forwardRef ─────────────────────────────────────────────────────────────── */

describe('Layout — forwardRef', () => {
  it('forwards a ref to the root div', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Layout ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });
});
