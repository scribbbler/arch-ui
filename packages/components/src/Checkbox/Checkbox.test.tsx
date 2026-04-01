import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Checkbox } from './Checkbox';

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('Checkbox — rendering', () => {
  it('renders without crashing', () => {
    render(<Checkbox>Accept terms</Checkbox>);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('renders a real <input type="checkbox">', () => {
    render(<Checkbox>Label</Checkbox>);
    const input = screen.getByRole('checkbox');
    expect(input.tagName).toBe('INPUT');
    expect(input).toHaveAttribute('type', 'checkbox');
  });

  it('renders label text as children', () => {
    render(<Checkbox>My label</Checkbox>);
    expect(screen.getByText('My label')).toBeInTheDocument();
  });

  it('applies a custom className to the wrapper', () => {
    const { container } = render(<Checkbox className="custom-class">Label</Checkbox>);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('forwards a ref to the native input', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Checkbox ref={ref}>Ref checkbox</Checkbox>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('INPUT');
  });
});

/* ─── States via CSS classes ─────────────────────────────────────────────────── */

describe('Checkbox — state classes', () => {
  it('applies arch-checkbox--checked class when checked', () => {
    const { container } = render(
      <Checkbox checked onChange={vi.fn()}>Checked</Checkbox>
    );
    expect(container.firstChild).toHaveClass('arch-checkbox--checked');
  });

  it('does not apply arch-checkbox--checked when unchecked', () => {
    const { container } = render(
      <Checkbox checked={false} onChange={vi.fn()}>Unchecked</Checkbox>
    );
    expect(container.firstChild).not.toHaveClass('arch-checkbox--checked');
  });

  it('applies arch-checkbox--indeterminate class when indeterminate', () => {
    const { container } = render(
      <Checkbox indeterminate onChange={vi.fn()}>Indeterminate</Checkbox>
    );
    expect(container.firstChild).toHaveClass('arch-checkbox--indeterminate');
  });

  it('does not apply arch-checkbox--checked when indeterminate is true', () => {
    const { container } = render(
      <Checkbox checked indeterminate onChange={vi.fn()}>Mixed</Checkbox>
    );
    expect(container.firstChild).not.toHaveClass('arch-checkbox--checked');
    expect(container.firstChild).toHaveClass('arch-checkbox--indeterminate');
  });

  it('applies arch-checkbox--disabled class when disabled', () => {
    const { container } = render(
      <Checkbox disabled onChange={vi.fn()}>Disabled</Checkbox>
    );
    expect(container.firstChild).toHaveClass('arch-checkbox--disabled');
  });

  it('applies arch-checkbox--error class when isError', () => {
    const { container } = render(
      <Checkbox isError onChange={vi.fn()}>Error</Checkbox>
    );
    expect(container.firstChild).toHaveClass('arch-checkbox--error');
  });

  it('sets aria-checked="mixed" when indeterminate', () => {
    render(<Checkbox indeterminate onChange={vi.fn()}>Mixed</Checkbox>);
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'mixed');
  });

  it('sets indeterminate DOM property on the native input', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Checkbox ref={ref} indeterminate onChange={vi.fn()}>Indeterminate</Checkbox>);
    expect(ref.current?.indeterminate).toBe(true);
  });
});

/* ─── Label placement ────────────────────────────────────────────────────────── */

describe('Checkbox — labelPlacement', () => {
  it('applies arch-checkbox--label-start when labelPlacement is start', () => {
    const { container } = render(
      <Checkbox labelPlacement="start" onChange={vi.fn()}>Label</Checkbox>
    );
    expect(container.firstChild).toHaveClass('arch-checkbox--label-start');
  });

  it('does not apply arch-checkbox--label-start by default', () => {
    const { container } = render(<Checkbox onChange={vi.fn()}>Label</Checkbox>);
    expect(container.firstChild).not.toHaveClass('arch-checkbox--label-start');
  });
});

/* ─── onChange ───────────────────────────────────────────────────────────────── */

describe('Checkbox — onChange', () => {
  it('fires onChange when clicked', async () => {
    const user = userEvent.setup();
    const handler = vi.fn();
    render(
      <Checkbox checked={false} onChange={handler}>Click me</Checkbox>
    );
    await user.click(screen.getByRole('checkbox'));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('passes the change event to onChange', async () => {
    const user = userEvent.setup();
    const handler = vi.fn();
    render(
      <Checkbox checked={false} onChange={handler}>Click me</Checkbox>
    );
    await user.click(screen.getByRole('checkbox'));
    expect(handler).toHaveBeenCalledWith(expect.objectContaining({ type: 'change' }));
  });
});

/* ─── Disabled ───────────────────────────────────────────────────────────────── */

describe('Checkbox — disabled state', () => {
  it('has the disabled attribute when disabled', () => {
    render(<Checkbox disabled onChange={vi.fn()}>Disabled</Checkbox>);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('does not fire onChange when disabled', async () => {
    const user = userEvent.setup();
    const handler = vi.fn();
    render(
      <Checkbox disabled onChange={handler}>Disabled</Checkbox>
    );
    await user.click(screen.getByRole('checkbox')).catch(() => {});
    expect(handler).not.toHaveBeenCalled();
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('Checkbox — accessibility', () => {
  it('passes axe with default props', async () => {
    const { container } = render(
      <Checkbox onChange={vi.fn()}>Accessible checkbox</Checkbox>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe when checked', async () => {
    const { container } = render(
      <Checkbox checked onChange={vi.fn()}>Checked</Checkbox>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe when disabled', async () => {
    const { container } = render(
      <Checkbox disabled onChange={vi.fn()}>Disabled</Checkbox>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe in indeterminate state wrapped in fieldset', async () => {
    const { container } = render(
      <fieldset>
        <legend>Options</legend>
        <Checkbox indeterminate onChange={vi.fn()}>Indeterminate</Checkbox>
      </fieldset>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe in error state', async () => {
    const { container } = render(
      <Checkbox isError onChange={vi.fn()}>Error checkbox</Checkbox>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
