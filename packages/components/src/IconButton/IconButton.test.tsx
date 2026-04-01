import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { IconButton } from './IconButton';

/* ─── Helpers ────────────────────────────────────────────────────────────────── */

const TestIcon = () => <svg data-testid="test-icon" aria-hidden="true" />;

/* ─── Render ─────────────────────────────────────────────────────────────────── */

describe('IconButton — rendering', () => {
  it('renders without crashing with required aria-label', () => {
    render(<IconButton aria-label="Close" icon={<TestIcon />} />);
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  it('renders a <button> element', () => {
    render(<IconButton aria-label="Delete" icon={<TestIcon />} />);
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Delete' }).tagName).toBe('BUTTON');
  });

  it('has type="button" by default', () => {
    render(<IconButton aria-label="Action" icon={<TestIcon />} />);
    expect(screen.getByRole('button', { name: 'Action' })).toHaveAttribute('type', 'button');
  });

  it('renders the icon', () => {
    render(<IconButton aria-label="Add" icon={<TestIcon />} />);
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('applies a custom className', () => {
    render(<IconButton aria-label="Action" icon={<TestIcon />} className="custom" />);
    expect(screen.getByRole('button', { name: 'Action' })).toHaveClass('custom');
  });

  it('forwards a ref to the button element', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<IconButton ref={ref} aria-label="Ref button" icon={<TestIcon />} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('BUTTON');
  });

  it('sets the aria-label attribute on the button', () => {
    render(<IconButton aria-label="Open menu" icon={<TestIcon />} />);
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute(
      'aria-label',
      'Open menu'
    );
  });
});

/* ─── aria-label requirement ─────────────────────────────────────────────────── */

describe('IconButton — aria-label requirement', () => {
  let consoleSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('logs a console error in development when aria-label is missing', () => {
    // @ts-expect-error — intentionally omitting required aria-label for test
    render(<IconButton icon={<TestIcon />} />);
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('aria-label')
    );
  });

  it('renders correctly when aria-label is provided', () => {
    render(<IconButton aria-label="Close dialog" icon={<TestIcon />} />);
    expect(screen.getByRole('button', { name: 'Close dialog' })).toBeInTheDocument();
    expect(consoleSpy).not.toHaveBeenCalled();
  });
});

/* ─── Variants ───────────────────────────────────────────────────────────────── */

describe('IconButton — variants', () => {
  const variants = ['primary', 'secondary', 'ghost', 'destructive', 'link'] as const;

  variants.forEach((variant) => {
    it(`renders variant="${variant}" with the correct class`, () => {
      render(
        <IconButton aria-label={`${variant} action`} variant={variant} icon={<TestIcon />} />
      );
      expect(
        screen.getByRole('button', { name: `${variant} action` })
      ).toHaveClass(`arch-icon-button--${variant}`);
    });
  });

  it('defaults to variant="primary"', () => {
    render(<IconButton aria-label="Default" icon={<TestIcon />} />);
    expect(screen.getByRole('button', { name: 'Default' })).toHaveClass(
      'arch-icon-button--primary'
    );
  });
});

/* ─── Sizes ──────────────────────────────────────────────────────────────────── */

describe('IconButton — sizes', () => {
  const sizes = ['sm', 'md', 'lg'] as const;

  sizes.forEach((size) => {
    it(`renders size="${size}" with the correct class`, () => {
      render(
        <IconButton aria-label={`${size} button`} size={size} icon={<TestIcon />} />
      );
      expect(
        screen.getByRole('button', { name: `${size} button` })
      ).toHaveClass(`arch-icon-button--${size}`);
    });
  });

  it('defaults to size="md"', () => {
    render(<IconButton aria-label="Default size" icon={<TestIcon />} />);
    expect(screen.getByRole('button', { name: 'Default size' })).toHaveClass(
      'arch-icon-button--md'
    );
  });
});

/* ─── Click handling ─────────────────────────────────────────────────────────── */

describe('IconButton — click handling', () => {
  it('fires onClick when clicked', async () => {
    const user = userEvent.setup();
    const handler = vi.fn();
    render(<IconButton aria-label="Action" icon={<TestIcon />} onClick={handler} />);
    await user.click(screen.getByRole('button', { name: 'Action' }));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('does NOT fire onClick when disabled', async () => {
    const user = userEvent.setup();
    const handler = vi.fn();
    render(
      <IconButton
        aria-label="Disabled action"
        icon={<TestIcon />}
        disabled
        onClick={handler}
      />
    );
    const btn = screen.getByRole('button', { name: 'Disabled action' });
    await user.click(btn).catch(() => {
      /* swallow userEvent error on disabled element */
    });
    expect(handler).not.toHaveBeenCalled();
  });

  it('does NOT fire onClick when loading', async () => {
    const user = userEvent.setup();
    const handler = vi.fn();
    render(
      <IconButton
        aria-label="Loading action"
        icon={<TestIcon />}
        loading
        onClick={handler}
      />
    );
    const btn = screen.getByRole('button', { name: 'Loading action' });
    await user.click(btn).catch(() => {
      /* swallow */
    });
    expect(handler).not.toHaveBeenCalled();
  });
});

/* ─── Disabled state ─────────────────────────────────────────────────────────── */

describe('IconButton — disabled state', () => {
  it('has the disabled attribute when disabled=true', () => {
    render(<IconButton aria-label="Disabled" icon={<TestIcon />} disabled />);
    expect(screen.getByRole('button', { name: 'Disabled' })).toBeDisabled();
  });

  it('is not disabled when disabled=false', () => {
    render(<IconButton aria-label="Active" icon={<TestIcon />} disabled={false} />);
    expect(screen.getByRole('button', { name: 'Active' })).not.toBeDisabled();
  });
});

/* ─── Loading state ──────────────────────────────────────────────────────────── */

describe('IconButton — loading state', () => {
  it('disables the button when loading', () => {
    render(<IconButton aria-label="Loading" icon={<TestIcon />} loading />);
    expect(screen.getByRole('button', { name: 'Loading' })).toBeDisabled();
  });

  it('sets aria-busy when loading', () => {
    render(<IconButton aria-label="Loading" icon={<TestIcon />} loading />);
    expect(screen.getByRole('button', { name: 'Loading' })).toHaveAttribute('aria-busy', 'true');
  });

  it('applies the loading class when loading', () => {
    render(<IconButton aria-label="Loading" icon={<TestIcon />} loading />);
    expect(screen.getByRole('button', { name: 'Loading' })).toHaveClass(
      'arch-icon-button--loading'
    );
  });

  it('renders the spinner and hides the icon when loading', () => {
    render(<IconButton aria-label="Loading" icon={<TestIcon />} loading />);
    const btn = screen.getByRole('button', { name: 'Loading' });
    expect(btn.querySelector('.arch-icon-button__spinner')).toBeInTheDocument();
    // Icon should not be visible when loading
    expect(screen.queryByTestId('test-icon')).not.toBeInTheDocument();
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('IconButton — accessibility', () => {
  it('passes axe with required aria-label', async () => {
    const { container } = render(
      <IconButton aria-label="Close dialog" icon={<TestIcon />} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe in disabled state', async () => {
    const { container } = render(
      <IconButton aria-label="Disabled action" icon={<TestIcon />} disabled />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe in loading state', async () => {
    const { container } = render(
      <IconButton aria-label="Loading action" icon={<TestIcon />} loading />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe for ghost variant', async () => {
    const { container } = render(
      <IconButton aria-label="Ghost action" icon={<TestIcon />} variant="ghost" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe for destructive variant', async () => {
    const { container } = render(
      <IconButton aria-label="Delete item" icon={<TestIcon />} variant="destructive" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
