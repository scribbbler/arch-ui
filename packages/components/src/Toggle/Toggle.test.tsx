import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Toggle } from './Toggle';
import { FormControl } from '../FormControl/index';

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('Toggle — rendering', () => {
  it('renders without crashing', () => {
    render(<Toggle aria-label="Enable feature" />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('renders an <input type="checkbox"> element', () => {
    render(<Toggle aria-label="toggle" />);
    const input = screen.getByRole('switch');
    expect(input.tagName).toBe('INPUT');
    expect(input).toHaveAttribute('type', 'checkbox');
  });

  it('has role="switch"', () => {
    render(<Toggle aria-label="toggle" />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('renders label text when children is provided', () => {
    render(<Toggle>Enable notifications</Toggle>);
    expect(screen.getByText('Enable notifications')).toBeInTheDocument();
  });

  it('applies the arch-toggle class to the wrapper label', () => {
    const { container } = render(<Toggle aria-label="toggle" />);
    expect(container.firstChild).toHaveClass('arch-toggle');
  });

  it('applies the default md size class', () => {
    const { container } = render(<Toggle aria-label="toggle" />);
    expect(container.firstChild).toHaveClass('arch-toggle--md');
  });

  it('applies the sm size class when size="sm"', () => {
    const { container } = render(<Toggle aria-label="toggle" size="sm" />);
    expect(container.firstChild).toHaveClass('arch-toggle--sm');
  });

  it('applies a custom className to the wrapper', () => {
    const { container } = render(
      <Toggle aria-label="toggle" className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('forwards ref to the underlying input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Toggle ref={ref} aria-label="toggle" />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('INPUT');
  });
});

/* ─── Checked state ──────────────────────────────────────────────────────────── */

describe('Toggle — checked state', () => {
  it('is unchecked by default', () => {
    render(<Toggle aria-label="toggle" />);
    expect(screen.getByRole('switch')).not.toBeChecked();
  });

  it('is checked when checked=true', () => {
    render(<Toggle aria-label="toggle" checked onChange={() => {}} />);
    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('is unchecked when checked=false', () => {
    render(<Toggle aria-label="toggle" checked={false} onChange={() => {}} />);
    expect(screen.getByRole('switch')).not.toBeChecked();
  });

  it('sets aria-checked to true when checked', () => {
    render(<Toggle aria-label="toggle" checked onChange={() => {}} />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });
});

/* ─── Disabled state ─────────────────────────────────────────────────────────── */

describe('Toggle — disabled state', () => {
  it('is disabled when disabled=true', () => {
    render(<Toggle aria-label="toggle" disabled />);
    expect(screen.getByRole('switch')).toBeDisabled();
  });

  it('sets aria-disabled="true" when disabled', () => {
    render(<Toggle aria-label="toggle" disabled />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-disabled', 'true');
  });

  it('applies arch-toggle--disabled class when disabled', () => {
    const { container } = render(<Toggle aria-label="toggle" disabled />);
    expect(container.firstChild).toHaveClass('arch-toggle--disabled');
  });

  it('does not fire onChange when disabled', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Toggle aria-label="toggle" disabled onChange={onChange} />);
    await user.click(screen.getByRole('switch')).catch(() => {});
    expect(onChange).not.toHaveBeenCalled();
  });
});

/* ─── onChange ───────────────────────────────────────────────────────────────── */

describe('Toggle — onChange', () => {
  it('fires onChange when clicked', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Toggle aria-label="toggle" onChange={onChange} />);
    await user.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('fires onChange with the change event', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Toggle aria-label="toggle" onChange={onChange} />);
    await user.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ target: expect.any(HTMLInputElement) })
    );
  });

  it('fires onChange when toggled via keyboard Space', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Toggle aria-label="toggle" onChange={onChange} />);
    const input = screen.getByRole('switch');
    input.focus();
    await user.keyboard('[Space]');
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});

/* ─── FormControl context integration ────────────────────────────────────────── */

describe('Toggle — FormControl context', () => {
  it('picks up disabled from FormControl context', () => {
    render(
      <FormControl id="ctx-toggle" disabled>
        <Toggle aria-label="toggle" />
      </FormControl>
    );
    expect(screen.getByRole('switch')).toBeDisabled();
  });

  it('picks up required from FormControl context', () => {
    render(
      <FormControl id="ctx-toggle-req" required>
        <Toggle aria-label="toggle" />
      </FormControl>
    );
    expect(screen.getByRole('switch')).toHaveAttribute('aria-required', 'true');
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('Toggle — accessibility', () => {
  it('passes axe with aria-label', async () => {
    const { container } = render(
      <Toggle aria-label="Enable dark mode" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe with visible label text', async () => {
    const { container } = render(
      <Toggle>Enable dark mode</Toggle>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe when checked', async () => {
    const { container } = render(
      <Toggle aria-label="Feature toggle" checked onChange={() => {}} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe when disabled', async () => {
    const { container } = render(
      <Toggle aria-label="Disabled toggle" disabled />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe inside a FormControl', async () => {
    const { container } = render(
      <FormControl id="axe-toggle">
        <Toggle>Send newsletter</Toggle>
      </FormControl>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
