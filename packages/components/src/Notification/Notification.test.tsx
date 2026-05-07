import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Notification } from './Notification';

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('Notification — rendering', () => {
  it('renders without crashing', () => {
    render(<Notification>Message</Notification>);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders children as content', () => {
    render(<Notification>Something happened</Notification>);
    expect(screen.getByText('Something happened')).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    render(<Notification title="Notice">Body</Notification>);
    expect(screen.getByText('Notice')).toBeInTheDocument();
    expect(screen.getByText('Notice').tagName).toBe('STRONG');
  });

  it('applies the base class', () => {
    render(<Notification>Msg</Notification>);
    expect(screen.getByRole('status')).toHaveClass('arch-notification');
  });

  it('applies a custom className', () => {
    render(<Notification className="my-notif">Msg</Notification>);
    expect(screen.getByRole('status')).toHaveClass('arch-notification', 'my-notif');
  });
});

/* ─── Variants ───────────────────────────────────────────────────────────────── */

describe('Notification — variants', () => {
  it('defaults to variant="info"', () => {
    render(<Notification>Info</Notification>);
    expect(screen.getByRole('status')).toHaveClass('arch-notification--info');
  });

  it('applies the "success" variant class', () => {
    render(<Notification variant="success">Done</Notification>);
    expect(screen.getByRole('status')).toHaveClass('arch-notification--success');
  });

  it('applies the "warning" variant class', () => {
    render(<Notification variant="warning">Watch out</Notification>);
    expect(screen.getByRole('alert')).toHaveClass('arch-notification--warning');
  });

  it('applies the "error" variant class', () => {
    render(<Notification variant="error">Failed</Notification>);
    expect(screen.getByRole('alert')).toHaveClass('arch-notification--error');
  });
});

/* ─── Roles ──────────────────────────────────────────────────────────────────── */

describe('Notification — ARIA roles', () => {
  it('uses role="status" for info variant', () => {
    render(<Notification variant="info">Info</Notification>);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('uses role="status" for success variant', () => {
    render(<Notification variant="success">Done</Notification>);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('uses role="alert" for warning variant', () => {
    render(<Notification variant="warning">Warning</Notification>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('uses role="alert" for error variant', () => {
    render(<Notification variant="error">Error</Notification>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});

/* ─── Closeable ──────────────────────────────────────────────────────────────── */

describe('Notification — closeable', () => {
  it('does not render close button by default', () => {
    const { container } = render(<Notification>Msg</Notification>);
    expect(container.querySelector('.arch-notification__close')).not.toBeInTheDocument();
  });

  it('does not render close button when closeable=true but no onClose', () => {
    const { container } = render(<Notification closeable>Msg</Notification>);
    expect(container.querySelector('.arch-notification__close')).not.toBeInTheDocument();
  });

  it('renders close button when closeable=true and onClose is provided', () => {
    const { container } = render(
      <Notification closeable onClose={() => {}}>Msg</Notification>
    );
    expect(container.querySelector('.arch-notification__close')).toBeInTheDocument();
  });

  it('fires onClose when the close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Notification closeable onClose={onClose}>Msg</Notification>
    );

    const closeBtn = screen.getByLabelText('Close');
    await user.click(closeBtn);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

/* ─── forwardRef ─────────────────────────────────────────────────────────────── */

describe('Notification — forwardRef', () => {
  it('forwards a ref to the root div', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Notification ref={ref}>Msg</Notification>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });
});
