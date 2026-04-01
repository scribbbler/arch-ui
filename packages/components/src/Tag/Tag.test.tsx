import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Tag } from './Tag';

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('Tag — rendering', () => {
  it('renders children', () => {
    render(<Tag>Design</Tag>);
    expect(screen.getByText('Design')).toBeInTheDocument();
  });

  it('renders a <span> root element', () => {
    const { container } = render(<Tag>Design</Tag>);
    expect(container.firstChild?.nodeName).toBe('SPAN');
  });

  it('applies a custom className', () => {
    const { container } = render(<Tag className="custom">Design</Tag>);
    expect(container.firstChild).toHaveClass('custom');
  });

  it('forwards a ref to the root element', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Tag ref={ref}>Design</Tag>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('SPAN');
  });
});

/* ─── Variants ───────────────────────────────────────────────────────────────── */

describe('Tag — variants', () => {
  const variants = ['neutral', 'primary', 'info', 'success', 'warning', 'danger'] as const;

  variants.forEach((variant) => {
    it(`applies the "${variant}" variant class`, () => {
      const { container } = render(<Tag variant={variant}>{variant}</Tag>);
      expect(container.firstChild).toHaveClass(`arch-tag--${variant}`);
    });
  });

  it('defaults to variant="neutral"', () => {
    const { container } = render(<Tag>Default</Tag>);
    expect(container.firstChild).toHaveClass('arch-tag--neutral');
  });
});

/* ─── Remove button ──────────────────────────────────────────────────────────── */

describe('Tag — onRemove', () => {
  it('renders a close button when onRemove is provided', () => {
    render(<Tag onRemove={vi.fn()}>React</Tag>);
    expect(screen.getByRole('button', { name: 'Remove React' })).toBeInTheDocument();
  });

  it('does NOT render a close button when onRemove is absent', () => {
    render(<Tag>React</Tag>);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('calls onRemove when the close button is clicked', async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    render(<Tag onRemove={onRemove}>React</Tag>);
    await user.click(screen.getByRole('button', { name: 'Remove React' }));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('close button has a descriptive aria-label', () => {
    render(<Tag onRemove={vi.fn()}>TypeScript</Tag>);
    expect(
      screen.getByRole('button', { name: 'Remove TypeScript' })
    ).toBeInTheDocument();
  });
});

/* ─── Icon slot ──────────────────────────────────────────────────────────────── */

describe('Tag — icon slot', () => {
  it('renders the icon when provided', () => {
    render(
      <Tag icon={<svg data-testid="tag-icon" />}>With icon</Tag>
    );
    expect(screen.getByTestId('tag-icon')).toBeInTheDocument();
  });

  it('does NOT render an icon wrapper when icon is absent', () => {
    const { container } = render(<Tag>No icon</Tag>);
    expect(container.querySelector('.arch-tag__icon')).not.toBeInTheDocument();
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('Tag — accessibility', () => {
  it('passes axe with default props', async () => {
    const { container } = render(<Tag>Design</Tag>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe with onRemove', async () => {
    const { container } = render(<Tag onRemove={vi.fn()}>Design</Tag>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe with icon', async () => {
    const { container } = render(
      <Tag icon={<svg aria-hidden="true" />}>Design</Tag>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe for all variants', async () => {
    const variants = ['neutral', 'primary', 'info', 'success', 'warning', 'danger'] as const;
    for (const variant of variants) {
      const { container } = render(<Tag variant={variant}>{variant}</Tag>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });
});
