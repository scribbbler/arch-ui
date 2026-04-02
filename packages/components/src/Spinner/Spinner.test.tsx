import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Spinner } from './Spinner';

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('Spinner — rendering', () => {
  it('renders without crashing', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('applies the arch-spinner base class', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toHaveClass('arch-spinner');
  });

  it('applies a custom className', () => {
    render(<Spinner className="my-spinner" />);
    expect(screen.getByRole('status')).toHaveClass('my-spinner');
  });

  it('forwards ref to the span element', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Spinner ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('SPAN');
  });
});

/* ─── Sizes ──────────────────────────────────────────────────────────────────── */

describe('Spinner — sizes', () => {
  it('applies arch-spinner--md class by default', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toHaveClass('arch-spinner--md');
  });

  it('applies arch-spinner--xs class when size="xs"', () => {
    render(<Spinner size="xs" />);
    expect(screen.getByRole('status')).toHaveClass('arch-spinner--xs');
  });

  it('applies arch-spinner--sm class when size="sm"', () => {
    render(<Spinner size="sm" />);
    expect(screen.getByRole('status')).toHaveClass('arch-spinner--sm');
  });

  it('applies arch-spinner--lg class when size="lg"', () => {
    render(<Spinner size="lg" />);
    expect(screen.getByRole('status')).toHaveClass('arch-spinner--lg');
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('Spinner — accessibility', () => {
  it('has role="status"', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has default aria-label "Loading"', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading');
  });

  it('accepts a custom aria-label', () => {
    render(<Spinner aria-label="Saving changes" />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Saving changes');
  });

  it('passes axe with default props', async () => {
    const { container } = render(<Spinner />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe with custom aria-label', async () => {
    const { container } = render(<Spinner aria-label="Uploading file" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('accepts a custom loading label via labels prop', () => {
    render(<Spinner labels={{ loading: 'Chargement' }} />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Chargement');
  });

  it('aria-label prop takes precedence over labels prop', () => {
    render(<Spinner aria-label="Saving" labels={{ loading: 'Chargement' }} />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Saving');
  });

  it('passes axe for every size', async () => {
    const sizes = ['xs', 'sm', 'md', 'lg'] as const;
    for (const size of sizes) {
      const { container, unmount } = render(<Spinner size={size} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      unmount();
    }
  });
});
