import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { TabsMotion } from './TabsMotion';

const defaultTabs = [
  { key: 'overview', label: 'Overview' },
  { key: 'settings', label: 'Settings' },
  { key: 'billing', label: 'Billing' },
];

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('TabsMotion — rendering', () => {
  it('renders without crashing', () => {
    render(<TabsMotion tabs={defaultTabs} activeKey="overview" onChange={vi.fn()} />);
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('renders all tabs', () => {
    render(<TabsMotion tabs={defaultTabs} activeKey="overview" onChange={vi.fn()} />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(3);
  });

  it('renders tab labels', () => {
    render(<TabsMotion tabs={defaultTabs} activeKey="overview" onChange={vi.fn()} />);
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Billing')).toBeInTheDocument();
  });

  it('applies a custom className', () => {
    const { container } = render(
      <TabsMotion tabs={defaultTabs} activeKey="overview" onChange={vi.fn()} className="custom" />
    );
    expect(container.firstChild).toHaveClass('custom');
  });

  it('forwards a ref to the root element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<TabsMotion ref={ref} tabs={defaultTabs} activeKey="overview" onChange={vi.fn()} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });
});

/* ─── Active tab ─────────────────────────────────────────────────────────────── */

describe('TabsMotion — active tab', () => {
  it('marks the active tab with aria-selected=true', () => {
    render(<TabsMotion tabs={defaultTabs} activeKey="settings" onChange={vi.fn()} />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[0]).toHaveAttribute('aria-selected', 'false');
  });

  it('applies active class to the active tab', () => {
    render(<TabsMotion tabs={defaultTabs} activeKey="billing" onChange={vi.fn()} />);
    expect(screen.getByText('Billing').closest('button')).toHaveClass(
      'arch-tabs-motion__tab--active'
    );
  });

  it('gives the active tab tabIndex 0 and others -1', () => {
    render(<TabsMotion tabs={defaultTabs} activeKey="overview" onChange={vi.fn()} />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveAttribute('tabindex', '0');
    expect(tabs[1]).toHaveAttribute('tabindex', '-1');
    expect(tabs[2]).toHaveAttribute('tabindex', '-1');
  });
});

/* ─── Fill mode ──────────────────────────────────────────────────────────────── */

describe('TabsMotion — fill', () => {
  it('applies fixed fill class', () => {
    const { container } = render(
      <TabsMotion tabs={defaultTabs} activeKey="overview" onChange={vi.fn()} fill="fixed" />
    );
    expect(container.firstChild).toHaveClass('arch-tabs-motion--fill-fixed');
  });

  it('does not apply fixed fill class for intrinsic (default)', () => {
    const { container } = render(
      <TabsMotion tabs={defaultTabs} activeKey="overview" onChange={vi.fn()} />
    );
    expect(container.firstChild).not.toHaveClass('arch-tabs-motion--fill-fixed');
  });
});

/* ─── Interactivity ──────────────────────────────────────────────────────────── */

describe('TabsMotion — interactivity', () => {
  it('calls onChange when a tab is clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<TabsMotion tabs={defaultTabs} activeKey="overview" onChange={onChange} />);
    await user.click(screen.getByText('Billing'));
    expect(onChange).toHaveBeenCalledWith('billing');
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('TabsMotion — accessibility', () => {
  it('tablist has horizontal orientation', () => {
    render(<TabsMotion tabs={defaultTabs} activeKey="overview" onChange={vi.fn()} />);
    expect(screen.getByRole('tablist')).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('passes axe with default props', async () => {
    const { container } = render(
      <TabsMotion tabs={defaultTabs} activeKey="overview" onChange={vi.fn()} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
