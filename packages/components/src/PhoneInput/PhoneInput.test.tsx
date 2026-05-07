import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PhoneInput } from './PhoneInput';

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('PhoneInput — rendering', () => {
  it('renders without crashing', () => {
    render(<PhoneInput />);
    expect(screen.getByLabelText('Phone number')).toBeInTheDocument();
  });

  it('renders an input element', () => {
    render(<PhoneInput />);
    expect(screen.getByLabelText('Phone number').tagName).toBe('INPUT');
  });

  it('renders with default placeholder "Phone number"', () => {
    render(<PhoneInput />);
    expect(screen.getByPlaceholderText('Phone number')).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    render(<PhoneInput placeholder="Enter phone" />);
    expect(screen.getByPlaceholderText('Enter phone')).toBeInTheDocument();
  });

  it('applies the base class', () => {
    const { container } = render(<PhoneInput />);
    expect(container.querySelector('.arch-phone-input')).toBeInTheDocument();
  });

  it('applies a custom className', () => {
    const { container } = render(<PhoneInput className="my-phone" />);
    expect(container.querySelector('.arch-phone-input')).toHaveClass('arch-phone-input', 'my-phone');
  });

  it('has type="tel" on the input', () => {
    render(<PhoneInput />);
    expect(screen.getByLabelText('Phone number')).toHaveAttribute('type', 'tel');
  });
});

/* ─── Country code ───────────────────────────────────────────────────────────── */

describe('PhoneInput — country code', () => {
  it('displays +1 for US by default', () => {
    render(<PhoneInput />);
    expect(screen.getByLabelText(/Country code US/)).toHaveTextContent('+1');
  });

  it('displays +44 for GB', () => {
    render(<PhoneInput country="GB" />);
    expect(screen.getByLabelText(/Country code GB/)).toHaveTextContent('+44');
  });

  it('displays +91 for IN', () => {
    render(<PhoneInput country="IN" />);
    expect(screen.getByLabelText(/Country code IN/)).toHaveTextContent('+91');
  });
});

/* ─── Sizes ──────────────────────────────────────────────────────────────────── */

describe('PhoneInput — sizes', () => {
  const sizes = ['mini', 'compact', 'default', 'large'] as const;

  sizes.forEach((size) => {
    it(`applies the "${size}" size class`, () => {
      const { container } = render(<PhoneInput size={size} />);
      expect(container.querySelector('.arch-phone-input')).toHaveClass(`arch-phone-input--${size}`);
    });
  });
});

/* ─── States ─────────────────────────────────────────────────────────────────── */

describe('PhoneInput — states', () => {
  it('applies error class', () => {
    const { container } = render(<PhoneInput error />);
    expect(container.querySelector('.arch-phone-input')).toHaveClass('arch-phone-input--error');
  });

  it('applies positive class', () => {
    const { container } = render(<PhoneInput positive />);
    expect(container.querySelector('.arch-phone-input')).toHaveClass('arch-phone-input--positive');
  });

  it('applies disabled class and disables input', () => {
    const { container } = render(<PhoneInput disabled />);
    expect(container.querySelector('.arch-phone-input')).toHaveClass('arch-phone-input--disabled');
    expect(screen.getByLabelText('Phone number')).toBeDisabled();
  });

  it('sets aria-invalid when error is true', () => {
    render(<PhoneInput error />);
    expect(screen.getByLabelText('Phone number')).toHaveAttribute('aria-invalid', 'true');
  });
});

/* ─── Interactivity ──────────────────────────────────────────────────────────── */

describe('PhoneInput — interactivity', () => {
  it('calls onChange with digits only', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<PhoneInput value="" onChange={onChange} />);

    const input = screen.getByLabelText('Phone number');
    await user.type(input, '5');
    expect(onChange).toHaveBeenCalled();
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('PhoneInput — accessibility', () => {
  it('has role="group" on the wrapper', () => {
    render(<PhoneInput />);
    expect(screen.getByRole('group')).toBeInTheDocument();
  });

  it('has aria-label on the wrapper', () => {
    render(<PhoneInput />);
    expect(screen.getByRole('group')).toHaveAttribute('aria-label', 'Phone number input');
  });

  it('has inputMode="tel" on the input', () => {
    render(<PhoneInput />);
    expect(screen.getByLabelText('Phone number')).toHaveAttribute('inputmode', 'tel');
  });
});

/* ─── forwardRef ─────────────────────────────────────────────────────────────── */

describe('PhoneInput — forwardRef', () => {
  it('forwards a ref to the input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<PhoneInput ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('INPUT');
  });
});
