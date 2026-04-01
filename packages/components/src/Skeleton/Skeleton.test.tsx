import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Skeleton } from './Skeleton';

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('Skeleton — rendering', () => {
  it('renders without crashing', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders a <span> element', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild?.nodeName).toBe('SPAN');
  });

  it('applies the arch-skeleton base class', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass('arch-skeleton');
  });

  it('applies a custom className', () => {
    const { container } = render(<Skeleton className="my-skeleton" />);
    expect(container.firstChild).toHaveClass('my-skeleton');
  });

  it('forwards ref to the span element', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Skeleton ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('SPAN');
  });
});

/* ─── Variants ───────────────────────────────────────────────────────────────── */

describe('Skeleton — variants', () => {
  it('applies arch-skeleton--text class by default', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass('arch-skeleton--text');
  });

  it('applies arch-skeleton--text when variant="text"', () => {
    const { container } = render(<Skeleton variant="text" />);
    expect(container.firstChild).toHaveClass('arch-skeleton--text');
  });

  it('applies arch-skeleton--circular when variant="circular"', () => {
    const { container } = render(<Skeleton variant="circular" />);
    expect(container.firstChild).toHaveClass('arch-skeleton--circular');
  });

  it('applies arch-skeleton--rectangular when variant="rectangular"', () => {
    const { container } = render(<Skeleton variant="rectangular" />);
    expect(container.firstChild).toHaveClass('arch-skeleton--rectangular');
  });
});

/* ─── Animation ──────────────────────────────────────────────────────────────── */

describe('Skeleton — animation', () => {
  it('applies arch-skeleton--animated class by default', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass('arch-skeleton--animated');
  });

  it('applies arch-skeleton--animated when animated=true', () => {
    const { container } = render(<Skeleton animated />);
    expect(container.firstChild).toHaveClass('arch-skeleton--animated');
  });

  it('does NOT apply arch-skeleton--animated when animated=false', () => {
    const { container } = render(<Skeleton animated={false} />);
    expect(container.firstChild).not.toHaveClass('arch-skeleton--animated');
  });
});

/* ─── Dimensions ─────────────────────────────────────────────────────────────── */

describe('Skeleton — dimensions', () => {
  it('applies inline width style when width prop is provided', () => {
    const { container } = render(<Skeleton width="200px" />);
    expect(container.firstChild).toHaveStyle({ inlineSize: '200px' });
  });

  it('applies block height style when height prop is provided', () => {
    const { container } = render(<Skeleton height="80px" />);
    expect(container.firstChild).toHaveStyle({ blockSize: '80px' });
  });

  it('mirrors width to height for circular variant when height is omitted', () => {
    const { container } = render(<Skeleton variant="circular" width="48px" />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.inlineSize).toBe('48px');
    expect(el.style.blockSize).toBe('48px');
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('Skeleton — accessibility', () => {
  it('has aria-hidden="true"', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('passes axe for text variant', async () => {
    const { container } = render(<Skeleton variant="text" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe for circular variant', async () => {
    const { container } = render(<Skeleton variant="circular" width="40px" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe for rectangular variant', async () => {
    const { container } = render(<Skeleton variant="rectangular" width="100%" height="120px" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe when animated=false', async () => {
    const { container } = render(<Skeleton animated={false} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
