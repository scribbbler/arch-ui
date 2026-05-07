import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Toast, ToastProvider, useToast } from './Toast';

/* ─── Helpers ────────────────────────────────────────────────────────────────── */

/** Renders a component that can trigger toasts for testing. */
function ToastTrigger({
  variant = 'default' as const,
  duration = 5000,
  title = 'Test toast',
  description,
}: {
  variant?: 'default' | 'success' | 'warning' | 'danger';
  duration?: number;
  title?: string;
  description?: string;
}) {
  const { toast } = useToast();
  return (
    <button
      type="button"
      onClick={() => toast({ title, description, variant, duration })}
    >
      Add toast
    </button>
  );
}

/* ─── Individual Toast ───────────────────────────────────────────────────────── */

describe('Toast — individual component', () => {
  it('renders title', () => {
    render(<Toast title="Hello" onClose={vi.fn()} />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<Toast title="T" description="Details here." onClose={vi.fn()} />);
    expect(screen.getByText('Details here.')).toBeInTheDocument();
  });

  it('renders a close button', () => {
    render(<Toast title="T" onClose={vi.fn()} />);
    expect(
      screen.getByRole('button', { name: 'Close' })
    ).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    vi.useFakeTimers();
    const handler = vi.fn();
    render(<Toast title="T" onClose={handler} duration={0} />);
    const btn = screen.getByRole('button', { name: 'Close' });
    await act(async () => { btn.click(); });
    act(() => { vi.advanceTimersByTime(300); });
    expect(handler).toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Toast ref={ref} title="T" onClose={vi.fn()} duration={0} />);
    expect(ref.current).not.toBeNull();
  });
});

/* ─── aria-live per variant ──────────────────────────────────────────────────── */

describe('Toast — aria-live per variant', () => {
  it('uses aria-live="polite" for default variant', () => {
    render(<Toast title="T" onClose={vi.fn()} duration={0} />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
  });

  it('uses aria-live="polite" for success variant', () => {
    render(<Toast title="T" variant="success" onClose={vi.fn()} duration={0} />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
  });

  it('uses aria-live="polite" for warning variant', () => {
    render(<Toast title="T" variant="warning" onClose={vi.fn()} duration={0} />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
  });

  it('uses aria-live="assertive" for danger variant', () => {
    render(<Toast title="T" variant="danger" onClose={vi.fn()} duration={0} />);
    expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'assertive');
  });
});

/* ─── useToast — adds toast ──────────────────────────────────────────────────── */

describe('useToast — adds toast', () => {
  it('adds a toast to the DOM when toast() is called', async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider>
        <ToastTrigger title="Imperative toast" />
      </ToastProvider>
    );
    await user.click(screen.getByRole('button', { name: 'Add toast' }));
    expect(screen.getByText('Imperative toast')).toBeInTheDocument();
  });

  it('adds multiple toasts', async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider>
        <ToastTrigger title="Notification" />
      </ToastProvider>
    );
    await user.click(screen.getByRole('button', { name: 'Add toast' }));
    await user.click(screen.getByRole('button', { name: 'Add toast' }));
    expect(screen.getAllByText('Notification')).toHaveLength(2);
  });

  it('renders description when provided', async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider>
        <ToastTrigger title="T" description="Extra detail" />
      </ToastProvider>
    );
    await user.click(screen.getByRole('button', { name: 'Add toast' }));
    expect(screen.getByText('Extra detail')).toBeInTheDocument();
  });
});

/* ─── Auto-dismiss ───────────────────────────────────────────────────────────── */

describe('useToast — auto-dismiss', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('removes the toast after the duration elapses', async () => {
    render(
      <ToastProvider>
        <ToastTrigger title="Auto dismiss" duration={1000} />
      </ToastProvider>
    );
    const btn = screen.getByRole('button', { name: 'Add toast' });
    await act(async () => { btn.click(); });
    expect(screen.getByText('Auto dismiss')).toBeInTheDocument();

    act(() => { vi.advanceTimersByTime(1500); });

    expect(screen.queryByText('Auto dismiss')).not.toBeInTheDocument();
  });

  it('does not auto-dismiss when duration=0', async () => {
    render(
      <ToastProvider>
        <ToastTrigger title="Persistent" duration={0} />
      </ToastProvider>
    );
    const btn = screen.getByRole('button', { name: 'Add toast' });
    await act(async () => { btn.click(); });

    act(() => { vi.advanceTimersByTime(30000); });

    expect(screen.getByText('Persistent')).toBeInTheDocument();
  });
});

/* ─── useToast — throws without provider ────────────────────────────────────── */

describe('useToast — error without provider', () => {
  it('throws when used outside ToastProvider', () => {
    function Broken() {
      useToast();
      return null;
    }

    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Broken />)).toThrow(
      'useToast must be used within a ToastProvider'
    );
    spy.mockRestore();
  });
});

/* ─── Labels (i18n) ─────────────────────────────────────────────────────────── */

describe('Toast — labels (i18n)', () => {
  it('uses default dismiss label', () => {
    render(<Toast title="T" onClose={vi.fn()} duration={0} />);
    expect(
      screen.getByRole('button', { name: 'Close' })
    ).toBeInTheDocument();
  });

  it('accepts a custom dismiss label', () => {
    render(
      <Toast
        title="T"
        onClose={vi.fn()}
        duration={0}
        labels={{ dismiss: 'Ignorer' }}
      />
    );
    expect(
      screen.getByRole('button', { name: 'Ignorer' })
    ).toBeInTheDocument();
  });

  it('accepts a custom notifications label on ToastProvider', async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider labels={{ notifications: 'Avis' }}>
        <ToastTrigger title="T" />
      </ToastProvider>
    );
    await user.click(screen.getByRole('button', { name: 'Add toast' }));
    const container = document.querySelector('[aria-label="Avis"]');
    expect(container).toBeInTheDocument();
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('Toast — accessibility', () => {
  it('passes axe for default variant', async () => {
    const { container } = render(
      <Toast title="Notification" onClose={vi.fn()} duration={0} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe for success variant', async () => {
    const { container } = render(
      <Toast title="Saved" variant="success" onClose={vi.fn()} duration={0} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe for warning variant', async () => {
    const { container } = render(
      <Toast title="Caution" variant="warning" onClose={vi.fn()} duration={0} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe for danger variant', async () => {
    const { container } = render(
      <Toast title="Error occurred" variant="danger" onClose={vi.fn()} duration={0} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe for Toast with description', async () => {
    const { container } = render(
      <Toast
        title="Saved"
        description="Your changes have been saved."
        variant="success"
        onClose={vi.fn()}
        duration={0}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
