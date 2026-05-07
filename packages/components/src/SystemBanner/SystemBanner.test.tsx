import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { SystemBanner } from './SystemBanner';

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('SystemBanner — rendering', () => {
  it('renders without crashing', () => {
    render(<SystemBanner>Maintenance scheduled</SystemBanner>);
    expect(screen.getByText('Maintenance scheduled')).toBeInTheDocument();
  });

  it('renders children as banner content', () => {
    render(<SystemBanner>System update in progress</SystemBanner>);
    expect(screen.getByText('System update in progress')).toBeInTheDocument();
  });

  it('applies a custom className', () => {
    render(<SystemBanner className="custom">Message</SystemBanner>);
    expect(screen.getByText('Message').closest('.arch-system-banner')).toHaveClass('custom');
  });

  it('forwards a ref to the root element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<SystemBanner ref={ref}>Message</SystemBanner>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });
});

/* ─── Variants ───────────────────────────────────────────────────────────────── */

describe('SystemBanner — variants', () => {
  const variants = ['info', 'warning', 'error'] as const;

  variants.forEach((variant) => {
    it(`applies the "${variant}" variant class`, () => {
      const { container } = render(
        <SystemBanner variant={variant}>Message</SystemBanner>
      );
      expect(container.firstChild).toHaveClass(`arch-system-banner--${variant}`);
    });
  });

  it('defaults to variant="info"', () => {
    const { container } = render(<SystemBanner>Message</SystemBanner>);
    expect(container.firstChild).toHaveClass('arch-system-banner--info');
  });

  it('uses role="alert" for warning variant', () => {
    render(<SystemBanner variant="warning">Warning</SystemBanner>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('uses role="alert" for error variant', () => {
    render(<SystemBanner variant="error">Error</SystemBanner>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('uses role="status" for info variant', () => {
    render(<SystemBanner variant="info">Info</SystemBanner>);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});

/* ─── Action button ──────────────────────────────────────────────────────────── */

describe('SystemBanner — action button', () => {
  it('renders action button when actionLabel and onAction provided', () => {
    render(
      <SystemBanner actionLabel="Learn more" onAction={vi.fn()}>
        Message
      </SystemBanner>
    );
    expect(screen.getByText('Learn more')).toBeInTheDocument();
  });

  it('does not render action button when actionLabel is absent', () => {
    const { container } = render(<SystemBanner>Message</SystemBanner>);
    expect(container.querySelector('.arch-system-banner__action')).toBeNull();
  });

  it('calls onAction when action button is clicked', async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();
    render(
      <SystemBanner actionLabel="Details" onAction={onAction}>
        Message
      </SystemBanner>
    );
    await user.click(screen.getByText('Details'));
    expect(onAction).toHaveBeenCalledTimes(1);
  });
});

/* ─── Close button ───────────────────────────────────────────────────────────── */

describe('SystemBanner — close button', () => {
  it('renders close button when onClose is provided', () => {
    render(<SystemBanner onClose={vi.fn()}>Message</SystemBanner>);
    expect(screen.getByRole('button', { name: 'Dismiss system banner' })).toBeInTheDocument();
  });

  it('does not render close button when onClose is absent', () => {
    render(<SystemBanner>Message</SystemBanner>);
    expect(screen.queryByRole('button', { name: 'Dismiss system banner' })).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<SystemBanner onClose={onClose}>Message</SystemBanner>);
    await user.click(screen.getByRole('button', { name: 'Dismiss system banner' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('SystemBanner — accessibility', () => {
  it('passes axe with default props', async () => {
    const { container } = render(<SystemBanner>Accessible banner</SystemBanner>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe with all features', async () => {
    const { container } = render(
      <SystemBanner variant="warning" actionLabel="More" onAction={vi.fn()} onClose={vi.fn()}>
        Full banner
      </SystemBanner>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
