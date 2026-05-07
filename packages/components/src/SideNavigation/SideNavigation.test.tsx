import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { SideNavigation } from './SideNavigation';
import type { SideNavItem } from './SideNavigation';

const basicItems: SideNavItem[] = [
  { itemId: 'home', title: 'Home' },
  { itemId: 'settings', title: 'Settings' },
  { itemId: 'profile', title: 'Profile' },
];

const nestedItems: SideNavItem[] = [
  { itemId: 'home', title: 'Home' },
  {
    itemId: 'settings',
    title: 'Settings',
    subNav: [
      { itemId: 'general', title: 'General' },
      { itemId: 'security', title: 'Security' },
    ],
  },
];

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('SideNavigation — rendering', () => {
  it('renders without crashing', () => {
    render(<SideNavigation items={basicItems} />);
    expect(screen.getByRole('navigation', { name: 'Side navigation' })).toBeInTheDocument();
  });

  it('renders all items', () => {
    render(<SideNavigation items={basicItems} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  it('applies a custom className', () => {
    render(<SideNavigation items={basicItems} className="custom-nav" />);
    expect(screen.getByRole('navigation')).toHaveClass('custom-nav');
  });

  it('forwards a ref to the nav element', () => {
    const ref = React.createRef<HTMLElement>();
    render(<SideNavigation ref={ref} items={basicItems} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('NAV');
  });
});

/* ─── Active item ────────────────────────────────────────────────────────────── */

describe('SideNavigation — active item', () => {
  it('marks the active item with aria-current=page', () => {
    render(<SideNavigation items={basicItems} activeItemId="settings" />);
    const activeItem = screen.getByText('Settings').closest('button');
    expect(activeItem).toHaveAttribute('aria-current', 'page');
  });

  it('applies active class to active item', () => {
    render(<SideNavigation items={basicItems} activeItemId="home" />);
    const activeItem = screen.getByText('Home').closest('button');
    expect(activeItem).toHaveClass('arch-side-navigation__item--active');
  });
});

/* ─── Nested items ───────────────────────────────────────────────────────────── */

describe('SideNavigation — nested items', () => {
  it('expands parent when a child is active', () => {
    render(<SideNavigation items={nestedItems} activeItemId="general" />);
    expect(screen.getByText('General')).toBeInTheDocument();
    expect(screen.getByText('Security')).toBeInTheDocument();
  });

  it('toggles sub-nav on parent click', async () => {
    const user = userEvent.setup();
    render(<SideNavigation items={nestedItems} onChange={vi.fn()} />);
    const settingsBtn = screen.getByText('Settings').closest('button')!;
    await user.click(settingsBtn);
    expect(screen.getByText('General')).toBeInTheDocument();
    await user.click(settingsBtn);
    expect(screen.queryByText('General')).not.toBeInTheDocument();
  });
});

/* ─── Collapsed mode ─────────────────────────────────────────────────────────── */

describe('SideNavigation — collapsed', () => {
  it('applies collapsed class to root', () => {
    render(<SideNavigation items={basicItems} collapsed />);
    expect(screen.getByRole('navigation')).toHaveClass('arch-side-navigation--collapsed');
  });

  it('hides titles when collapsed', () => {
    render(<SideNavigation items={basicItems} collapsed />);
    const titles = document.querySelectorAll('.arch-side-navigation__title');
    expect(titles).toHaveLength(0);
  });
});

/* ─── Header and footer ─────────────────────────────────────────────────────── */

describe('SideNavigation — header and footer', () => {
  it('renders header content', () => {
    render(<SideNavigation items={basicItems} header={<div>User Info</div>} />);
    expect(screen.getByText('User Info')).toBeInTheDocument();
  });

  it('renders footer content', () => {
    render(<SideNavigation items={basicItems} footer={<div>Settings Footer</div>} />);
    expect(screen.getByText('Settings Footer')).toBeInTheDocument();
  });
});

/* ─── Disabled items ─────────────────────────────────────────────────────────── */

describe('SideNavigation — disabled items', () => {
  it('applies disabled class to disabled items', () => {
    const items: SideNavItem[] = [
      { itemId: 'home', title: 'Home', disabled: true },
    ];
    render(<SideNavigation items={items} />);
    const item = screen.getByText('Home').closest('button');
    expect(item).toHaveClass('arch-side-navigation__item--disabled');
  });

  it('sets aria-disabled on disabled items', () => {
    const items: SideNavItem[] = [
      { itemId: 'home', title: 'Home', disabled: true },
    ];
    render(<SideNavigation items={items} />);
    const item = screen.getByText('Home').closest('button');
    expect(item).toHaveAttribute('aria-disabled', 'true');
  });
});

/* ─── Interactivity ──────────────────────────────────────────────────────────── */

describe('SideNavigation — interactivity', () => {
  it('calls onChange when an item is clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<SideNavigation items={basicItems} onChange={onChange} />);
    await user.click(screen.getByText('Profile'));
    expect(onChange).toHaveBeenCalledWith('profile');
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('SideNavigation — accessibility', () => {
  it('has aria-label on the nav element', () => {
    render(<SideNavigation items={basicItems} />);
    expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Side navigation');
  });

  it('passes axe with default props', async () => {
    const { container } = render(
      <SideNavigation items={basicItems} activeItemId="home" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
