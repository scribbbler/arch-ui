import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AppNavBar } from './AppNavBar';

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('AppNavBar — rendering', () => {
  it('renders without crashing', () => {
    render(<AppNavBar />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders a <nav> element', () => {
    render(<AppNavBar />);
    expect(screen.getByRole('navigation').tagName).toBe('NAV');
  });

  it('has aria-label "Application navigation"', () => {
    render(<AppNavBar />);
    expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Application navigation');
  });

  it('renders the title text', () => {
    render(<AppNavBar title="My App" />);
    expect(screen.getByText('My App')).toBeInTheDocument();
  });

  it('renders the logo element', () => {
    render(<AppNavBar logo={<span data-testid="logo">Logo</span>} />);
    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });

  it('renders userInfo content', () => {
    render(<AppNavBar userInfo={<span>John</span>} />);
    expect(screen.getByText('John')).toBeInTheDocument();
  });

  it('applies a custom className', () => {
    render(<AppNavBar className="custom" />);
    expect(screen.getByRole('navigation')).toHaveClass('arch-app-nav-bar', 'custom');
  });

  it('forwards a ref to the root element', () => {
    const ref = React.createRef<HTMLElement>();
    render(<AppNavBar ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('NAV');
  });
});

/* ─── Items ──────────────────────────────────────────────────────────────────── */

describe('AppNavBar — items', () => {
  const items = [
    { label: 'Home', href: '/', active: true },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  it('renders all navigation items', () => {
    render(<AppNavBar items={items} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders items as anchor elements', () => {
    render(<AppNavBar items={items} />);
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/');
  });

  it('applies active class to the active item', () => {
    render(<AppNavBar items={items} />);
    expect(screen.getByText('Home').closest('a')).toHaveClass('arch-app-nav-bar__item--active');
  });

  it('does not apply active class to inactive items', () => {
    render(<AppNavBar items={items} />);
    expect(screen.getByText('About').closest('a')).not.toHaveClass('arch-app-nav-bar__item--active');
  });

  it('sets aria-current="page" on the active item', () => {
    render(<AppNavBar items={items} />);
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('aria-current', 'page');
  });

  it('does not set aria-current on inactive items', () => {
    render(<AppNavBar items={items} />);
    expect(screen.getByText('About').closest('a')).not.toHaveAttribute('aria-current');
  });

  it('renders item icons when provided', () => {
    const itemsWithIcon = [{ label: 'Home', icon: <span data-testid="icon">*</span> }];
    render(<AppNavBar items={itemsWithIcon} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});
