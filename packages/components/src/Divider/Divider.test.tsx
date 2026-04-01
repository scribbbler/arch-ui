import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Divider } from './Divider';

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('Divider — rendering', () => {
  it('renders without crashing', () => {
    render(<Divider />);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('renders an <hr> element by default', () => {
    render(<Divider />);
    expect(screen.getByRole('separator').tagName).toBe('HR');
  });

  it('applies a custom className', () => {
    render(<Divider className="custom" />);
    expect(screen.getByRole('separator')).toHaveClass('custom');
  });

  it('forwards a ref to the root element (horizontal)', () => {
    const ref = React.createRef<HTMLElement>();
    render(<Divider ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});

/* ─── Orientation ────────────────────────────────────────────────────────────── */

describe('Divider — orientation', () => {
  it('defaults to horizontal orientation', () => {
    render(<Divider />);
    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('applies horizontal class by default', () => {
    render(<Divider />);
    expect(screen.getByRole('separator')).toHaveClass('arch-divider--horizontal');
  });

  it('renders vertical orientation with correct class', () => {
    render(<Divider orientation="vertical" />);
    expect(screen.getByRole('separator')).toHaveClass('arch-divider--vertical');
  });

  it('sets aria-orientation="vertical" for vertical orientation', () => {
    render(<Divider orientation="vertical" />);
    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('renders an <hr> for vertical orientation', () => {
    render(<Divider orientation="vertical" />);
    expect(screen.getByRole('separator').tagName).toBe('HR');
  });
});

/* ─── Label ──────────────────────────────────────────────────────────────────── */

describe('Divider — label', () => {
  it('renders the label text when provided', () => {
    render(<Divider label="or" />);
    expect(screen.getByText('or')).toBeInTheDocument();
  });

  it('renders a <div> root when a label is present', () => {
    render(<Divider label="or" />);
    expect(screen.getByRole('separator').tagName).toBe('DIV');
  });

  it('still has role=separator when label is present', () => {
    render(<Divider label="or" />);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('applies the with-label modifier class when label is present', () => {
    render(<Divider label="or" />);
    expect(screen.getByRole('separator')).toHaveClass('arch-divider--with-label');
  });

  it('renders two line elements flanking the label', () => {
    const { container } = render(<Divider label="or" />);
    const lines = container.querySelectorAll('.arch-divider__line');
    expect(lines).toHaveLength(2);
  });

  it('does NOT render a label element when label prop is absent', () => {
    const { container } = render(<Divider />);
    expect(container.querySelector('.arch-divider__label')).not.toBeInTheDocument();
  });
});

/* ─── role=separator ─────────────────────────────────────────────────────────── */

describe('Divider — ARIA role', () => {
  it('has role=separator on horizontal divider', () => {
    render(<Divider />);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('has role=separator on vertical divider', () => {
    render(<Divider orientation="vertical" />);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('has role=separator when label is present', () => {
    render(<Divider label="Section" />);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('Divider — accessibility', () => {
  it('passes axe for horizontal divider', async () => {
    const { container } = render(<Divider />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe for vertical divider', async () => {
    const { container } = render(<Divider orientation="vertical" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe with label', async () => {
    const { container } = render(<Divider label="or" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
