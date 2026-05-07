import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MapMarker } from './MapMarker';

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('MapMarker — rendering', () => {
  it('renders without crashing', () => {
    render(<MapMarker />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('renders with a label', () => {
    render(<MapMarker label="HQ" />);
    expect(screen.getByText('HQ')).toBeInTheDocument();
  });

  it('renders the pin structure', () => {
    const { container } = render(<MapMarker label="Test" />);
    expect(container.querySelector('.arch-map-marker__pin')).toBeInTheDocument();
    expect(container.querySelector('.arch-map-marker__head')).toBeInTheDocument();
    expect(container.querySelector('.arch-map-marker__tail')).toBeInTheDocument();
    expect(container.querySelector('.arch-map-marker__label')).toBeInTheDocument();
  });

  it('applies a custom className', () => {
    const { container } = render(<MapMarker className="my-marker" />);
    expect(container.querySelector('.arch-map-marker')).toHaveClass('arch-map-marker', 'my-marker');
  });
});

/* ─── Sizes ──────────────────────────────────────────────────────────────────── */

describe('MapMarker — sizes', () => {
  const sizes = ['sm', 'md', 'lg'] as const;

  sizes.forEach((size) => {
    it(`applies the "${size}" size class`, () => {
      const { container } = render(<MapMarker size={size} />);
      expect(container.querySelector('.arch-map-marker')).toHaveClass(`arch-map-marker--${size}`);
    });
  });

  it('defaults to size="md"', () => {
    const { container } = render(<MapMarker />);
    expect(container.querySelector('.arch-map-marker')).toHaveClass('arch-map-marker--md');
  });
});

/* ─── Variants ───────────────────────────────────────────────────────────────── */

describe('MapMarker — variants', () => {
  const variants = ['default', 'active', 'muted'] as const;

  variants.forEach((variant) => {
    it(`applies the "${variant}" variant class`, () => {
      const { container } = render(<MapMarker variant={variant} />);
      expect(container.querySelector('.arch-map-marker')).toHaveClass(`arch-map-marker--${variant}`);
    });
  });

  it('defaults to variant="default"', () => {
    const { container } = render(<MapMarker />);
    expect(container.querySelector('.arch-map-marker')).toHaveClass('arch-map-marker--default');
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('MapMarker — accessibility', () => {
  it('sets aria-label from label prop', () => {
    render(<MapMarker label="Office" />);
    expect(screen.getByRole('img')).toHaveAttribute('aria-label', 'Office');
  });

  it('defaults aria-label to "Map marker" when no label', () => {
    render(<MapMarker />);
    expect(screen.getByRole('img')).toHaveAttribute('aria-label', 'Map marker');
  });

  it('hides the tail from assistive technology', () => {
    const { container } = render(<MapMarker />);
    expect(container.querySelector('.arch-map-marker__tail')).toHaveAttribute('aria-hidden', 'true');
  });
});

/* ─── forwardRef ─────────────────────────────────────────────────────────────── */

describe('MapMarker — forwardRef', () => {
  it('forwards a ref to the root div', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<MapMarker ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });
});
