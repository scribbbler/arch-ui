import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Datepicker } from './Datepicker';

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('Datepicker — rendering', () => {
  it('renders without crashing', () => {
    const { container } = render(<Datepicker />);
    expect(container.querySelector('.arch-datepicker')).toBeInTheDocument();
  });

  it('renders an input element', () => {
    render(<Datepicker />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('shows placeholder text when no value is set', () => {
    render(<Datepicker placeholder="Pick a date" />);
    expect(screen.getByPlaceholderText('Pick a date')).toBeInTheDocument();
  });

  it('shows default placeholder "Select date"', () => {
    render(<Datepicker />);
    expect(screen.getByPlaceholderText('Select date')).toBeInTheDocument();
  });

  it('displays formatted date when value is provided', () => {
    const date = new Date(2025, 0, 15); // Jan 15, 2025
    render(<Datepicker value={date} />);
    expect(screen.getByRole('textbox')).toHaveValue('01/15/2025');
  });

  it('applies a custom className', () => {
    const { container } = render(<Datepicker className="custom" />);
    expect(container.querySelector('.arch-datepicker')).toHaveClass('custom');
  });

  it('forwards a ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Datepicker ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});

/* ─── Disabled ───────────────────────────────────────────────────────────────── */

describe('Datepicker — disabled', () => {
  it('disables the input when disabled is true', () => {
    render(<Datepicker disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('does not open the calendar when disabled', async () => {
    const user = userEvent.setup();
    render(<Datepicker disabled />);

    await user.click(screen.getByRole('textbox'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

/* ─── Size variants ──────────────────────────────────────────────────────────── */

describe('Datepicker — sizes', () => {
  it('defaults to default size class', () => {
    const { container } = render(<Datepicker />);
    expect(container.querySelector('.arch-datepicker')).toHaveClass('arch-datepicker--default');
  });

  it('applies compact size class', () => {
    const { container } = render(<Datepicker size="compact" />);
    expect(container.querySelector('.arch-datepicker')).toHaveClass('arch-datepicker--compact');
  });

  it('applies large size class', () => {
    const { container } = render(<Datepicker size="large" />);
    expect(container.querySelector('.arch-datepicker')).toHaveClass('arch-datepicker--large');
  });
});

/* ─── Calendar popover ───────────────────────────────────────────────────────── */

describe('Datepicker — calendar', () => {
  it('does not show the calendar by default', () => {
    render(<Datepicker />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens the calendar on input click', async () => {
    const user = userEvent.setup();
    render(<Datepicker />);

    await user.click(screen.getByRole('textbox'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('has aria-haspopup="dialog" on the input', () => {
    render(<Datepicker />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-haspopup', 'dialog');
  });

  it('sets aria-expanded to false when calendar is closed', () => {
    render(<Datepicker />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-expanded', 'false');
  });

  it('sets aria-expanded to true when calendar is open', async () => {
    const user = userEvent.setup();
    render(<Datepicker />);

    await user.click(screen.getByRole('textbox'));
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-expanded', 'true');
  });
});
