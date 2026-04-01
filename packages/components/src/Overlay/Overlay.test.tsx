import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Overlay } from './Overlay';

/* ─── Overlay — rendering ────────────────────────────────────────────────────── */

describe('Overlay — rendering', () => {
  it('renders a div with aria-hidden', () => {
    const { container } = render(<Overlay />);
    const el = container.firstChild as HTMLElement;
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies the arch-overlay class', () => {
    const { container } = render(<Overlay />);
    expect(container.firstChild).toHaveClass('arch-overlay');
  });

  it('does NOT apply the transparent class by default', () => {
    const { container } = render(<Overlay />);
    expect(container.firstChild).not.toHaveClass('arch-overlay--transparent');
  });

  it('applies the transparent class when transparent=true', () => {
    const { container } = render(<Overlay transparent />);
    expect(container.firstChild).toHaveClass('arch-overlay--transparent');
  });

  it('applies a custom className', () => {
    const { container } = render(<Overlay className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('forwards a ref to the div element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Overlay ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });
});

/* ─── Overlay — onClick ──────────────────────────────────────────────────────── */

describe('Overlay — onClick', () => {
  it('fires onClick when the backdrop is clicked', async () => {
    const user = userEvent.setup();
    const handler = vi.fn();
    const { container } = render(<Overlay onClick={handler} />);
    await user.click(container.firstChild as HTMLElement);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('does not throw when onClick is not provided and backdrop is clicked', async () => {
    const user = userEvent.setup();
    const { container } = render(<Overlay />);
    await expect(user.click(container.firstChild as HTMLElement)).resolves.toBeUndefined();
  });
});

/* ─── Overlay — accessibility ────────────────────────────────────────────────── */

describe('Overlay — accessibility', () => {
  it('passes axe with default props', async () => {
    const { container } = render(<Overlay />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe with transparent variant', async () => {
    const { container } = render(<Overlay transparent />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
