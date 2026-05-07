import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Sheet } from './Sheet';

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('Sheet — rendering', () => {
  it('renders nothing when isOpen is false', () => {
    render(<Sheet isOpen={false} onClose={vi.fn()} title="My Sheet" />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders dialog when isOpen is true', () => {
    render(<Sheet isOpen={true} onClose={vi.fn()} title="My Sheet" />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('renders the title', () => {
    render(<Sheet isOpen={true} onClose={vi.fn()} title="Filter Options" />);
    expect(screen.getByText('Filter Options')).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(
      <Sheet isOpen={true} onClose={vi.fn()} title="Sheet">
        <p>Sheet body content</p>
      </Sheet>
    );
    expect(screen.getByText('Sheet body content')).toBeInTheDocument();
  });

  it('renders the close button', () => {
    render(<Sheet isOpen={true} onClose={vi.fn()} title="Sheet" />);
    expect(screen.getByRole('button', { name: 'Close sheet' })).toBeInTheDocument();
  });

  it('applies a custom className', () => {
    render(<Sheet isOpen={true} onClose={vi.fn()} title="Sheet" className="custom" />);
    expect(screen.getByRole('dialog')).toHaveClass('custom');
  });

  it('forwards a ref to the dialog element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Sheet ref={ref} isOpen={true} onClose={vi.fn()} title="Sheet" />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.getAttribute('role')).toBe('dialog');
  });
});

/* ─── Interactivity ──────────────────────────────────────────────────────────── */

describe('Sheet — interactivity', () => {
  it('calls onClose when the close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Sheet isOpen={true} onClose={onClose} title="Sheet" />);
    await user.click(screen.getByRole('button', { name: 'Close sheet' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape key is pressed', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Sheet isOpen={true} onClose={onClose} title="Sheet" />);
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('Sheet — accessibility', () => {
  it('has aria-modal set to true', () => {
    render(<Sheet isOpen={true} onClose={vi.fn()} title="Sheet" />);
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });

  it('has aria-labelledby pointing to the title', () => {
    render(<Sheet isOpen={true} onClose={vi.fn()} title="My Title" />);
    const dialog = screen.getByRole('dialog');
    const labelledBy = dialog.getAttribute('aria-labelledby');
    expect(labelledBy).toBeTruthy();
    expect(document.getElementById(labelledBy!)).toHaveTextContent('My Title');
  });

  it('passes axe when open', async () => {
    const { container } = render(
      <Sheet isOpen={true} onClose={vi.fn()} title="Accessible Sheet">
        <p>Content</p>
      </Sheet>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
