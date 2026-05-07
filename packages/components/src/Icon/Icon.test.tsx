import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Icon } from './Icon';

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('Icon — rendering', () => {
  it('renders without crashing', () => {
    const { container } = render(<Icon><svg data-testid="svg" /></Icon>);
    expect(container.querySelector('.arch-icon')).toBeInTheDocument();
  });

  it('renders children (SVG)', () => {
    render(<Icon><svg data-testid="svg" /></Icon>);
    expect(screen.getByTestId('svg')).toBeInTheDocument();
  });

  it('renders a <span> element', () => {
    const { container } = render(<Icon><svg /></Icon>);
    expect(container.querySelector('.arch-icon')?.tagName).toBe('SPAN');
  });

  it('applies a custom className', () => {
    const { container } = render(<Icon className="my-icon"><svg /></Icon>);
    expect(container.querySelector('.arch-icon')).toHaveClass('arch-icon', 'my-icon');
  });
});

/* ─── Sizes ──────────────────────────────────────────────────────────────────── */

describe('Icon — sizes', () => {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

  sizes.forEach((size) => {
    it(`applies the "${size}" size class`, () => {
      const { container } = render(<Icon size={size}><svg /></Icon>);
      expect(container.querySelector('.arch-icon')).toHaveClass(`arch-icon--${size}`);
    });
  });

  it('defaults to size="md"', () => {
    const { container } = render(<Icon><svg /></Icon>);
    expect(container.querySelector('.arch-icon')).toHaveClass('arch-icon--md');
  });
});

/* ─── Color ──────────────────────────────────────────────────────────────────── */

describe('Icon — color', () => {
  it('sets --arch-icon-color CSS variable when color is provided', () => {
    const { container } = render(<Icon color="color-text-default"><svg /></Icon>);
    const el = container.querySelector('.arch-icon') as HTMLElement;
    expect(el.style.getPropertyValue('--arch-icon-color')).toBe('var(--color-text-default)');
  });

  it('does not set style when color is not provided', () => {
    const { container } = render(<Icon><svg /></Icon>);
    const el = container.querySelector('.arch-icon') as HTMLElement;
    expect(el.getAttribute('style')).toBeNull();
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('Icon — accessibility', () => {
  it('sets role="img" and aria-label when title is provided', () => {
    render(<Icon title="Search"><svg /></Icon>);
    const icon = screen.getByRole('img', { name: 'Search' });
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('aria-label', 'Search');
  });

  it('sets role="presentation" and aria-hidden when no title', () => {
    const { container } = render(<Icon><svg /></Icon>);
    const icon = container.querySelector('.arch-icon');
    expect(icon).toHaveAttribute('role', 'presentation');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  it('does not set aria-hidden when title is provided', () => {
    render(<Icon title="Close"><svg /></Icon>);
    const icon = screen.getByRole('img', { name: 'Close' });
    expect(icon).not.toHaveAttribute('aria-hidden');
  });
});

/* ─── forwardRef ─────────────────────────────────────────────────────────────── */

describe('Icon — forwardRef', () => {
  it('forwards a ref to the span element', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Icon ref={ref}><svg /></Icon>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('SPAN');
  });
});
