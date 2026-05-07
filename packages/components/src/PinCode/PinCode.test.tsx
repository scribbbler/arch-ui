import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { PinCode } from './PinCode';

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('PinCode — rendering', () => {
  it('renders without crashing', () => {
    render(<PinCode value="" onChange={vi.fn()} />);
    expect(screen.getByRole('group', { name: 'Pin code input' })).toBeInTheDocument();
  });

  it('renders 4 inputs by default', () => {
    render(<PinCode value="" onChange={vi.fn()} />);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(4);
  });

  it('renders custom number of inputs via length prop', () => {
    render(<PinCode value="" onChange={vi.fn()} length={6} />);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(6);
  });

  it('applies a custom className', () => {
    render(<PinCode value="" onChange={vi.fn()} className="my-pin" />);
    expect(screen.getByRole('group')).toHaveClass('my-pin');
  });

  it('forwards a ref to the root element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<PinCode ref={ref} value="" onChange={vi.fn()} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });
});

/* ─── States ─────────────────────────────────────────────────────────────────── */

describe('PinCode — states', () => {
  it('disables all inputs when disabled', () => {
    render(<PinCode value="" onChange={vi.fn()} disabled />);
    const inputs = screen.getAllByRole('textbox');
    inputs.forEach((input) => {
      expect(input).toBeDisabled();
    });
  });

  it('applies error class when error is true', () => {
    render(<PinCode value="" onChange={vi.fn()} error />);
    expect(screen.getByRole('group')).toHaveClass('arch-pincode--error');
  });

  it('applies size class', () => {
    render(<PinCode value="" onChange={vi.fn()} size="compact" />);
    expect(screen.getByRole('group')).toHaveClass('arch-pincode--compact');
  });

  it('uses password input type when mask is true', () => {
    render(<PinCode value="" onChange={vi.fn()} mask />);
    const inputs = screen.getByRole('group').querySelectorAll('input');
    inputs.forEach((input) => {
      expect(input).toHaveAttribute('type', 'password');
    });
  });
});

/* ─── Interactivity ──────────────────────────────────────────────────────────── */

describe('PinCode — interactivity', () => {
  it('calls onChange when a digit is entered', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<PinCode value="" onChange={onChange} />);
    const inputs = screen.getAllByRole('textbox');
    await user.click(inputs[0]);
    await user.keyboard('1');
    expect(onChange).toHaveBeenCalled();
  });

  it('distributes each input value into individual fields', () => {
    render(<PinCode value="12" onChange={vi.fn()} />);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs[0]).toHaveValue('1');
    expect(inputs[1]).toHaveValue('2');
    expect(inputs[2]).toHaveValue('');
    expect(inputs[3]).toHaveValue('');
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('PinCode — accessibility', () => {
  it('each input has an aria-label with digit position', () => {
    render(<PinCode value="" onChange={vi.fn()} length={4} />);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs[0]).toHaveAttribute('aria-label', 'Digit 1 of 4');
    expect(inputs[3]).toHaveAttribute('aria-label', 'Digit 4 of 4');
  });

  it('sets aria-invalid on inputs when error is true', () => {
    render(<PinCode value="" onChange={vi.fn()} error />);
    const inputs = screen.getAllByRole('textbox');
    inputs.forEach((input) => {
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });
  });

  it('passes axe with default props', async () => {
    const { container } = render(<PinCode value="" onChange={vi.fn()} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
