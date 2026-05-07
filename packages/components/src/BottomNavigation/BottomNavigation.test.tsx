import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BottomNavigation } from './BottomNavigation';

const items = [
  { key: 'home', label: 'Home', icon: <span data-testid="icon-home">H</span> },
  { key: 'search', label: 'Search', icon: <span data-testid="icon-search">S</span> },
  { key: 'profile', label: 'Profile', icon: <span data-testid="icon-profile">P</span> },
];

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('BottomNavigation — rendering', () => {
  it('renders without crashing', () => {
    render(<BottomNavigation items={items} />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders a <nav> element', () => {
    render(<BottomNavigation items={items} />);
    expect(screen.getByRole('navigation').tagName).toBe('NAV');
  });

  it('has aria-label "Bottom navigation"', () => {
    render(<BottomNavigation items={items} />);
    expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Bottom navigation');
  });

  it('renders all items', () => {
    render(<BottomNavigation items={items} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  it('renders item icons', () => {
    render(<BottomNavigation items={items} />);
    expect(screen.getByTestId('icon-home')).toBeInTheDocument();
  });

  it('applies a custom className', () => {
    render(<BottomNavigation items={items} className="custom" />);
    expect(screen.getByRole('navigation')).toHaveClass('arch-bottom-navigation', 'custom');
  });

  it('forwards a ref to the root element', () => {
    const ref = React.createRef<HTMLElement>();
    render(<BottomNavigation ref={ref} items={items} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('NAV');
  });
});

/* ─── Active item ────────────────────────────────────────────────────────────── */

describe('BottomNavigation — active item', () => {
  it('applies active class to the active item', () => {
    render(<BottomNavigation items={items} activeKey="home" />);
    expect(screen.getByText('Home').closest('button')).toHaveClass('arch-bottom-navigation__item--active');
  });

  it('does not apply active class to inactive items', () => {
    render(<BottomNavigation items={items} activeKey="home" />);
    expect(screen.getByText('Search').closest('button')).not.toHaveClass('arch-bottom-navigation__item--active');
  });

  it('sets aria-current="page" on the active item', () => {
    render(<BottomNavigation items={items} activeKey="home" />);
    expect(screen.getByText('Home').closest('button')).toHaveAttribute('aria-current', 'page');
  });

  it('does not set aria-current on inactive items', () => {
    render(<BottomNavigation items={items} activeKey="home" />);
    expect(screen.getByText('Search').closest('button')).not.toHaveAttribute('aria-current');
  });
});

/* ─── Interaction ────────────────────────────────────────────────────────────── */

describe('BottomNavigation — interaction', () => {
  it('fires onChange with the item key when clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<BottomNavigation items={items} activeKey="home" onChange={onChange} />);

    await user.click(screen.getByText('Search').closest('button')!);
    expect(onChange).toHaveBeenCalledWith('search');
  });

  it('fires onChange once per click', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<BottomNavigation items={items} activeKey="home" onChange={onChange} />);

    await user.click(screen.getByText('Search').closest('button')!);
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
