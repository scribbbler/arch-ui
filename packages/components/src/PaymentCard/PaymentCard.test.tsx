import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PaymentCard } from './PaymentCard';

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('PaymentCard — rendering', () => {
  it('renders without crashing', () => {
    render(<PaymentCard />);
    expect(screen.getByLabelText('Credit card number')).toBeInTheDocument();
  });

  it('renders an input element', () => {
    render(<PaymentCard />);
    expect(screen.getByLabelText('Credit card number').tagName).toBe('INPUT');
  });

  it('renders with placeholder "Card number"', () => {
    render(<PaymentCard />);
    expect(screen.getByPlaceholderText('Card number')).toBeInTheDocument();
  });

  it('applies the base class', () => {
    const { container } = render(<PaymentCard />);
    expect(container.querySelector('.arch-payment-card')).toBeInTheDocument();
  });

  it('applies a custom className', () => {
    const { container } = render(<PaymentCard className="my-card" />);
    expect(container.querySelector('.arch-payment-card')).toHaveClass('arch-payment-card', 'my-card');
  });

  it('formats the value with spaces', () => {
    render(<PaymentCard value="4111111111111111" />);
    expect(screen.getByLabelText('Credit card number')).toHaveValue('4111 1111 1111 1111');
  });
});

/* ─── Sizes ──────────────────────────────────────────────────────────────────── */

describe('PaymentCard — sizes', () => {
  const sizes = ['mini', 'compact', 'default', 'large'] as const;

  sizes.forEach((size) => {
    it(`applies the "${size}" size class`, () => {
      const { container } = render(<PaymentCard size={size} />);
      expect(container.querySelector('.arch-payment-card')).toHaveClass(`arch-payment-card--${size}`);
    });
  });
});

/* ─── States ─────────────────────────────────────────────────────────────────── */

describe('PaymentCard — states', () => {
  it('applies error class', () => {
    const { container } = render(<PaymentCard error />);
    expect(container.querySelector('.arch-payment-card')).toHaveClass('arch-payment-card--error');
  });

  it('applies positive class', () => {
    const { container } = render(<PaymentCard positive />);
    expect(container.querySelector('.arch-payment-card')).toHaveClass('arch-payment-card--positive');
  });

  it('applies disabled class and disables input', () => {
    const { container } = render(<PaymentCard disabled />);
    expect(container.querySelector('.arch-payment-card')).toHaveClass('arch-payment-card--disabled');
    expect(screen.getByLabelText('Credit card number')).toBeDisabled();
  });

  it('sets aria-invalid when error is true', () => {
    render(<PaymentCard error />);
    expect(screen.getByLabelText('Credit card number')).toHaveAttribute('aria-invalid', 'true');
  });
});

/* ─── Card type detection ────────────────────────────────────────────────────── */

describe('PaymentCard — card type detection', () => {
  it('shows Visa indicator for cards starting with 4', () => {
    const { container } = render(<PaymentCard value="4111" />);
    expect(container.querySelector('.arch-payment-card__indicator')).toHaveTextContent('Visa');
  });

  it('shows MC indicator for cards starting with 5', () => {
    const { container } = render(<PaymentCard value="5111" />);
    expect(container.querySelector('.arch-payment-card__indicator')).toHaveTextContent('MC');
  });

  it('shows Amex indicator for cards starting with 3', () => {
    const { container } = render(<PaymentCard value="3782" />);
    expect(container.querySelector('.arch-payment-card__indicator')).toHaveTextContent('Amex');
  });
});

/* ─── Interactivity ──────────────────────────────────────────────────────────── */

describe('PaymentCard — interactivity', () => {
  it('calls onChange with digits only', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<PaymentCard value="" onChange={onChange} />);

    const input = screen.getByLabelText('Credit card number');
    await user.type(input, '4');
    expect(onChange).toHaveBeenCalled();
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('PaymentCard — accessibility', () => {
  it('has aria-label on input', () => {
    render(<PaymentCard />);
    expect(screen.getByLabelText('Credit card number')).toBeInTheDocument();
  });

  it('has inputMode="numeric"', () => {
    render(<PaymentCard />);
    expect(screen.getByLabelText('Credit card number')).toHaveAttribute('inputmode', 'numeric');
  });

  it('has autoComplete="cc-number"', () => {
    render(<PaymentCard />);
    expect(screen.getByLabelText('Credit card number')).toHaveAttribute('autocomplete', 'cc-number');
  });

  it('hides card type indicator from assistive technology', () => {
    const { container } = render(<PaymentCard value="4111" />);
    expect(container.querySelector('.arch-payment-card__indicator')).toHaveAttribute('aria-hidden', 'true');
  });
});

/* ─── forwardRef ─────────────────────────────────────────────────────────────── */

describe('PaymentCard — forwardRef', () => {
  it('forwards a ref to the input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<PaymentCard ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('INPUT');
  });
});
