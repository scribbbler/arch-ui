import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Snackbar, SnackbarProvider, useSnackbar } from './Snackbar';

/* ─── Snackbar (standalone) — rendering ──────────────────────────────────────── */

describe('Snackbar — rendering', () => {
  it('renders without crashing', () => {
    render(<Snackbar message="Hello" onClose={vi.fn()} autoHideDuration={0} />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('renders the message text', () => {
    render(<Snackbar message="Item saved" onClose={vi.fn()} autoHideDuration={0} />);
    expect(screen.getByText('Item saved')).toBeInTheDocument();
  });

  it('renders action button when actionLabel and onAction provided', () => {
    const onAction = vi.fn();
    render(
      <Snackbar
        message="Deleted"
        actionLabel="Undo"
        onAction={onAction}
        onClose={vi.fn()}
        autoHideDuration={0}
      />
    );
    expect(screen.getByText('Undo')).toBeInTheDocument();
  });

  it('does not render action button when actionLabel is absent', () => {
    render(<Snackbar message="Hello" onClose={vi.fn()} autoHideDuration={0} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('applies variant class for error', () => {
    const { container } = render(
      <Snackbar message="Error" variant="error" onClose={vi.fn()} autoHideDuration={0} />
    );
    expect(container.firstChild).toHaveClass('arch-snackbar--error');
  });

  it('applies variant class for success', () => {
    const { container } = render(
      <Snackbar message="Done" variant="success" onClose={vi.fn()} autoHideDuration={0} />
    );
    expect(container.firstChild).toHaveClass('arch-snackbar--success');
  });

  it('uses role="alert" for error variant', () => {
    render(<Snackbar message="Err" variant="error" onClose={vi.fn()} autoHideDuration={0} />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('uses role="status" for default variant', () => {
    render(<Snackbar message="Info" onClose={vi.fn()} autoHideDuration={0} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('applies a custom className', () => {
    const { container } = render(
      <Snackbar message="Hi" onClose={vi.fn()} autoHideDuration={0} className="custom" />
    );
    expect(container.firstChild).toHaveClass('custom');
  });

  it('forwards a ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Snackbar ref={ref} message="Hi" onClose={vi.fn()} autoHideDuration={0} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });
});

/* ─── SnackbarProvider + useSnackbar ─────────────────────────────────────────── */

function TestConsumer() {
  const { snackbar } = useSnackbar();
  return (
    <button onClick={() => snackbar({ message: 'Hook message', autoHideDuration: 0 })}>
      Show
    </button>
  );
}

describe('SnackbarProvider + useSnackbar', () => {
  it('renders children without issue', () => {
    render(
      <SnackbarProvider>
        <div>App Content</div>
      </SnackbarProvider>
    );
    expect(screen.getByText('App Content')).toBeInTheDocument();
  });

  it('shows a snackbar via useSnackbar hook', async () => {
    const user = userEvent.setup();
    render(
      <SnackbarProvider>
        <TestConsumer />
      </SnackbarProvider>
    );
    await user.click(screen.getByText('Show'));
    expect(screen.getByText('Hook message')).toBeInTheDocument();
  });

  it('throws if useSnackbar is used outside provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<TestConsumer />)).toThrow(
      'useSnackbar must be used within a SnackbarProvider'
    );
    spy.mockRestore();
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('Snackbar — accessibility', () => {
  it('has aria-live polite for default variant', () => {
    render(<Snackbar message="Info" onClose={vi.fn()} autoHideDuration={0} />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
  });

  it('has aria-live assertive for error variant', () => {
    render(<Snackbar message="Err" variant="error" onClose={vi.fn()} autoHideDuration={0} />);
    expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'assertive');
  });

  it('passes axe', async () => {
    const { container } = render(
      <Snackbar message="Accessible snackbar" onClose={vi.fn()} autoHideDuration={0} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
