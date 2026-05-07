import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Timepicker } from './Timepicker';

/* ─── Smoke ─────────────────────────────────────────────────────────────────── */

describe('Timepicker — smoke', () => {
  it('renders without crashing', () => {
    render(<Timepicker aria-label="Time" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});

/* ─── Rendering ─────────────────────────────────────────────────────────────── */

describe('Timepicker — rendering', () => {
  it('renders an input element', () => {
    render(<Timepicker aria-label="Time" />);
    const input = screen.getByRole('textbox');
    expect(input.tagName).toBe('INPUT');
  });

  it('shows the placeholder text', () => {
    render(<Timepicker aria-label="Time" placeholder="Pick a time" />);
    expect(screen.getByPlaceholderText('Pick a time')).toBeInTheDocument();
  });

  it('shows default placeholder when none provided', () => {
    render(<Timepicker aria-label="Time" />);
    expect(screen.getByPlaceholderText('Select time')).toBeInTheDocument();
  });

  it('displays the current value', () => {
    render(<Timepicker aria-label="Time" value="09:30 AM" />);
    expect(screen.getByRole('textbox')).toHaveValue('09:30 AM');
  });

  it('applies a custom className', () => {
    const { container } = render(<Timepicker aria-label="Time" className="my-picker" />);
    expect(container.querySelector('.arch-timepicker')).toHaveClass('my-picker');
  });
});

/* ─── Dropdown ──────────────────────────────────────────────────────────────── */

describe('Timepicker — dropdown', () => {
  it('opens the dropdown on click', async () => {
    const user = userEvent.setup();
    render(<Timepicker aria-label="Time" />);
    await user.click(screen.getByRole('textbox'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('does not open when disabled', async () => {
    const user = userEvent.setup();
    render(<Timepicker aria-label="Time" disabled />);
    await user.click(screen.getByRole('textbox'));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});

/* ─── Disabled ──────────────────────────────────────────────────────────────── */

describe('Timepicker — disabled', () => {
  it('disables the input', () => {
    render(<Timepicker aria-label="Time" disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});

/* ─── Accessibility ─────────────────────────────────────────────────────────── */

describe('Timepicker — a11y', () => {
  it('has aria-haspopup="listbox"', () => {
    render(<Timepicker aria-label="Time" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-haspopup', 'listbox');
  });

  it('has aria-expanded=false when closed', () => {
    render(<Timepicker aria-label="Time" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-expanded', 'false');
  });

  it('has aria-expanded=true when open', async () => {
    const user = userEvent.setup();
    render(<Timepicker aria-label="Time" />);
    await user.click(screen.getByRole('textbox'));
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-expanded', 'true');
  });
});

/* ─── Size classes ──────────────────────────────────────────────────────────── */

describe('Timepicker — sizes', () => {
  const sizes = ['compact', 'default', 'large'] as const;

  sizes.forEach((size) => {
    it(`applies the "${size}" size class`, () => {
      const { container } = render(<Timepicker aria-label="Time" size={size} />);
      expect(container.querySelector('.arch-timepicker')).toHaveClass(`arch-timepicker--${size}`);
    });
  });
});
