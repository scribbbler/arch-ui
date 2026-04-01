import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Alert } from './Alert';

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('Alert — rendering', () => {
  it('renders title text', () => {
    render(<Alert title="Heads up" />);
    expect(screen.getByText('Heads up')).toBeInTheDocument();
  });

  it('renders description text', () => {
    render(<Alert description="Something went wrong." />);
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
  });

  it('renders both title and description', () => {
    render(<Alert title="Error" description="Please try again." />);
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Please try again.')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Alert className="custom" title="T" />);
    expect(container.firstChild).toHaveClass('custom');
  });

  it('forwards ref to the root div', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Alert ref={ref} title="T" />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });
});

/* ─── Variants ───────────────────────────────────────────────────────────────── */

describe('Alert — variants', () => {
  const variants = ['info', 'success', 'warning', 'danger'] as const;

  variants.forEach((variant) => {
    it(`applies arch-alert--${variant} class`, () => {
      const { container } = render(<Alert variant={variant} title={variant} />);
      expect(container.firstChild).toHaveClass(`arch-alert--${variant}`);
    });
  });

  it('defaults to variant=info', () => {
    const { container } = render(<Alert title="Default" />);
    expect(container.firstChild).toHaveClass('arch-alert--info');
  });
});

/* ─── Correct role per variant ───────────────────────────────────────────────── */

describe('Alert — role per variant', () => {
  it('uses role="alert" for danger variant', () => {
    render(<Alert variant="danger" title="Error" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('uses role="alert" for warning variant', () => {
    render(<Alert variant="warning" title="Warning" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('uses role="status" for success variant', () => {
    render(<Alert variant="success" title="Done" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('uses role="status" for info variant', () => {
    render(<Alert variant="info" title="Info" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});

/* ─── onClose ────────────────────────────────────────────────────────────────── */

describe('Alert — onClose', () => {
  it('does not render a close button when onClose is not provided', () => {
    render(<Alert title="No close" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders a close button when onClose is provided', () => {
    render(<Alert title="Closeable" onClose={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Dismiss alert' })).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', async () => {
    const user = userEvent.setup();
    const handler = vi.fn();
    render(<Alert title="Closeable" onClose={handler} />);
    await user.click(screen.getByRole('button', { name: 'Dismiss alert' }));
    expect(handler).toHaveBeenCalledTimes(1);
  });
});

/* ─── Icon ───────────────────────────────────────────────────────────────────── */

describe('Alert — icon', () => {
  it('renders a default icon when icon prop is not provided', () => {
    const { container } = render(<Alert title="T" />);
    expect(container.querySelector('.arch-alert__icon')).toBeInTheDocument();
  });

  it('renders a custom icon when provided', () => {
    render(<Alert title="T" icon={<span data-testid="custom-icon" />} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('suppresses the icon when icon=null', () => {
    const { container } = render(<Alert title="T" icon={null} />);
    expect(container.querySelector('.arch-alert__icon')).not.toBeInTheDocument();
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('Alert — accessibility', () => {
  it('passes axe for info variant', async () => {
    const { container } = render(
      <Alert variant="info" title="Information" description="Here is some info." />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe for success variant', async () => {
    const { container } = render(
      <Alert variant="success" title="Success" description="Action completed." />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe for warning variant', async () => {
    const { container } = render(
      <Alert variant="warning" title="Warning" description="Please review." />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe for danger variant', async () => {
    const { container } = render(
      <Alert variant="danger" title="Error" description="Something failed." />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe with onClose button', async () => {
    const { container } = render(
      <Alert variant="info" title="Dismissible" onClose={vi.fn()} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
