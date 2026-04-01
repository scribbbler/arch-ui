import React from 'react';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Button } from './Button';

/* ─── Setup ──────────────────────────────────────────────────────────────────── */

beforeAll(() => {
  /**
   * CSS custom properties are not resolved in jsdom, so transitions and token-
   * driven styles will not render. The tests focus on accessible structure,
   * class names, and behaviour.
   */
});

/* ─── Render ─────────────────────────────────────────────────────────────────── */

describe('Button — rendering', () => {
  it('renders without crashing with default props', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('renders a <button> element by default', () => {
    render(<Button>Click me</Button>);
    const el = screen.getByRole('button', { name: 'Click me' });
    expect(el.tagName).toBe('BUTTON');
  });

  it('renders as a different element when `as` prop is provided', () => {
    render(
      <Button as="a" href="/test">
        Link button
      </Button>
    );
    const el = screen.getByRole('link', { name: 'Link button' });
    expect(el.tagName).toBe('A');
    expect(el).toHaveAttribute('href', '/test');
  });

  it('has type="button" by default', () => {
    render(<Button>Submit</Button>);
    expect(screen.getByRole('button', { name: 'Submit' })).toHaveAttribute('type', 'button');
  });

  it('applies a custom className', () => {
    render(<Button className="my-class">Label</Button>);
    expect(screen.getByRole('button', { name: 'Label' })).toHaveClass('my-class');
  });

  it('renders leftIcon and rightIcon', () => {
    render(
      <Button leftIcon={<svg data-testid="left-icon" />} rightIcon={<svg data-testid="right-icon" />}>
        With icons
      </Button>
    );
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('applies fullWidth class when fullWidth is true', () => {
    render(<Button fullWidth>Full</Button>);
    expect(screen.getByRole('button', { name: 'Full' })).toHaveClass('arch-button--full-width');
  });

  it('forwards a ref to the underlying element', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref button</Button>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('BUTTON');
  });
});

/* ─── Variants ───────────────────────────────────────────────────────────────── */

describe('Button — variants', () => {
  const variants = ['primary', 'secondary', 'ghost', 'destructive', 'link'] as const;

  variants.forEach((variant) => {
    it(`renders variant="${variant}" with the correct class`, () => {
      render(<Button variant={variant}>{variant}</Button>);
      const el = screen.getByRole('button', { name: variant });
      expect(el).toHaveClass(`arch-button--${variant}`);
    });
  });

  it('defaults to variant="primary"', () => {
    render(<Button>Default</Button>);
    expect(screen.getByRole('button', { name: 'Default' })).toHaveClass('arch-button--primary');
  });
});

/* ─── Sizes ──────────────────────────────────────────────────────────────────── */

describe('Button — sizes', () => {
  const sizes = ['sm', 'md', 'lg'] as const;

  sizes.forEach((size) => {
    it(`renders size="${size}" with the correct class`, () => {
      render(<Button size={size}>{size}</Button>);
      const el = screen.getByRole('button', { name: size });
      expect(el).toHaveClass(`arch-button--${size}`);
    });
  });

  it('defaults to size="md"', () => {
    render(<Button>Default</Button>);
    expect(screen.getByRole('button', { name: 'Default' })).toHaveClass('arch-button--md');
  });
});

/* ─── Click handling ─────────────────────────────────────────────────────────── */

describe('Button — click handling', () => {
  it('fires onClick when clicked', async () => {
    const user = userEvent.setup();
    const handler = vi.fn();
    render(<Button onClick={handler}>Click me</Button>);
    await user.click(screen.getByRole('button', { name: 'Click me' }));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('does NOT fire onClick when disabled', async () => {
    const user = userEvent.setup();
    const handler = vi.fn();
    render(
      <Button disabled onClick={handler}>
        Disabled
      </Button>
    );
    const btn = screen.getByRole('button', { name: 'Disabled' });
    // Disabled native buttons are not interactable
    await user.click(btn).catch(() => {
      /* userEvent may throw on disabled — swallow */
    });
    expect(handler).not.toHaveBeenCalled();
  });

  it('does NOT fire onClick when loading', async () => {
    const user = userEvent.setup();
    const handler = vi.fn();
    render(
      <Button loading onClick={handler}>
        Save
      </Button>
    );
    const btn = screen.getByRole('button');
    await user.click(btn).catch(() => {
      /* swallow */
    });
    expect(handler).not.toHaveBeenCalled();
  });
});

/* ─── Disabled state ─────────────────────────────────────────────────────────── */

describe('Button — disabled state', () => {
  it('has the disabled attribute when disabled=true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button', { name: 'Disabled' })).toBeDisabled();
  });

  it('is not disabled when disabled=false', () => {
    render(<Button disabled={false}>Active</Button>);
    expect(screen.getByRole('button', { name: 'Active' })).not.toBeDisabled();
  });
});

/* ─── Loading state ──────────────────────────────────────────────────────────── */

describe('Button — loading state', () => {
  it('disables the button when loading', () => {
    render(<Button loading>Save</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('sets aria-busy when loading', () => {
    render(<Button loading>Save</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });

  it('shows loadingText when provided', () => {
    render(
      <Button loading loadingText="Saving…">
        Save
      </Button>
    );
    expect(screen.getByText('Saving…')).toBeInTheDocument();
  });

  it('applies the loading class when loading', () => {
    render(<Button loading>Save</Button>);
    expect(screen.getByRole('button')).toHaveClass('arch-button--loading');
  });

  it('renders the spinner element when loading', () => {
    render(<Button loading>Save</Button>);
    expect(
      screen.getByRole('button').querySelector('.arch-button__spinner')
    ).toBeInTheDocument();
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('Button — accessibility', () => {
  it('passes axe with default props', async () => {
    const { container } = render(<Button>Accessible button</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe in disabled state', async () => {
    const { container } = render(<Button disabled>Disabled button</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe in loading state with loadingText', async () => {
    const { container } = render(
      <Button loading loadingText="Loading…">
        Submit
      </Button>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe for the destructive variant', async () => {
    const { container } = render(
      <Button variant="destructive">Delete item</Button>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe for the link variant', async () => {
    const { container } = render(<Button variant="link">More info</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
