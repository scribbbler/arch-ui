import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CheckboxV2 } from './CheckboxV2';

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('CheckboxV2 — rendering', () => {
  it('renders without crashing', () => {
    render(<CheckboxV2 label="Accept terms" />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('renders the label text', () => {
    render(<CheckboxV2 label="Accept terms" />);
    expect(screen.getByText('Accept terms')).toBeInTheDocument();
  });

  it('renders description text when provided', () => {
    render(<CheckboxV2 label="Accept" description="You agree to our terms" />);
    expect(screen.getByText('You agree to our terms')).toBeInTheDocument();
  });

  it('does not render description when not provided', () => {
    const { container } = render(<CheckboxV2 label="Accept" />);
    expect(container.querySelector('.arch-checkbox-v2__description')).not.toBeInTheDocument();
  });

  it('applies a custom className', () => {
    const { container } = render(<CheckboxV2 label="Accept" className="custom" />);
    expect(container.firstChild).toHaveClass('arch-checkbox-v2', 'custom');
  });

  it('forwards a ref to the input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<CheckboxV2 ref={ref} label="Accept" />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('INPUT');
  });
});

/* ─── States ─────────────────────────────────────────────────────────────────── */

describe('CheckboxV2 — states', () => {
  it('renders unchecked by default', () => {
    render(<CheckboxV2 label="Accept" />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('renders checked when checked is true', () => {
    render(<CheckboxV2 label="Accept" checked />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('applies checked class when checked', () => {
    const { container } = render(<CheckboxV2 label="Accept" checked />);
    expect(container.firstChild).toHaveClass('arch-checkbox-v2--checked');
  });

  it('sets aria-checked="mixed" when indeterminate', () => {
    render(<CheckboxV2 label="Accept" indeterminate />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'mixed');
  });

  it('applies indeterminate class', () => {
    const { container } = render(<CheckboxV2 label="Accept" indeterminate />);
    expect(container.firstChild).toHaveClass('arch-checkbox-v2--indeterminate');
  });

  it('disables the checkbox when disabled is true', () => {
    render(<CheckboxV2 label="Accept" disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('applies disabled class when disabled', () => {
    const { container } = render(<CheckboxV2 label="Accept" disabled />);
    expect(container.firstChild).toHaveClass('arch-checkbox-v2--disabled');
  });

  it('applies error class when error is true', () => {
    const { container } = render(<CheckboxV2 label="Accept" error />);
    expect(container.firstChild).toHaveClass('arch-checkbox-v2--error');
  });

  it('sets aria-invalid when error is true', () => {
    render(<CheckboxV2 label="Accept" error />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
  });
});

/* ─── Interaction ────────────────────────────────────────────────────────────── */

describe('CheckboxV2 — interaction', () => {
  it('calls onChange with true when clicking unchecked checkbox', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<CheckboxV2 label="Accept" onChange={onChange} />);

    await user.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('calls onChange with false when clicking checked checkbox', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<CheckboxV2 label="Accept" checked onChange={onChange} />);

    await user.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it('does not fire onChange when disabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<CheckboxV2 label="Accept" disabled onChange={onChange} />);

    await user.click(screen.getByRole('checkbox'));
    expect(onChange).not.toHaveBeenCalled();
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('CheckboxV2 — accessibility', () => {
  it('associates the label with the checkbox via htmlFor', () => {
    render(<CheckboxV2 label="Accept" />);
    const checkbox = screen.getByRole('checkbox');
    const label = checkbox.closest('label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', checkbox.id);
  });

  it('links description via aria-describedby', () => {
    render(<CheckboxV2 label="Accept" description="Terms apply" />);
    const checkbox = screen.getByRole('checkbox');
    const describedBy = checkbox.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
    expect(document.getElementById(describedBy!)).toHaveTextContent('Terms apply');
  });
});
