import React, { useState } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { RadioGroup } from './RadioGroup';
import { Radio } from '../Radio/Radio';

/* ─── Helpers ────────────────────────────────────────────────────────────────── */

function ControlledRadioGroup({
  initialValue = '',
  disabled = false,
  direction = 'vertical' as 'vertical' | 'horizontal',
  onChangeSpy = vi.fn(),
}: {
  initialValue?: string;
  disabled?: boolean;
  direction?: 'vertical' | 'horizontal';
  onChangeSpy?: ReturnType<typeof vi.fn>;
}) {
  const [value, setValue] = useState(initialValue);

  function handleChange(v: string) {
    setValue(v);
    onChangeSpy(v);
  }

  return (
    <RadioGroup
      legend="Favourite fruit"
      name="fruit"
      value={value}
      onChange={handleChange}
      disabled={disabled}
      direction={direction}
    >
      <Radio value="apple">Apple</Radio>
      <Radio value="banana">Banana</Radio>
      <Radio value="cherry">Cherry</Radio>
    </RadioGroup>
  );
}

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('RadioGroup — rendering', () => {
  it('renders without crashing', () => {
    render(<ControlledRadioGroup />);
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });

  it('renders a <fieldset> element with role radiogroup', () => {
    render(<ControlledRadioGroup />);
    const fieldset = screen.getByRole('radiogroup');
    expect(fieldset.tagName).toBe('FIELDSET');
  });

  it('renders the legend text', () => {
    render(<ControlledRadioGroup />);
    expect(screen.getByText('Favourite fruit')).toBeInTheDocument();
  });

  it('renders all child Radio options', () => {
    render(<ControlledRadioGroup />);
    expect(screen.getByRole('radio', { name: 'Apple' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Banana' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Cherry' })).toBeInTheDocument();
  });

  it('applies a custom className to the fieldset', () => {
    render(
      <RadioGroup
        legend="Test"
        name="test"
        value=""
        onChange={vi.fn()}
        className="custom-group"
      />
    );
    expect(screen.getByRole('radiogroup')).toHaveClass('custom-group');
  });

  it('forwards a ref to the fieldset', () => {
    const ref = React.createRef<HTMLFieldSetElement>();
    render(
      <RadioGroup ref={ref} legend="Test" name="test" value="" onChange={vi.fn()} />
    );
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('FIELDSET');
  });
});

/* ─── Direction ──────────────────────────────────────────────────────────────── */

describe('RadioGroup — direction', () => {
  it('renders vertical layout by default', () => {
    const { container } = render(<ControlledRadioGroup />);
    const items = container.querySelector('.arch-radio-group__items');
    expect(items).not.toHaveClass('arch-radio-group__items--horizontal');
  });

  it('applies horizontal class when direction is horizontal', () => {
    const { container } = render(<ControlledRadioGroup direction="horizontal" />);
    const items = container.querySelector('.arch-radio-group__items');
    expect(items).toHaveClass('arch-radio-group__items--horizontal');
  });
});

/* ─── Value selection via click ──────────────────────────────────────────────── */

describe('RadioGroup — value selection', () => {
  it('calls onChange with the correct value when a radio is clicked', async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    render(<ControlledRadioGroup onChangeSpy={spy} />);
    await user.click(screen.getByRole('radio', { name: 'Banana' }));
    expect(spy).toHaveBeenCalledWith('banana');
  });

  it('marks the clicked radio as checked', async () => {
    const user = userEvent.setup();
    render(<ControlledRadioGroup />);
    await user.click(screen.getByRole('radio', { name: 'Cherry' }));
    expect(screen.getByRole('radio', { name: 'Cherry' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Apple' })).not.toBeChecked();
  });

  it('reflects the initial selected value', () => {
    render(<ControlledRadioGroup initialValue="apple" />);
    expect(screen.getByRole('radio', { name: 'Apple' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Banana' })).not.toBeChecked();
  });

  it('updates selected radio when value changes', async () => {
    const user = userEvent.setup();
    render(<ControlledRadioGroup initialValue="apple" />);
    expect(screen.getByRole('radio', { name: 'Apple' })).toBeChecked();
    await user.click(screen.getByRole('radio', { name: 'Banana' }));
    expect(screen.getByRole('radio', { name: 'Banana' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Apple' })).not.toBeChecked();
  });
});

/* ─── Arrow key navigation ───────────────────────────────────────────────────── */

describe('RadioGroup — arrow key navigation', () => {
  it('moves to the next radio on ArrowDown', async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    render(<ControlledRadioGroup initialValue="apple" onChangeSpy={spy} />);

    const appleRadio = screen.getByRole('radio', { name: 'Apple' });
    appleRadio.focus();
    await user.keyboard('{ArrowDown}');

    expect(spy).toHaveBeenCalledWith('banana');
  });

  it('moves to the previous radio on ArrowUp', async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    render(<ControlledRadioGroup initialValue="banana" onChangeSpy={spy} />);

    const bananaRadio = screen.getByRole('radio', { name: 'Banana' });
    bananaRadio.focus();
    await user.keyboard('{ArrowUp}');

    expect(spy).toHaveBeenCalledWith('apple');
  });

  it('moves to the next radio on ArrowRight', async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    render(<ControlledRadioGroup initialValue="apple" onChangeSpy={spy} />);

    const appleRadio = screen.getByRole('radio', { name: 'Apple' });
    appleRadio.focus();
    await user.keyboard('{ArrowRight}');

    expect(spy).toHaveBeenCalledWith('banana');
  });

  it('wraps from last to first on ArrowDown', async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    render(<ControlledRadioGroup initialValue="cherry" onChangeSpy={spy} />);

    const cherryRadio = screen.getByRole('radio', { name: 'Cherry' });
    cherryRadio.focus();
    await user.keyboard('{ArrowDown}');

    expect(spy).toHaveBeenCalledWith('apple');
  });

  it('wraps from first to last on ArrowUp', async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    render(<ControlledRadioGroup initialValue="apple" onChangeSpy={spy} />);

    const appleRadio = screen.getByRole('radio', { name: 'Apple' });
    appleRadio.focus();
    await user.keyboard('{ArrowUp}');

    expect(spy).toHaveBeenCalledWith('cherry');
  });
});

/* ─── Disabled ───────────────────────────────────────────────────────────────── */

describe('RadioGroup — disabled', () => {
  it('disables all radios when group is disabled', () => {
    render(<ControlledRadioGroup disabled />);
    const radios = screen.getAllByRole('radio');
    radios.forEach((r) => expect(r).toBeDisabled());
  });

  it('does not call onChange when a disabled group radio is clicked', async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    render(<ControlledRadioGroup disabled onChangeSpy={spy} />);
    await user.click(screen.getByRole('radio', { name: 'Apple' })).catch(() => {});
    expect(spy).not.toHaveBeenCalled();
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('RadioGroup — accessibility', () => {
  it('passes axe with default props', async () => {
    const { container } = render(
      <RadioGroup legend="Favourite colour" name="colour" value="" onChange={vi.fn()}>
        <Radio value="red">Red</Radio>
        <Radio value="green">Green</Radio>
        <Radio value="blue">Blue</Radio>
      </RadioGroup>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe with a selected value', async () => {
    const { container } = render(
      <RadioGroup legend="Favourite colour" name="colour" value="red" onChange={vi.fn()}>
        <Radio value="red">Red</Radio>
        <Radio value="green">Green</Radio>
      </RadioGroup>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe when disabled', async () => {
    const { container } = render(
      <RadioGroup
        legend="Favourite colour"
        name="colour"
        value=""
        onChange={vi.fn()}
        disabled
      >
        <Radio value="red">Red</Radio>
        <Radio value="green">Green</Radio>
      </RadioGroup>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe in horizontal direction', async () => {
    const { container } = render(
      <RadioGroup
        legend="Favourite colour"
        name="colour"
        value=""
        onChange={vi.fn()}
        direction="horizontal"
      >
        <Radio value="red">Red</Radio>
        <Radio value="green">Green</Radio>
      </RadioGroup>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
