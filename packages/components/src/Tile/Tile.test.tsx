import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tile } from './Tile';

/* ─── Smoke ─────────────────────────────────────────────────────────────────── */

describe('Tile — smoke', () => {
  it('renders without crashing', () => {
    render(<Tile>Option A</Tile>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});

/* ─── Rendering ─────────────────────────────────────────────────────────────── */

describe('Tile — rendering', () => {
  it('renders children', () => {
    render(<Tile>Option A</Tile>);
    expect(screen.getByText('Option A')).toBeInTheDocument();
  });

  it('applies a custom className', () => {
    render(<Tile className="my-tile">A</Tile>);
    expect(screen.getByRole('button')).toHaveClass('arch-tile', 'my-tile');
  });
});

/* ─── Selected state ────────────────────────────────────────────────────────── */

describe('Tile — selected', () => {
  it('applies the selected class when selected=true', () => {
    render(<Tile selected>A</Tile>);
    expect(screen.getByRole('button')).toHaveClass('arch-tile--selected');
  });

  it('sets aria-pressed to true when selected', () => {
    render(<Tile selected>A</Tile>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('sets aria-pressed to false when not selected', () => {
    render(<Tile>A</Tile>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
  });
});

/* ─── Disabled ──────────────────────────────────────────────────────────────── */

describe('Tile — disabled', () => {
  it('applies the disabled class when disabled=true', () => {
    render(<Tile disabled>A</Tile>);
    expect(screen.getByRole('button')).toHaveClass('arch-tile--disabled');
  });

  it('sets aria-disabled when disabled', () => {
    render(<Tile disabled>A</Tile>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
  });

  it('sets tabIndex to -1 when disabled', () => {
    render(<Tile disabled>A</Tile>);
    expect(screen.getByRole('button')).toHaveAttribute('tabindex', '-1');
  });

  it('does not fire onChange when disabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Tile disabled onChange={onChange}>A</Tile>);
    await user.click(screen.getByRole('button'));
    expect(onChange).not.toHaveBeenCalled();
  });
});

/* ─── Interactivity ─────────────────────────────────────────────────────────── */

describe('Tile — interactivity', () => {
  it('fires onChange with the toggled state on click', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Tile selected={false} onChange={onChange}>A</Tile>);
    await user.click(screen.getByRole('button'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('fires onChange on Enter key', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Tile selected={false} onChange={onChange}>A</Tile>);
    screen.getByRole('button').focus();
    await user.keyboard('{Enter}');
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('fires onChange on Space key', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Tile selected={false} onChange={onChange}>A</Tile>);
    screen.getByRole('button').focus();
    await user.keyboard(' ');
    expect(onChange).toHaveBeenCalledWith(true);
  });
});

/* ─── Accessibility ─────────────────────────────────────────────────────────── */

describe('Tile — a11y', () => {
  it('has role="button"', () => {
    render(<Tile>A</Tile>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('is focusable when not disabled', () => {
    render(<Tile>A</Tile>);
    expect(screen.getByRole('button')).toHaveAttribute('tabindex', '0');
  });
});

/* ─── forwardRef ────────────────────────────────────────────────────────────── */

describe('Tile — forwardRef', () => {
  it('forwards ref to the root element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Tile ref={ref}>A</Tile>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });
});
