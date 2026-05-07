import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Stepper } from './Stepper';

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('Stepper — rendering', () => {
  it('renders without crashing', () => {
    render(<Stepper value={5} onChange={vi.fn()} />);
    expect(screen.getByRole('group', { name: 'Stepper' })).toBeInTheDocument();
  });

  it('displays the current value', () => {
    render(<Stepper value={7} onChange={vi.fn()} />);
    expect(screen.getByText('7')).toBeInTheDocument();
  });

  it('renders increment and decrement buttons', () => {
    render(<Stepper value={5} onChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Decrease value' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Increase value' })).toBeInTheDocument();
  });

  it('applies a custom className', () => {
    render(<Stepper value={0} onChange={vi.fn()} className="custom" />);
    expect(screen.getByRole('group')).toHaveClass('custom');
  });

  it('applies size class', () => {
    render(<Stepper value={0} onChange={vi.fn()} size="compact" />);
    expect(screen.getByRole('group')).toHaveClass('arch-stepper--compact');
  });

  it('forwards a ref to the root element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Stepper ref={ref} value={0} onChange={vi.fn()} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });
});

/* ─── Interactivity ──────────────────────────────────────────────────────────── */

describe('Stepper — interactivity', () => {
  it('calls onChange with incremented value on plus click', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Stepper value={3} onChange={onChange} />);
    await user.click(screen.getByRole('button', { name: 'Increase value' }));
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it('calls onChange with decremented value on minus click', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Stepper value={3} onChange={onChange} />);
    await user.click(screen.getByRole('button', { name: 'Decrease value' }));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('respects custom step amount', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Stepper value={10} onChange={onChange} step={5} />);
    await user.click(screen.getByRole('button', { name: 'Increase value' }));
    expect(onChange).toHaveBeenCalledWith(15);
  });

  it('disables decrement button at min value', () => {
    render(<Stepper value={0} onChange={vi.fn()} min={0} />);
    expect(screen.getByRole('button', { name: 'Decrease value' })).toBeDisabled();
  });

  it('disables increment button at max value', () => {
    render(<Stepper value={10} onChange={vi.fn()} max={10} />);
    expect(screen.getByRole('button', { name: 'Increase value' })).toBeDisabled();
  });

  it('disables both buttons when disabled is true', () => {
    render(<Stepper value={5} onChange={vi.fn()} disabled />);
    expect(screen.getByRole('button', { name: 'Decrease value' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Increase value' })).toBeDisabled();
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('Stepper — accessibility', () => {
  it('value has aria-live polite', () => {
    render(<Stepper value={5} onChange={vi.fn()} />);
    expect(screen.getByText('5')).toHaveAttribute('aria-live', 'polite');
  });

  it('passes axe with default props', async () => {
    const { container } = render(<Stepper value={5} onChange={vi.fn()} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
