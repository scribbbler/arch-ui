import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { ProgressBar } from './ProgressBar';

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('ProgressBar — rendering', () => {
  it('renders without crashing', () => {
    render(<ProgressBar label="Progress" />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('applies the arch-progressbar base class', () => {
    render(<ProgressBar label="Progress" />);
    expect(screen.getByRole('progressbar')).toHaveClass('arch-progressbar');
  });

  it('applies a custom className', () => {
    render(<ProgressBar label="Progress" className="my-bar" />);
    expect(screen.getByRole('progressbar')).toHaveClass('my-bar');
  });

  it('forwards ref to the div element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<ProgressBar ref={ref} label="Progress" />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });
});

/* ─── Value and width ────────────────────────────────────────────────────────── */

describe('ProgressBar — value', () => {
  it('sets --arch-progress-value CSS custom property from value prop', () => {
    render(<ProgressBar value={60} label="Progress" />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveStyle({ '--arch-progress-value': '60%' });
  });

  it('sets aria-valuenow to the provided value', () => {
    render(<ProgressBar value={75} label="Progress" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '75');
  });

  it('clamps value to 0 when below 0', () => {
    render(<ProgressBar value={-10} label="Progress" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
  });

  it('clamps value to 100 when above 100', () => {
    render(<ProgressBar value={150} label="Progress" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
  });

  it('defaults to value=0 when no value prop is given', () => {
    render(<ProgressBar label="Progress" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
  });
});

/* ─── Indeterminate ──────────────────────────────────────────────────────────── */

describe('ProgressBar — indeterminate', () => {
  it('applies arch-progressbar--indeterminate class when indeterminate=true', () => {
    render(<ProgressBar indeterminate label="Loading" />);
    expect(screen.getByRole('progressbar')).toHaveClass('arch-progressbar--indeterminate');
  });

  it('does NOT apply indeterminate class when indeterminate=false', () => {
    render(<ProgressBar label="Progress" />);
    expect(screen.getByRole('progressbar')).not.toHaveClass('arch-progressbar--indeterminate');
  });

  it('omits aria-valuenow when indeterminate=true', () => {
    render(<ProgressBar indeterminate label="Loading" />);
    expect(screen.getByRole('progressbar')).not.toHaveAttribute('aria-valuenow');
  });
});

/* ─── Sizes ──────────────────────────────────────────────────────────────────── */

describe('ProgressBar — sizes', () => {
  it('applies arch-progressbar--md class by default', () => {
    render(<ProgressBar label="Progress" />);
    expect(screen.getByRole('progressbar')).toHaveClass('arch-progressbar--md');
  });

  it('applies arch-progressbar--sm class when size="sm"', () => {
    render(<ProgressBar size="sm" label="Progress" />);
    expect(screen.getByRole('progressbar')).toHaveClass('arch-progressbar--sm');
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('ProgressBar — accessibility', () => {
  it('has role="progressbar"', () => {
    render(<ProgressBar label="Progress" />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('has aria-valuemin=0', () => {
    render(<ProgressBar label="Progress" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemin', '0');
  });

  it('has aria-valuemax=100', () => {
    render(<ProgressBar label="Progress" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '100');
  });

  it('has aria-label set from the label prop', () => {
    render(<ProgressBar label="Upload progress" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-label', 'Upload progress');
  });

  it('passes axe for determinate bar', async () => {
    const { container } = render(<ProgressBar value={50} label="File upload" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe for indeterminate bar', async () => {
    const { container } = render(<ProgressBar indeterminate label="Loading content" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe for sm size', async () => {
    const { container } = render(<ProgressBar size="sm" value={30} label="Download" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
