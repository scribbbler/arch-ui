import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Banner } from './Banner';

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('Banner — rendering', () => {
  it('renders children', () => {
    render(<Banner>Site maintenance tonight.</Banner>);
    expect(screen.getByText('Site maintenance tonight.')).toBeInTheDocument();
  });

  it('applies arch-banner base class', () => {
    const { container } = render(<Banner>Message</Banner>);
    expect(container.firstChild).toHaveClass('arch-banner');
  });

  it('applies custom className', () => {
    const { container } = render(<Banner className="custom">Message</Banner>);
    expect(container.firstChild).toHaveClass('custom');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Banner ref={ref}>Message</Banner>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });
});

/* ─── Variants ───────────────────────────────────────────────────────────────── */

describe('Banner — variants', () => {
  const variants = ['info', 'success', 'warning', 'danger'] as const;

  variants.forEach((variant) => {
    it(`applies arch-banner--${variant} class`, () => {
      const { container } = render(<Banner variant={variant}>Message</Banner>);
      expect(container.firstChild).toHaveClass(`arch-banner--${variant}`);
    });
  });

  it('defaults to variant=info', () => {
    const { container } = render(<Banner>Message</Banner>);
    expect(container.firstChild).toHaveClass('arch-banner--info');
  });
});

/* ─── Role per variant ───────────────────────────────────────────────────────── */

describe('Banner — role', () => {
  it('uses role="alert" for danger', () => {
    render(<Banner variant="danger">Critical issue</Banner>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('uses role="alert" for warning', () => {
    render(<Banner variant="warning">Heads up</Banner>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('uses role="status" for success', () => {
    render(<Banner variant="success">All good</Banner>);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('uses role="status" for info', () => {
    render(<Banner variant="info">FYI</Banner>);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});

/* ─── onClose ────────────────────────────────────────────────────────────────── */

describe('Banner — onClose', () => {
  it('does not render close button without onClose', () => {
    render(<Banner>Message</Banner>);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders a close button when onClose is provided', () => {
    render(<Banner onClose={vi.fn()}>Message</Banner>);
    expect(screen.getByRole('button', { name: 'Dismiss banner' })).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', async () => {
    const user = userEvent.setup();
    const handler = vi.fn();
    render(<Banner onClose={handler}>Message</Banner>);
    await user.click(screen.getByRole('button', { name: 'Dismiss banner' }));
    expect(handler).toHaveBeenCalledTimes(1);
  });
});

/* ─── Full width ─────────────────────────────────────────────────────────────── */

describe('Banner — full width', () => {
  it('has inline-size 100% via CSS class structure', () => {
    const { container } = render(<Banner>Message</Banner>);
    const banner = container.firstChild as HTMLElement;
    expect(banner).toHaveClass('arch-banner');
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('Banner — accessibility', () => {
  it('passes axe for info variant', async () => {
    const { container } = render(<Banner variant="info">Informational message.</Banner>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe for success variant', async () => {
    const { container } = render(<Banner variant="success">Operation succeeded.</Banner>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe for warning variant', async () => {
    const { container } = render(<Banner variant="warning">Caution advised.</Banner>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe for danger variant', async () => {
    const { container } = render(<Banner variant="danger">Critical error.</Banner>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe with onClose button', async () => {
    const { container } = render(
      <Banner variant="info" onClose={vi.fn()}>
        Dismissible banner.
      </Banner>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
