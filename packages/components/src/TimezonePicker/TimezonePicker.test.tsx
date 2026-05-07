import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TimezonePicker } from './TimezonePicker';

/* ─── Smoke ─────────────────────────────────────────────────────────────────── */

describe('TimezonePicker — smoke', () => {
  it('renders without crashing', () => {
    render(<TimezonePicker aria-label="Timezone" />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});

/* ─── Rendering ─────────────────────────────────────────────────────────────── */

describe('TimezonePicker — rendering', () => {
  it('renders an input element', () => {
    render(<TimezonePicker aria-label="Timezone" />);
    expect(screen.getByRole('combobox').tagName).toBe('INPUT');
  });

  it('shows the default placeholder when no value', () => {
    render(<TimezonePicker aria-label="Timezone" />);
    expect(screen.getByPlaceholderText('Search timezone...')).toBeInTheDocument();
  });

  it('shows the selected timezone label when a value is set', () => {
    render(<TimezonePicker aria-label="Timezone" value="America/New_York" />);
    const input = screen.getByRole('combobox');
    expect(input).toHaveValue('Eastern Time (US) (UTC-05:00)');
  });

  it('applies a custom className', () => {
    const { container } = render(<TimezonePicker aria-label="Timezone" className="my-tz" />);
    expect(container.querySelector('.arch-timezone-picker')).toHaveClass('my-tz');
  });
});

/* ─── Disabled ──────────────────────────────────────────────────────────────── */

describe('TimezonePicker — disabled', () => {
  it('disables the input', () => {
    render(<TimezonePicker aria-label="Timezone" disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('does not open on focus when disabled', async () => {
    const user = userEvent.setup();
    render(<TimezonePicker aria-label="Timezone" disabled />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});

/* ─── Accessibility ─────────────────────────────────────────────────────────── */

describe('TimezonePicker — a11y', () => {
  it('has role="combobox"', () => {
    render(<TimezonePicker aria-label="Timezone" />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('has aria-haspopup="listbox"', () => {
    render(<TimezonePicker aria-label="Timezone" />);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-haspopup', 'listbox');
  });

  it('has aria-expanded=false when closed', () => {
    render(<TimezonePicker aria-label="Timezone" />);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
  });

  it('has aria-autocomplete="list"', () => {
    render(<TimezonePicker aria-label="Timezone" />);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-autocomplete', 'list');
  });
});

/* ─── Size classes ──────────────────────────────────────────────────────────── */

describe('TimezonePicker — sizes', () => {
  const sizes = ['compact', 'default', 'large'] as const;

  sizes.forEach((size) => {
    it(`applies the "${size}" size class`, () => {
      const { container } = render(<TimezonePicker aria-label="Timezone" size={size} />);
      expect(container.querySelector('.arch-timezone-picker')).toHaveClass(
        `arch-timezone-picker--${size}`,
      );
    });
  });
});
