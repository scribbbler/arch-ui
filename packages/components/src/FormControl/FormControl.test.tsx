import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  useFormControl,
} from './FormControl';

/* ─── FormControl — rendering ─────────────────────────────────────────────────── */

describe('FormControl — rendering', () => {
  it('renders without crashing', () => {
    render(
      <FormControl>
        <span>child</span>
      </FormControl>
    );
    expect(screen.getByText('child')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <FormControl>
        <p data-testid="child">Hello</p>
      </FormControl>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('applies arch-form-control class', () => {
    const { container } = render(<FormControl />);
    expect(container.firstChild).toHaveClass('arch-form-control');
  });

  it('applies custom className', () => {
    const { container } = render(<FormControl className="custom" />);
    expect(container.firstChild).toHaveClass('custom');
  });

  it('forwards a ref to the wrapper div', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<FormControl ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });

  it('uses provided id', () => {
    render(
      <FormControl id="my-field">
        <FormLabel>Name</FormLabel>
      </FormControl>
    );
    expect(screen.getByText('Name').closest('label')).toHaveAttribute(
      'for',
      'my-field'
    );
  });
});

/* ─── FormLabel ──────────────────────────────────────────────────────────────── */

describe('FormLabel', () => {
  it('connects label to input via htmlFor/id', () => {
    render(
      <FormControl id="username">
        <FormLabel>Username</FormLabel>
        <input id="username" type="text" readOnly />
      </FormControl>
    );
    const label = screen.getByText('Username');
    expect(label).toHaveAttribute('for', 'username');
  });

  it('applies arch-form-label class', () => {
    render(
      <FormControl id="test">
        <FormLabel>Label</FormLabel>
      </FormControl>
    );
    expect(screen.getByText('Label')).toHaveClass('arch-form-label');
  });

  it('applies data-required when required=true', () => {
    render(
      <FormControl id="req" required>
        <FormLabel>Required field</FormLabel>
      </FormControl>
    );
    expect(screen.getByText('Required field')).toHaveAttribute(
      'data-required',
      'true'
    );
  });

  it('does not apply data-required when required=false', () => {
    render(
      <FormControl id="opt">
        <FormLabel>Optional field</FormLabel>
      </FormControl>
    );
    expect(screen.getByText('Optional field')).not.toHaveAttribute(
      'data-required'
    );
  });

  it('applies data-disabled when disabled=true', () => {
    render(
      <FormControl id="dis" disabled>
        <FormLabel>Disabled label</FormLabel>
      </FormControl>
    );
    expect(screen.getByText('Disabled label')).toHaveAttribute(
      'data-disabled',
      'true'
    );
  });

  it('forwards a ref to the label element', () => {
    const ref = React.createRef<HTMLLabelElement>();
    render(
      <FormControl id="ref-test">
        <FormLabel ref={ref}>Label</FormLabel>
      </FormControl>
    );
    expect(ref.current?.tagName).toBe('LABEL');
  });
});

/* ─── FormHelperText ──────────────────────────────────────────────────────────── */

describe('FormHelperText', () => {
  it('renders helper text', () => {
    render(
      <FormControl id="help">
        <FormHelperText>Enter your full name</FormHelperText>
      </FormControl>
    );
    expect(screen.getByText('Enter your full name')).toBeInTheDocument();
  });

  it('has the correct id derived from FormControl id', () => {
    render(
      <FormControl id="help-field">
        <FormHelperText>Hint</FormHelperText>
      </FormControl>
    );
    expect(screen.getByText('Hint')).toHaveAttribute('id', 'help-field-helper');
  });

  it('applies arch-form-helper-text class', () => {
    render(
      <FormControl id="h">
        <FormHelperText>Note</FormHelperText>
      </FormControl>
    );
    expect(screen.getByText('Note')).toHaveClass('arch-form-helper-text');
  });
});

/* ─── FormErrorMessage ───────────────────────────────────────────────────────── */

describe('FormErrorMessage', () => {
  it('does NOT render when invalid=false', () => {
    render(
      <FormControl id="err">
        <FormErrorMessage>This field is required</FormErrorMessage>
      </FormControl>
    );
    expect(
      screen.queryByText('This field is required')
    ).not.toBeInTheDocument();
  });

  it('renders when invalid=true', () => {
    render(
      <FormControl id="err" invalid>
        <FormErrorMessage>This field is required</FormErrorMessage>
      </FormControl>
    );
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('has role="alert" when rendered', () => {
    render(
      <FormControl id="err-role" invalid>
        <FormErrorMessage>Error</FormErrorMessage>
      </FormControl>
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('has the correct id derived from FormControl id', () => {
    render(
      <FormControl id="err-id" invalid>
        <FormErrorMessage>Something went wrong</FormErrorMessage>
      </FormControl>
    );
    expect(screen.getByText('Something went wrong')).toHaveAttribute(
      'id',
      'err-id-error'
    );
  });

  it('applies arch-form-error-message class', () => {
    render(
      <FormControl id="err-cls" invalid>
        <FormErrorMessage>Bad input</FormErrorMessage>
      </FormControl>
    );
    expect(screen.getByText('Bad input')).toHaveClass('arch-form-error-message');
  });

  it('shows error message only when invalid state changes to true', () => {
    const { rerender } = render(
      <FormControl id="toggle" invalid={false}>
        <FormErrorMessage>Required</FormErrorMessage>
      </FormControl>
    );
    expect(screen.queryByText('Required')).not.toBeInTheDocument();

    rerender(
      <FormControl id="toggle" invalid={true}>
        <FormErrorMessage>Required</FormErrorMessage>
      </FormControl>
    );
    expect(screen.getByText('Required')).toBeInTheDocument();
  });
});

/* ─── useFormControl hook ────────────────────────────────────────────────────── */

describe('useFormControl', () => {
  it('returns defaults when used outside FormControl', () => {
    let ctx: ReturnType<typeof useFormControl> | undefined;
    function Consumer() {
      ctx = useFormControl();
      return null;
    }
    render(<Consumer />);
    expect(ctx).toEqual({
      id: '',
      required: false,
      disabled: false,
      invalid: false,
    });
  });

  it('returns context values from nearest FormControl', () => {
    let ctx: ReturnType<typeof useFormControl> | undefined;
    function Consumer() {
      ctx = useFormControl();
      return null;
    }
    render(
      <FormControl id="ctx-test" required disabled invalid>
        <Consumer />
      </FormControl>
    );
    expect(ctx?.id).toBe('ctx-test');
    expect(ctx?.required).toBe(true);
    expect(ctx?.disabled).toBe(true);
    expect(ctx?.invalid).toBe(true);
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('FormControl — accessibility', () => {
  it('passes axe with label and helper text', async () => {
    const { container } = render(
      <FormControl id="axe-basic">
        <FormLabel>Email address</FormLabel>
        <input id="axe-basic" type="email" aria-describedby="axe-basic-helper" readOnly />
        <FormHelperText>We will never share your email.</FormHelperText>
      </FormControl>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe in invalid state with error message', async () => {
    const { container } = render(
      <FormControl id="axe-invalid" invalid>
        <FormLabel>Email address</FormLabel>
        <input
          id="axe-invalid"
          type="email"
          aria-invalid="true"
          aria-describedby="axe-invalid-error"
          readOnly
        />
        <FormErrorMessage>A valid email address is required.</FormErrorMessage>
      </FormControl>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe in required state', async () => {
    const { container } = render(
      <FormControl id="axe-required" required>
        <FormLabel>Full name</FormLabel>
        <input id="axe-required" type="text" required aria-required="true" readOnly />
      </FormControl>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe in disabled state', async () => {
    const { container } = render(
      <FormControl id="axe-disabled" disabled>
        <FormLabel>Full name</FormLabel>
        <input id="axe-disabled" type="text" disabled readOnly />
      </FormControl>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
