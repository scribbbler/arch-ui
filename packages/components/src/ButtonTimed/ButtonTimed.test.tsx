import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ButtonTimed } from './ButtonTimed';

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('ButtonTimed — rendering', () => {
  it('renders without crashing', () => {
    render(<ButtonTimed initialTime={5} onTimeout={vi.fn()}>Undo</ButtonTimed>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders a <button> element', () => {
    render(<ButtonTimed initialTime={5} onTimeout={vi.fn()}>Undo</ButtonTimed>);
    expect(screen.getByRole('button').tagName).toBe('BUTTON');
  });

  it('renders children as the label', () => {
    render(<ButtonTimed initialTime={5} onTimeout={vi.fn()}>Undo</ButtonTimed>);
    expect(screen.getByText('Undo')).toBeInTheDocument();
  });

  it('displays the countdown timer text', () => {
    render(<ButtonTimed initialTime={10} onTimeout={vi.fn()}>Undo</ButtonTimed>);
    expect(screen.getByText('(10s)')).toBeInTheDocument();
  });

  it('timer has aria-live="polite"', () => {
    render(<ButtonTimed initialTime={5} onTimeout={vi.fn()}>Undo</ButtonTimed>);
    expect(screen.getByText('(5s)')).toHaveAttribute('aria-live', 'polite');
  });

  it('applies a custom className', () => {
    render(<ButtonTimed initialTime={5} onTimeout={vi.fn()} className="custom">Undo</ButtonTimed>);
    expect(screen.getByRole('button')).toHaveClass('custom');
  });

  it('forwards a ref to the root element', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<ButtonTimed ref={ref} initialTime={5} onTimeout={vi.fn()}>Undo</ButtonTimed>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('BUTTON');
  });
});

/* ─── Variants ───────────────────────────────────────────────────────────────── */

describe('ButtonTimed — kind variants', () => {
  it('defaults to primary kind', () => {
    render(<ButtonTimed initialTime={5} onTimeout={vi.fn()}>Go</ButtonTimed>);
    expect(screen.getByRole('button')).toHaveClass('arch-button-timed--primary');
  });

  it('applies secondary kind class', () => {
    render(<ButtonTimed initialTime={5} onTimeout={vi.fn()} kind="secondary">Go</ButtonTimed>);
    expect(screen.getByRole('button')).toHaveClass('arch-button-timed--secondary');
  });

  it('applies dangerPrimary kind class', () => {
    render(<ButtonTimed initialTime={5} onTimeout={vi.fn()} kind="dangerPrimary">Go</ButtonTimed>);
    expect(screen.getByRole('button')).toHaveClass('arch-button-timed--danger-primary');
  });
});

/* ─── Sizes ──────────────────────────────────────────────────────────────────── */

describe('ButtonTimed — sizes', () => {
  it('defaults to default size', () => {
    render(<ButtonTimed initialTime={5} onTimeout={vi.fn()}>Go</ButtonTimed>);
    expect(screen.getByRole('button')).toHaveClass('arch-button-timed--default');
  });

  it('applies compact size class', () => {
    render(<ButtonTimed initialTime={5} onTimeout={vi.fn()} size="compact">Go</ButtonTimed>);
    expect(screen.getByRole('button')).toHaveClass('arch-button-timed--compact');
  });

  it('applies large size class', () => {
    render(<ButtonTimed initialTime={5} onTimeout={vi.fn()} size="large">Go</ButtonTimed>);
    expect(screen.getByRole('button')).toHaveClass('arch-button-timed--large');
  });
});

/* ─── Disabled ───────────────────────────────────────────────────────────────── */

describe('ButtonTimed — disabled', () => {
  it('disables the button when disabled is true', () => {
    render(<ButtonTimed initialTime={5} onTimeout={vi.fn()} disabled>Go</ButtonTimed>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies disabled class when disabled', () => {
    render(<ButtonTimed initialTime={5} onTimeout={vi.fn()} disabled>Go</ButtonTimed>);
    expect(screen.getByRole('button')).toHaveClass('arch-button-timed--disabled');
  });
});
