import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeaderNavigation, HeaderNavigationLeft, HeaderNavigationRight } from './HeaderNavigation';

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('HeaderNavigation — rendering', () => {
  it('renders without crashing', () => {
    render(<HeaderNavigation />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders a <nav> element', () => {
    render(<HeaderNavigation />);
    expect(screen.getByRole('navigation').tagName).toBe('NAV');
  });

  it('renders children', () => {
    render(<HeaderNavigation><span>Logo</span></HeaderNavigation>);
    expect(screen.getByText('Logo')).toBeInTheDocument();
  });

  it('applies the base class', () => {
    render(<HeaderNavigation />);
    expect(screen.getByRole('navigation')).toHaveClass('arch-header-navigation');
  });

  it('applies a custom className', () => {
    render(<HeaderNavigation className="my-nav" />);
    expect(screen.getByRole('navigation')).toHaveClass('arch-header-navigation', 'my-nav');
  });
});

/* ─── Sub-components ─────────────────────────────────────────────────────────── */

describe('HeaderNavigationLeft', () => {
  it('renders children with left section class', () => {
    render(<HeaderNavigationLeft><span>Left</span></HeaderNavigationLeft>);
    expect(screen.getByText('Left').parentElement).toHaveClass('arch-header-navigation__left');
  });

  it('applies a custom className', () => {
    render(<HeaderNavigationLeft className="custom"><span>Left</span></HeaderNavigationLeft>);
    expect(screen.getByText('Left').parentElement).toHaveClass('arch-header-navigation__left', 'custom');
  });

  it('forwards a ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<HeaderNavigationLeft ref={ref}>Left</HeaderNavigationLeft>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });
});

describe('HeaderNavigationRight', () => {
  it('renders children with right section class', () => {
    render(<HeaderNavigationRight><span>Right</span></HeaderNavigationRight>);
    expect(screen.getByText('Right').parentElement).toHaveClass('arch-header-navigation__right');
  });

  it('forwards a ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<HeaderNavigationRight ref={ref}>Right</HeaderNavigationRight>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('HeaderNavigation — accessibility', () => {
  it('has aria-label on the nav element', () => {
    render(<HeaderNavigation />);
    expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Header navigation');
  });
});

/* ─── forwardRef ─────────────────────────────────────────────────────────────── */

describe('HeaderNavigation — forwardRef', () => {
  it('forwards a ref to the nav element', () => {
    const ref = React.createRef<HTMLElement>();
    render(<HeaderNavigation ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('NAV');
  });
});
