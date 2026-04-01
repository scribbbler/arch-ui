import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Slider } from './Slider';

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('Slider — rendering', () => {
  it('renders without crashing', () => {
    render(<Slider aria-label="Volume" />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('renders an <input type="range"> element', () => {
    render(<Slider aria-label="Volume" />);
    const input = screen.getByRole('slider');
    expect(input.tagName).toBe('INPUT');
    expect(input).toHaveAttribute('type', 'range');
  });

  it('applies the arch-slider class', () => {
    render(<Slider aria-label="Volume" />);
    expect(screen.getByRole('slider')).toHaveClass('arch-slider');
  });

  it('applies custom className to the wrapper div', () => {
    const { container } = render(
      <Slider aria-label="Volume" className="custom-slider" />
    );
    expect(container.firstChild).toHaveClass('custom-slider');
  });

  it('forwards ref to the underlying input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Slider ref={ref} aria-label="Volume" />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('INPUT');
  });
});

/* ─── Value, min, max, step ──────────────────────────────────────────────────── */

describe('Slider — value and range props', () => {
  it('sets default min=0 when not provided', () => {
    render(<Slider aria-label="Volume" />);
    expect(screen.getByRole('slider')).toHaveAttribute('min', '0');
  });

  it('sets default max=100 when not provided', () => {
    render(<Slider aria-label="Volume" />);
    expect(screen.getByRole('slider')).toHaveAttribute('max', '100');
  });

  it('sets default step=1 when not provided', () => {
    render(<Slider aria-label="Volume" />);
    expect(screen.getByRole('slider')).toHaveAttribute('step', '1');
  });

  it('respects the min prop', () => {
    render(<Slider aria-label="Rating" min={1} max={5} />);
    expect(screen.getByRole('slider')).toHaveAttribute('min', '1');
  });

  it('respects the max prop', () => {
    render(<Slider aria-label="Rating" min={1} max={5} />);
    expect(screen.getByRole('slider')).toHaveAttribute('max', '5');
  });

  it('respects the step prop', () => {
    render(<Slider aria-label="Volume" step={5} />);
    expect(screen.getByRole('slider')).toHaveAttribute('step', '5');
  });

  it('sets the value attribute when value is provided', () => {
    render(
      <Slider aria-label="Volume" value={42} onChange={() => {}} />
    );
    expect(screen.getByRole('slider')).toHaveAttribute('value', '42');
  });

  it('exposes aria-valuenow via the native input', () => {
    render(
      <Slider aria-label="Volume" value={75} min={0} max={100} onChange={() => {}} />
    );
    const input = screen.getByRole('slider') as HTMLInputElement;
    expect(Number(input.value)).toBe(75);
  });
});

/* ─── Disabled state ─────────────────────────────────────────────────────────── */

describe('Slider — disabled state', () => {
  it('is disabled when disabled=true', () => {
    render(<Slider aria-label="Volume" disabled />);
    expect(screen.getByRole('slider')).toBeDisabled();
  });

  it('sets aria-disabled="true" when disabled', () => {
    render(<Slider aria-label="Volume" disabled />);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-disabled', 'true');
  });

  it('applies arch-slider--disabled class when disabled', () => {
    render(<Slider aria-label="Volume" disabled />);
    expect(screen.getByRole('slider')).toHaveClass('arch-slider--disabled');
  });
});

/* ─── onChange ───────────────────────────────────────────────────────────────── */

describe('Slider — onChange', () => {
  it('fires onChange with numeric value when changed', () => {
    const onChange = vi.fn();
    render(
      <Slider aria-label="Volume" value={50} min={0} max={100} onChange={onChange} />
    );
    const input = screen.getByRole('slider');
    fireEvent.change(input, { target: { value: '75' } });
    expect(onChange).toHaveBeenCalledWith(75);
  });

  it('fires onChange with a number type (not string)', () => {
    const onChange = vi.fn();
    render(
      <Slider aria-label="Volume" value={0} onChange={onChange} />
    );
    fireEvent.change(screen.getByRole('slider'), { target: { value: '30' } });
    expect(typeof onChange.mock.calls[0][0]).toBe('number');
  });

  it('does not fire onChange when disabled', () => {
    const onChange = vi.fn();
    render(
      <Slider aria-label="Volume" value={50} disabled onChange={onChange} />
    );
    fireEvent.change(screen.getByRole('slider'), { target: { value: '60' } });
    expect(onChange).not.toHaveBeenCalled();
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('Slider — accessibility', () => {
  it('passes axe with aria-label', async () => {
    const { container } = render(
      <Slider aria-label="Volume" value={50} min={0} max={100} onChange={() => {}} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe when disabled', async () => {
    const { container } = render(
      <Slider aria-label="Volume" value={50} disabled />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe with custom min/max/step', async () => {
    const { container } = render(
      <Slider aria-label="Rating" value={3} min={1} max={5} step={1} onChange={() => {}} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
