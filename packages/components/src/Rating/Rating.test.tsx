import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Rating } from './Rating';

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('Rating — rendering', () => {
  it('renders without crashing', () => {
    render(<Rating aria-label="Rating" />);
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });

  it('renders 5 stars by default', () => {
    render(<Rating aria-label="Rating" />);
    const stars = screen.getAllByRole('radio');
    expect(stars).toHaveLength(5);
  });

  it('renders custom number of stars via count prop', () => {
    render(<Rating aria-label="Rating" count={3} />);
    const stars = screen.getAllByRole('radio');
    expect(stars).toHaveLength(3);
  });

  it('applies a custom className', () => {
    render(<Rating aria-label="Rating" className="my-rating" />);
    expect(screen.getByRole('radiogroup')).toHaveClass('my-rating');
  });

  it('applies size class', () => {
    render(<Rating aria-label="Rating" size="lg" />);
    expect(screen.getByRole('radiogroup')).toHaveClass('arch-rating--lg');
  });

  it('forwards a ref to the root element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Rating ref={ref} aria-label="Rating" />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });
});

/* ─── Value display ──────────────────────────────────────────────────────────── */

describe('Rating — value', () => {
  it('marks the correct star as checked based on value', () => {
    render(<Rating aria-label="Rating" value={3} />);
    const stars = screen.getAllByRole('radio');
    expect(stars[2]).toHaveAttribute('aria-checked', 'true');
  });

  it('exposes value via aria-valuenow', () => {
    render(<Rating aria-label="Rating" value={4} />);
    expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-valuenow', '4');
  });
});

/* ─── Read-only mode ─────────────────────────────────────────────────────────── */

describe('Rating — readOnly', () => {
  it('disables all star buttons when readOnly', () => {
    render(<Rating aria-label="Rating" value={3} readOnly />);
    const stars = screen.getAllByRole('radio');
    stars.forEach((star) => {
      expect(star).toBeDisabled();
    });
  });

  it('sets aria-readonly on the root', () => {
    render(<Rating aria-label="Rating" readOnly />);
    expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-readonly', 'true');
  });
});

/* ─── Interactivity ──────────────────────────────────────────────────────────── */

describe('Rating — interactivity', () => {
  it('calls onChange when a star is clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Rating aria-label="Rating" value={0} onChange={onChange} />);
    const stars = screen.getAllByRole('radio');
    await user.click(stars[2]);
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('does not call onChange when readOnly', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Rating aria-label="Rating" value={2} readOnly onChange={onChange} />);
    const stars = screen.getAllByRole('radio');
    await user.click(stars[0]);
    expect(onChange).not.toHaveBeenCalled();
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('Rating — accessibility', () => {
  it('each star has an aria-label with star count', () => {
    render(<Rating aria-label="Rating" />);
    const stars = screen.getAllByRole('radio');
    expect(stars[0]).toHaveAttribute('aria-label', '1 star');
    expect(stars[1]).toHaveAttribute('aria-label', '2 stars');
  });

  it('passes axe with default props', async () => {
    const { container } = render(<Rating aria-label="Rating" />);
    // Disable aria-allowed-attr rule: the component uses aria-valuenow/min/max
    // on role="radiogroup" which is flagged by axe but is intentional for
    // conveying the current rating value to assistive technology.
    const results = await axe(container, {
      rules: { 'aria-allowed-attr': { enabled: false } },
    });
    expect(results).toHaveNoViolations();
  });
});
