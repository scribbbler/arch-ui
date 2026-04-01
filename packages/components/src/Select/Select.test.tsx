import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Select } from './Select';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
} from '../FormControl/index';

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('Select — rendering', () => {
  it('renders without crashing', () => {
    render(<Select aria-label="pick one" />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders a native <select> element', () => {
    render(<Select aria-label="pick one" />);
    expect(screen.getByRole('combobox').tagName).toBe('SELECT');
  });

  it('applies the arch-select class', () => {
    render(<Select aria-label="pick one" />);
    expect(screen.getByRole('combobox')).toHaveClass('arch-select');
  });

  it('applies the default md size class', () => {
    render(<Select aria-label="pick one" />);
    expect(screen.getByRole('combobox')).toHaveClass('arch-select--md');
  });

  it('applies the correct size class for each size', () => {
    (['sm', 'md', 'lg'] as const).forEach((size) => {
      const { unmount } = render(
        <Select aria-label="pick one" size={size} />
      );
      expect(screen.getByRole('combobox')).toHaveClass(`arch-select--${size}`);
      unmount();
    });
  });

  it('renders option children', () => {
    render(
      <Select aria-label="country">
        <option value="us">United States</option>
        <option value="ca">Canada</option>
      </Select>
    );
    expect(screen.getByRole('option', { name: 'United States' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Canada' })).toBeInTheDocument();
  });

  it('forwards ref to the underlying select element', () => {
    const ref = React.createRef<HTMLSelectElement>();
    render(<Select ref={ref} aria-label="pick one" />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('SELECT');
  });

  it('applies custom className to the wrapper div', () => {
    const { container } = render(
      <Select aria-label="pick one" className="my-select" />
    );
    expect(container.firstChild).toHaveClass('my-select');
  });
});

/* ─── Placeholder ─────────────────────────────────────────────────────────────── */

describe('Select — placeholder', () => {
  it('renders a placeholder option when placeholder prop is provided', () => {
    render(
      <Select aria-label="country" placeholder="Select a country" />
    );
    expect(
      screen.getByRole('option', { name: 'Select a country' })
    ).toBeInTheDocument();
  });

  it('placeholder option is disabled', () => {
    render(
      <Select aria-label="country" placeholder="Select a country" />
    );
    const option = screen.getByRole('option', {
      name: 'Select a country',
    }) as HTMLOptionElement;
    expect(option.disabled).toBe(true);
  });

  it('placeholder option has empty value', () => {
    render(
      <Select aria-label="country" placeholder="Pick one" />
    );
    const option = screen.getByRole('option', { name: 'Pick one' }) as HTMLOptionElement;
    expect(option.value).toBe('');
  });
});

/* ─── Disabled state ─────────────────────────────────────────────────────────── */

describe('Select — disabled state', () => {
  it('is disabled when disabled=true', () => {
    render(<Select aria-label="pick one" disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('sets aria-disabled="true" when disabled', () => {
    render(<Select aria-label="pick one" disabled />);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-disabled', 'true');
  });
});

/* ─── Error state ─────────────────────────────────────────────────────────────── */

describe('Select — error state', () => {
  it('applies arch-select--error class when isError=true', () => {
    render(<Select aria-label="pick one" isError />);
    expect(screen.getByRole('combobox')).toHaveClass('arch-select--error');
  });

  it('sets aria-invalid="true" when isError=true', () => {
    render(<Select aria-label="pick one" isError />);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('does not have error class when isError=false', () => {
    render(<Select aria-label="pick one" isError={false} />);
    expect(screen.getByRole('combobox')).not.toHaveClass('arch-select--error');
  });
});

/* ─── Multiple ───────────────────────────────────────────────────────────────── */

describe('Select — multiple', () => {
  it('renders as a listbox when multiple=true', () => {
    render(<Select aria-label="choose items" multiple />);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });
});

/* ─── FormControl context integration ────────────────────────────────────────── */

describe('Select — FormControl context', () => {
  it('picks up id from FormControl context', () => {
    render(
      <FormControl id="ctx-select">
        <Select />
      </FormControl>
    );
    expect(screen.getByRole('combobox')).toHaveAttribute('id', 'ctx-select');
  });

  it('picks up disabled from FormControl context', () => {
    render(
      <FormControl id="ctx-sel-dis" disabled>
        <Select />
      </FormControl>
    );
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('picks up required from FormControl context', () => {
    render(
      <FormControl id="ctx-sel-req" required>
        <Select />
      </FormControl>
    );
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-required', 'true');
  });

  it('sets aria-invalid when FormControl is invalid', () => {
    render(
      <FormControl id="ctx-sel-inv" invalid>
        <Select />
      </FormControl>
    );
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('sets aria-describedby to error id when FormControl is invalid', () => {
    render(
      <FormControl id="ctx-sel-desc" invalid>
        <Select />
        <FormErrorMessage>Please select an option.</FormErrorMessage>
      </FormControl>
    );
    expect(screen.getByRole('combobox')).toHaveAttribute(
      'aria-describedby',
      expect.stringContaining('ctx-sel-desc-error')
    );
  });

  it('sets aria-describedby to include helper id', () => {
    render(
      <FormControl id="ctx-sel-help">
        <Select />
        <FormHelperText>Choose from the list.</FormHelperText>
      </FormControl>
    );
    expect(screen.getByRole('combobox')).toHaveAttribute(
      'aria-describedby',
      expect.stringContaining('ctx-sel-help-helper')
    );
  });

  it('explicit id prop overrides context id', () => {
    render(
      <FormControl id="ctx-override">
        <Select id="explicit-sel-id" />
      </FormControl>
    );
    expect(screen.getByRole('combobox')).toHaveAttribute('id', 'explicit-sel-id');
  });
});

/* ─── Interaction ────────────────────────────────────────────────────────────── */

describe('Select — interaction', () => {
  it('fires onChange when an option is selected', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Select aria-label="country" onChange={onChange}>
        <option value="us">United States</option>
        <option value="ca">Canada</option>
      </Select>
    );
    await user.selectOptions(screen.getByRole('combobox'), 'us');
    expect(onChange).toHaveBeenCalled();
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('Select — accessibility', () => {
  it('passes axe with a label via FormControl', async () => {
    const { container } = render(
      <FormControl id="axe-select">
        <FormLabel>Country</FormLabel>
        <Select placeholder="Select a country">
          <option value="us">United States</option>
        </Select>
        <FormHelperText>Where are you based?</FormHelperText>
      </FormControl>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe in invalid state', async () => {
    const { container } = render(
      <FormControl id="axe-select-invalid" invalid>
        <FormLabel>Country</FormLabel>
        <Select>
          <option value="us">United States</option>
        </Select>
        <FormErrorMessage>Please select a country.</FormErrorMessage>
      </FormControl>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe in disabled state', async () => {
    const { container } = render(
      <FormControl id="axe-select-dis" disabled>
        <FormLabel>Country</FormLabel>
        <Select>
          <option value="us">United States</option>
        </Select>
      </FormControl>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe with aria-label when used standalone', async () => {
    const { container } = render(
      <Select aria-label="Select a country">
        <option value="us">United States</option>
      </Select>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
