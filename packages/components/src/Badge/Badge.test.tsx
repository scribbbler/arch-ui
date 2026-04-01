import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Badge } from './Badge';

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('Badge — rendering', () => {
  it('renders children', () => {
    render(<Badge>Active</Badge>);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('renders a <span> element', () => {
    render(<Badge>Active</Badge>);
    expect(screen.getByText('Active').tagName).toBe('SPAN');
  });

  it('applies a custom className', () => {
    render(<Badge className="my-badge">Active</Badge>);
    expect(screen.getByText('Active')).toHaveClass('my-badge');
  });

  it('forwards a ref to the root element', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Badge ref={ref}>Active</Badge>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('SPAN');
  });
});

/* ─── Variants ───────────────────────────────────────────────────────────────── */

describe('Badge — variants', () => {
  const variants = ['neutral', 'info', 'success', 'warning', 'danger'] as const;

  variants.forEach((variant) => {
    it(`applies the "${variant}" variant class`, () => {
      render(<Badge variant={variant}>{variant}</Badge>);
      expect(screen.getByText(variant)).toHaveClass(`arch-badge--${variant}`);
    });
  });

  it('defaults to variant="neutral"', () => {
    render(<Badge>Default</Badge>);
    expect(screen.getByText('Default')).toHaveClass('arch-badge--neutral');
  });
});

/* ─── Sizes ──────────────────────────────────────────────────────────────────── */

describe('Badge — sizes', () => {
  it('applies the "sm" size class', () => {
    render(<Badge size="sm">Small</Badge>);
    expect(screen.getByText('Small')).toHaveClass('arch-badge--sm');
  });

  it('applies the "md" size class', () => {
    render(<Badge size="md">Medium</Badge>);
    expect(screen.getByText('Medium')).toHaveClass('arch-badge--md');
  });

  it('defaults to size="md"', () => {
    render(<Badge>Default</Badge>);
    expect(screen.getByText('Default')).toHaveClass('arch-badge--md');
  });
});

/* ─── Dot mode ───────────────────────────────────────────────────────────────── */

describe('Badge — dot mode', () => {
  it('renders the dot element when dot=true', () => {
    render(<Badge dot aria-label="Error indicator" />);
    const badge = screen.getByRole('img', { name: 'Error indicator' });
    expect(badge.querySelector('.arch-badge__dot')).toBeInTheDocument();
  });

  it('applies the dot modifier class when dot=true', () => {
    render(<Badge dot aria-label="Status" />);
    expect(screen.getByRole('img', { name: 'Status' })).toHaveClass('arch-badge--dot');
  });

  it('renders dot alongside children', () => {
    render(<Badge dot>Active</Badge>);
    const badge = screen.getByText('Active').closest('.arch-badge');
    expect(badge?.querySelector('.arch-badge__dot')).toBeInTheDocument();
  });

  it('marks dot aria-hidden when children are present', () => {
    render(<Badge dot>Active</Badge>);
    const badge = screen.getByText('Active').closest('.arch-badge');
    const dot = badge?.querySelector('.arch-badge__dot');
    expect(dot).toHaveAttribute('aria-hidden', 'true');
  });

  it('accepts aria-label when dot=true with no children', () => {
    render(<Badge dot aria-label="New notification" />);
    expect(screen.getByRole('img', { name: 'New notification' })).toBeInTheDocument();
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('Badge — accessibility', () => {
  it('passes axe with default props', async () => {
    const { container } = render(<Badge>Active</Badge>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe for all variants', async () => {
    const variants = ['neutral', 'info', 'success', 'warning', 'danger'] as const;
    for (const variant of variants) {
      const { container } = render(<Badge variant={variant}>{variant}</Badge>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });

  it('passes axe for sm size', async () => {
    const { container } = render(<Badge size="sm">Small</Badge>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe for dot mode with aria-label', async () => {
    const { container } = render(<Badge dot aria-label="Error state" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
