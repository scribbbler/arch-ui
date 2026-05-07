import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dialog } from './Dialog';

afterEach(() => {
  document.body.style.overflow = '';
});

const defaultProps = {
  isOpen: true,
  onClose: vi.fn(),
  onConfirm: vi.fn(),
  title: 'Delete item?',
};

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('Dialog — rendering', () => {
  it('renders when isOpen is true', () => {
    render(<Dialog {...defaultProps} />);
    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(<Dialog {...defaultProps} isOpen={false} />);
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
  });

  it('renders the title', () => {
    render(<Dialog {...defaultProps} />);
    expect(screen.getByText('Delete item?')).toBeInTheDocument();
  });

  it('renders children as body content', () => {
    render(<Dialog {...defaultProps}>This action cannot be undone.</Dialog>);
    expect(screen.getByText('This action cannot be undone.')).toBeInTheDocument();
  });

  it('renders confirm button with default label', () => {
    render(<Dialog {...defaultProps} />);
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });

  it('renders cancel button with default label', () => {
    render(<Dialog {...defaultProps} />);
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('renders custom confirm and cancel labels', () => {
    render(<Dialog {...defaultProps} confirmLabel="Delete" cancelLabel="Keep" />);
    expect(screen.getByText('Delete')).toBeInTheDocument();
    expect(screen.getByText('Keep')).toBeInTheDocument();
  });

  it('applies a custom className', () => {
    render(<Dialog {...defaultProps} className="custom" />);
    expect(screen.getByRole('alertdialog')).toHaveClass('custom');
  });

  it('forwards a ref to the dialog element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Dialog ref={ref} {...defaultProps} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.getAttribute('role')).toBe('alertdialog');
  });
});

/* ─── Variants ───────────────────────────────────────────────────────────────── */

describe('Dialog — variants', () => {
  it('does not add variant class for default variant', () => {
    render(<Dialog {...defaultProps} />);
    expect(screen.getByRole('alertdialog')).not.toHaveClass('arch-dialog--danger');
  });

  it('applies danger variant class', () => {
    render(<Dialog {...defaultProps} variant="danger" />);
    expect(screen.getByRole('alertdialog')).toHaveClass('arch-dialog--danger');
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('Dialog — accessibility', () => {
  it('has role="alertdialog"', () => {
    render(<Dialog {...defaultProps} />);
    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
  });

  it('has aria-modal="true"', () => {
    render(<Dialog {...defaultProps} />);
    expect(screen.getByRole('alertdialog')).toHaveAttribute('aria-modal', 'true');
  });

  it('has aria-labelledby pointing to the title', () => {
    render(<Dialog {...defaultProps} />);
    const dialog = screen.getByRole('alertdialog');
    const labelledBy = dialog.getAttribute('aria-labelledby');
    expect(labelledBy).toBeTruthy();
    expect(document.getElementById(labelledBy!)).toHaveTextContent('Delete item?');
  });
});

/* ─── Interaction ────────────────────────────────────────────────────────────── */

describe('Dialog — interaction', () => {
  it('calls onClose when cancel button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Dialog {...defaultProps} onClose={onClose} />);

    await user.click(screen.getByText('Cancel'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onConfirm when confirm button is clicked', async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    render(<Dialog {...defaultProps} onConfirm={onConfirm} />);

    await user.click(screen.getByText('Confirm'));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape key is pressed', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Dialog {...defaultProps} onClose={onClose} />);

    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
