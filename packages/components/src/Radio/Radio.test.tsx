import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Radio } from './Radio';
import { RadioGroup } from '../RadioGroup/RadioGroup';

/* ─── Helpers ────────────────────────────────────────────────────────────────── */

function WrappedRadio({
  value = 'a',
  selectedValue = '',
  disabled = false,
  groupDisabled = false,
  onChange = vi.fn(),
  children = 'Option A',
}: {
  value?: string;
  selectedValue?: string;
  disabled?: boolean;
  groupDisabled?: boolean;
  onChange?: (v: string) => void;
  children?: React.ReactNode;
}) {
  return (
    <RadioGroup
      legend="Test group"
      name="test"
      value={selectedValue}
      onChange={onChange}
      disabled={groupDisabled}
    >
      <Radio value={value} disabled={disabled}>
        {children}
      </Radio>
    </RadioGroup>
  );
}

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('Radio — rendering', () => {
  it('renders without crashing', () => {
    render(<WrappedRadio />);
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('renders a real <input type="radio">', () => {
    render(<WrappedRadio />);
    const input = screen.getByRole('radio');
    expect(input.tagName).toBe('INPUT');
    expect(input).toHaveAttribute('type', 'radio');
  });

  it('renders label text as children', () => {
    render(<WrappedRadio>My radio label</WrappedRadio>);
    expect(screen.getByText('My radio label')).toBeInTheDocument();
  });

  it('forwards a ref to the native input', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(
      <RadioGroup legend="Test" name="test" value="" onChange={vi.fn()}>
        <Radio ref={ref} value="a">Option A</Radio>
      </RadioGroup>
    );
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('INPUT');
  });

  it('applies a custom className to the wrapper label', () => {
    render(
      <RadioGroup legend="Test" name="test" value="" onChange={vi.fn()}>
        <Radio value="a" className="my-radio">Option A</Radio>
      </RadioGroup>
    );
    const label = screen.getByRole('radio').closest('label');
    expect(label).toHaveClass('my-radio');
  });
});

/* ─── Selected state ─────────────────────────────────────────────────────────── */

describe('Radio — selected state', () => {
  it('applies arch-radio--selected class when its value matches group value', () => {
    render(<WrappedRadio value="a" selectedValue="a" />);
    const label = screen.getByRole('radio').closest('label');
    expect(label).toHaveClass('arch-radio--selected');
  });

  it('does not apply arch-radio--selected when value does not match', () => {
    render(<WrappedRadio value="a" selectedValue="b" />);
    const label = screen.getByRole('radio').closest('label');
    expect(label).not.toHaveClass('arch-radio--selected');
  });

  it('is checked when selected', () => {
    render(<WrappedRadio value="a" selectedValue="a" />);
    expect(screen.getByRole('radio')).toBeChecked();
  });

  it('is not checked when not selected', () => {
    render(<WrappedRadio value="a" selectedValue="b" />);
    expect(screen.getByRole('radio')).not.toBeChecked();
  });
});

/* ─── Disabled state ─────────────────────────────────────────────────────────── */

describe('Radio — disabled state', () => {
  it('is disabled when disabled prop is true', () => {
    render(<WrappedRadio disabled />);
    expect(screen.getByRole('radio')).toBeDisabled();
  });

  it('applies arch-radio--disabled class when disabled', () => {
    render(<WrappedRadio disabled />);
    const label = screen.getByRole('radio').closest('label');
    expect(label).toHaveClass('arch-radio--disabled');
  });

  it('is disabled when parent group is disabled', () => {
    render(<WrappedRadio groupDisabled />);
    expect(screen.getByRole('radio')).toBeDisabled();
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('Radio — accessibility', () => {
  it('passes axe when unselected', async () => {
    const { container } = render(
      <RadioGroup legend="Colour" name="colour" value="" onChange={vi.fn()}>
        <Radio value="red">Red</Radio>
        <Radio value="blue">Blue</Radio>
      </RadioGroup>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe when one radio is selected', async () => {
    const { container } = render(
      <RadioGroup legend="Colour" name="colour" value="red" onChange={vi.fn()}>
        <Radio value="red">Red</Radio>
        <Radio value="blue">Blue</Radio>
      </RadioGroup>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe when disabled', async () => {
    const { container } = render(
      <RadioGroup legend="Colour" name="colour" value="" onChange={vi.fn()} disabled>
        <Radio value="red">Red</Radio>
      </RadioGroup>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
