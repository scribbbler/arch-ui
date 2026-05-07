import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Combobox } from './Combobox';

const defaultOptions = [
  { id: 'us', label: 'United States' },
  { id: 'ca', label: 'Canada' },
  { id: 'mx', label: 'Mexico' },
];

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('Combobox — rendering', () => {
  it('renders without crashing', () => {
    render(<Combobox options={defaultOptions} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders the input element', () => {
    render(<Combobox options={defaultOptions} />);
    expect(screen.getByRole('combobox').tagName).toBe('INPUT');
  });

  it('displays placeholder text', () => {
    render(<Combobox options={defaultOptions} placeholder="Pick a country" />);
    expect(screen.getByPlaceholderText('Pick a country')).toBeInTheDocument();
  });

  it('displays default placeholder when none specified', () => {
    render(<Combobox options={defaultOptions} />);
    expect(screen.getByPlaceholderText('Select...')).toBeInTheDocument();
  });

  it('applies a custom className', () => {
    const { container } = render(
      <Combobox options={defaultOptions} className="custom-combo" />
    );
    expect(container.firstChild).toHaveClass('custom-combo');
  });

  it('applies size class', () => {
    const { container } = render(
      <Combobox options={defaultOptions} size="compact" />
    );
    expect(container.firstChild).toHaveClass('arch-combobox--compact');
  });

  it('forwards a ref to the root element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Combobox ref={ref} options={defaultOptions} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });
});

/* ─── States ─────────────────────────────────────────────────────────────────── */

describe('Combobox — states', () => {
  it('disables the input when disabled', () => {
    render(<Combobox options={defaultOptions} disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('applies error class to control when error is true', () => {
    const { container } = render(<Combobox options={defaultOptions} error />);
    expect(container.querySelector('.arch-combobox__control--error')).toBeInTheDocument();
  });

  it('applies positive class to control when positive is true', () => {
    const { container } = render(<Combobox options={defaultOptions} positive />);
    expect(container.querySelector('.arch-combobox__control--positive')).toBeInTheDocument();
  });
});

/* ─── Dropdown / Options ─────────────────────────────────────────────────────── */

describe('Combobox — options', () => {
  it('opens dropdown and shows options on click', async () => {
    const user = userEvent.setup();
    render(<Combobox options={defaultOptions} />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('Canada')).toBeInTheDocument();
    expect(screen.getByText('Mexico')).toBeInTheDocument();
  });

  it('sets aria-expanded to true when open', async () => {
    const user = userEvent.setup();
    render(<Combobox options={defaultOptions} />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true');
  });

  it('calls onChange when an option is selected', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Combobox options={defaultOptions} onChange={onChange} />);
    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByText('Canada'));
    expect(onChange).toHaveBeenCalledWith('ca');
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('Combobox — accessibility', () => {
  it('has aria-autocomplete on the input', () => {
    render(<Combobox options={defaultOptions} />);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-autocomplete', 'list');
  });

  it('passes axe with default props', async () => {
    const { container } = render(<Combobox options={defaultOptions} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
