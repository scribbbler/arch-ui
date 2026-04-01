import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Input } from './Input';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
} from '../FormControl/index';

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('Input — rendering', () => {
  it('renders without crashing', () => {
    render(<Input aria-label="test input" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders a <input> element', () => {
    render(<Input aria-label="field" />);
    expect(screen.getByRole('textbox').tagName).toBe('INPUT');
  });

  it('applies arch-input class', () => {
    render(<Input aria-label="field" />);
    expect(screen.getByRole('textbox')).toHaveClass('arch-input');
  });

  it('applies the default size class arch-input--md', () => {
    render(<Input aria-label="field" />);
    expect(screen.getByRole('textbox')).toHaveClass('arch-input--md');
  });

  it('applies the correct size class for each size', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach((size) => {
      const { unmount } = render(<Input aria-label="field" size={size} />);
      expect(screen.getByRole('textbox')).toHaveClass(`arch-input--${size}`);
      unmount();
    });
  });

  it('forwards a ref to the underlying input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} aria-label="ref input" />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('INPUT');
  });

  it('applies custom className to the wrapper div', () => {
    const { container } = render(<Input aria-label="field" className="my-class" />);
    expect(container.firstChild).toHaveClass('my-class');
  });
});

/* ─── Types ──────────────────────────────────────────────────────────────────── */

describe('Input — type prop', () => {
  it('defaults to type="text"', () => {
    render(<Input aria-label="field" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
  });

  it('renders type="email"', () => {
    render(<Input aria-label="field" type="email" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
  });

  it('renders type="password"', () => {
    render(<Input aria-label="password" type="password" />);
    // password inputs have no implicit role
    expect(document.querySelector('input[type="password"]')).toBeInTheDocument();
  });

  it('renders type="number"', () => {
    render(<Input aria-label="quantity" type="number" />);
    expect(screen.getByRole('spinbutton')).toHaveAttribute('type', 'number');
  });

  it('renders type="search"', () => {
    render(<Input aria-label="search" type="search" />);
    expect(screen.getByRole('searchbox')).toHaveAttribute('type', 'search');
  });

  it('renders type="url"', () => {
    render(<Input aria-label="url" type="url" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'url');
  });

  it('renders type="tel"', () => {
    render(<Input aria-label="phone" type="tel" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'tel');
  });
});

/* ─── Disabled state ─────────────────────────────────────────────────────────── */

describe('Input — disabled state', () => {
  it('is disabled when disabled=true', () => {
    render(<Input aria-label="field" disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('is not disabled when disabled=false', () => {
    render(<Input aria-label="field" disabled={false} />);
    expect(screen.getByRole('textbox')).not.toBeDisabled();
  });

  it('sets aria-disabled="true" when disabled', () => {
    render(<Input aria-label="field" disabled />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-disabled', 'true');
  });
});

/* ─── readOnly state ─────────────────────────────────────────────────────────── */

describe('Input — readOnly state', () => {
  it('is read-only when readOnly=true', () => {
    render(<Input aria-label="field" readOnly />);
    expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
  });
});

/* ─── Element slots ──────────────────────────────────────────────────────────── */

describe('Input — element slots', () => {
  it('renders leftElement inside the wrapper', () => {
    render(
      <Input
        aria-label="search"
        leftElement={<svg data-testid="left-icon" />}
      />
    );
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('renders rightElement inside the wrapper', () => {
    render(
      <Input
        aria-label="field"
        rightElement={<svg data-testid="right-icon" />}
      />
    );
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('applies has-left class when leftElement is present', () => {
    const { container } = render(
      <Input aria-label="field" leftElement={<span />} />
    );
    expect(container.firstChild).toHaveClass('arch-input-wrapper--has-left');
  });

  it('applies has-right class when rightElement is present', () => {
    const { container } = render(
      <Input aria-label="field" rightElement={<span />} />
    );
    expect(container.firstChild).toHaveClass('arch-input-wrapper--has-right');
  });
});

/* ─── FormControl context integration ────────────────────────────────────────── */

describe('Input — FormControl context', () => {
  it('picks up the id from FormControl context', () => {
    render(
      <FormControl id="ctx-id">
        <Input />
      </FormControl>
    );
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'ctx-id');
  });

  it('picks up disabled from FormControl context', () => {
    render(
      <FormControl id="ctx-dis" disabled>
        <Input />
      </FormControl>
    );
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('picks up required from FormControl context', () => {
    render(
      <FormControl id="ctx-req" required>
        <Input />
      </FormControl>
    );
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-required', 'true');
  });

  it('sets aria-invalid when FormControl is invalid', () => {
    render(
      <FormControl id="ctx-inv" invalid>
        <Input />
      </FormControl>
    );
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('sets aria-describedby to error id when FormControl is invalid', () => {
    render(
      <FormControl id="ctx-desc" invalid>
        <Input />
        <FormErrorMessage>Error</FormErrorMessage>
      </FormControl>
    );
    expect(screen.getByRole('textbox')).toHaveAttribute(
      'aria-describedby',
      expect.stringContaining('ctx-desc-error')
    );
  });

  it('sets aria-describedby to include helper id', () => {
    render(
      <FormControl id="ctx-help">
        <Input />
        <FormHelperText>Hint</FormHelperText>
      </FormControl>
    );
    expect(screen.getByRole('textbox')).toHaveAttribute(
      'aria-describedby',
      expect.stringContaining('ctx-help-helper')
    );
  });

  it('explicit id prop overrides context id', () => {
    render(
      <FormControl id="ctx-override">
        <Input id="explicit-id" />
      </FormControl>
    );
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'explicit-id');
  });
});

/* ─── Interaction ────────────────────────────────────────────────────────────── */

describe('Input — interaction', () => {
  it('accepts typed input', async () => {
    const user = userEvent.setup();
    render(<Input aria-label="field" />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    await user.type(input, 'hello');
    expect(input.value).toBe('hello');
  });

  it('does not accept input when disabled', async () => {
    const user = userEvent.setup();
    render(<Input aria-label="field" disabled />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    await user.type(input, 'text').catch(() => {});
    expect(input.value).toBe('');
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('Input — accessibility', () => {
  it('passes axe with a label via FormControl', async () => {
    const { container } = render(
      <FormControl id="axe-input">
        <FormLabel>Email address</FormLabel>
        <Input type="email" />
        <FormHelperText>We will never share your email.</FormHelperText>
      </FormControl>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe in invalid state', async () => {
    const { container } = render(
      <FormControl id="axe-input-invalid" invalid>
        <FormLabel>Email address</FormLabel>
        <Input type="email" />
        <FormErrorMessage>A valid email is required.</FormErrorMessage>
      </FormControl>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe in disabled state', async () => {
    const { container } = render(
      <FormControl id="axe-input-dis" disabled>
        <FormLabel>Username</FormLabel>
        <Input />
      </FormControl>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe with aria-label when used standalone', async () => {
    const { container } = render(
      <Input aria-label="Standalone search field" type="search" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
