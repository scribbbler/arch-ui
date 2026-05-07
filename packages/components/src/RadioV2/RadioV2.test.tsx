import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { RadioV2 } from './RadioV2';

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('RadioV2 — rendering', () => {
  it('renders without crashing', () => {
    render(<RadioV2 label="Option A" />);
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('renders the label text', () => {
    render(<RadioV2 label="Option A" />);
    expect(screen.getByText('Option A')).toBeInTheDocument();
  });

  it('renders description text when provided', () => {
    render(<RadioV2 label="Option A" description="Some description" />);
    expect(screen.getByText('Some description')).toBeInTheDocument();
  });

  it('does not render description when not provided', () => {
    const { container } = render(<RadioV2 label="Option A" />);
    expect(container.querySelector('.arch-radio-v2__description')).toBeNull();
  });

  it('applies a custom className', () => {
    const { container } = render(<RadioV2 label="Option A" className="custom" />);
    expect(container.firstChild).toHaveClass('custom');
  });

  it('forwards a ref to the native input', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<RadioV2 ref={ref} label="Option A" />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('INPUT');
  });
});

/* ─── States ─────────────────────────────────────────────────────────────────── */

describe('RadioV2 — states', () => {
  it('applies checked state class', () => {
    const { container } = render(<RadioV2 label="A" checked onChange={vi.fn()} />);
    expect(container.firstChild).toHaveClass('arch-radio-v2--selected');
  });

  it('does not apply checked class when unchecked', () => {
    const { container } = render(<RadioV2 label="A" checked={false} />);
    expect(container.firstChild).not.toHaveClass('arch-radio-v2--selected');
  });

  it('applies disabled state class and disables the input', () => {
    const { container } = render(<RadioV2 label="A" disabled />);
    expect(container.firstChild).toHaveClass('arch-radio-v2--disabled');
    expect(screen.getByRole('radio')).toBeDisabled();
  });

  it('applies error state class', () => {
    const { container } = render(<RadioV2 label="A" error />);
    expect(container.firstChild).toHaveClass('arch-radio-v2--error');
  });

  it('sets aria-invalid when error is true', () => {
    render(<RadioV2 label="A" error />);
    expect(screen.getByRole('radio')).toHaveAttribute('aria-invalid', 'true');
  });
});

/* ─── Interactivity ──────────────────────────────────────────────────────────── */

describe('RadioV2 — interactivity', () => {
  it('calls onChange when clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<RadioV2 label="A" onChange={onChange} />);
    await user.click(screen.getByRole('radio'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('does not call onChange when disabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<RadioV2 label="A" disabled onChange={onChange} />);
    await user.click(screen.getByRole('radio'));
    expect(onChange).not.toHaveBeenCalled();
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('RadioV2 — accessibility', () => {
  it('links description via aria-describedby', () => {
    render(<RadioV2 label="A" description="Help text" />);
    const radio = screen.getByRole('radio');
    const descId = radio.getAttribute('aria-describedby');
    expect(descId).toBeTruthy();
    expect(document.getElementById(descId!)).toHaveTextContent('Help text');
  });

  it('passes axe with default props', async () => {
    const { container } = render(<RadioV2 label="Option A" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
