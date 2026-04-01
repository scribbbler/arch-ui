import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Textarea } from './Textarea';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
} from '../FormControl/index';

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('Textarea — rendering', () => {
  it('renders without crashing', () => {
    render(<Textarea aria-label="notes" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders a <textarea> element', () => {
    render(<Textarea aria-label="notes" />);
    expect(screen.getByRole('textbox').tagName).toBe('TEXTAREA');
  });

  it('applies arch-textarea class', () => {
    render(<Textarea aria-label="notes" />);
    expect(screen.getByRole('textbox')).toHaveClass('arch-textarea');
  });

  it('applies default size class arch-textarea--md', () => {
    render(<Textarea aria-label="notes" />);
    expect(screen.getByRole('textbox')).toHaveClass('arch-textarea--md');
  });

  it('applies the correct size class for each size', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach((size) => {
      const { unmount } = render(<Textarea aria-label="notes" size={size} />);
      expect(screen.getByRole('textbox')).toHaveClass(`arch-textarea--${size}`);
      unmount();
    });
  });

  it('applies default rows=3', () => {
    render(<Textarea aria-label="notes" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '3');
  });

  it('applies provided rows value', () => {
    render(<Textarea aria-label="notes" rows={5} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '5');
  });

  it('forwards a ref to the underlying textarea element', () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} aria-label="notes" />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('TEXTAREA');
  });

  it('applies custom className', () => {
    render(<Textarea aria-label="notes" className="my-class" />);
    expect(screen.getByRole('textbox')).toHaveClass('my-class');
  });
});

/* ─── Resize prop ────────────────────────────────────────────────────────────── */

describe('Textarea — resize prop', () => {
  it('applies resize-vertical class by default', () => {
    render(<Textarea aria-label="notes" />);
    expect(screen.getByRole('textbox')).toHaveClass(
      'arch-textarea--resize-vertical'
    );
  });

  it('applies resize-none class when resize="none"', () => {
    render(<Textarea aria-label="notes" resize="none" />);
    expect(screen.getByRole('textbox')).toHaveClass('arch-textarea--resize-none');
  });

  it('applies resize-both class when resize="both"', () => {
    render(<Textarea aria-label="notes" resize="both" />);
    expect(screen.getByRole('textbox')).toHaveClass('arch-textarea--resize-both');
  });

  it('applies auto-resize class and overrides resize when autoResize=true', () => {
    render(<Textarea aria-label="notes" autoResize />);
    const el = screen.getByRole('textbox');
    expect(el).toHaveClass('arch-textarea--auto-resize');
    expect(el).not.toHaveClass('arch-textarea--resize-vertical');
    expect(el).not.toHaveClass('arch-textarea--resize-none');
    expect(el).not.toHaveClass('arch-textarea--resize-both');
  });
});

/* ─── autoResize behaviour ───────────────────────────────────────────────────── */

describe('Textarea — autoResize', () => {
  it('calls onChange when user types', async () => {
    const user = userEvent.setup();
    const handler = vi.fn();
    render(<Textarea aria-label="notes" autoResize onChange={handler} />);
    await user.type(screen.getByRole('textbox'), 'hello');
    expect(handler).toHaveBeenCalled();
  });
});

/* ─── Disabled state ─────────────────────────────────────────────────────────── */

describe('Textarea — disabled state', () => {
  it('is disabled when disabled=true', () => {
    render(<Textarea aria-label="notes" disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('sets aria-disabled="true" when disabled', () => {
    render(<Textarea aria-label="notes" disabled />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-disabled', 'true');
  });

  it('is not disabled when disabled=false', () => {
    render(<Textarea aria-label="notes" disabled={false} />);
    expect(screen.getByRole('textbox')).not.toBeDisabled();
  });
});

/* ─── readOnly state ─────────────────────────────────────────────────────────── */

describe('Textarea — readOnly state', () => {
  it('is read-only when readOnly=true', () => {
    render(<Textarea aria-label="notes" readOnly />);
    expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
  });
});

/* ─── FormControl context integration ────────────────────────────────────────── */

describe('Textarea — FormControl context', () => {
  it('picks up the id from FormControl context', () => {
    render(
      <FormControl id="ta-ctx-id">
        <Textarea />
      </FormControl>
    );
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'ta-ctx-id');
  });

  it('picks up disabled from FormControl context', () => {
    render(
      <FormControl id="ta-ctx-dis" disabled>
        <Textarea />
      </FormControl>
    );
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('picks up required from FormControl context', () => {
    render(
      <FormControl id="ta-ctx-req" required>
        <Textarea />
      </FormControl>
    );
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-required', 'true');
  });

  it('sets aria-invalid when FormControl is invalid', () => {
    render(
      <FormControl id="ta-ctx-inv" invalid>
        <Textarea />
      </FormControl>
    );
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('sets aria-describedby to error id when FormControl is invalid', () => {
    render(
      <FormControl id="ta-ctx-desc" invalid>
        <Textarea />
        <FormErrorMessage>Error</FormErrorMessage>
      </FormControl>
    );
    expect(screen.getByRole('textbox')).toHaveAttribute(
      'aria-describedby',
      expect.stringContaining('ta-ctx-desc-error')
    );
  });

  it('sets aria-describedby to include helper id', () => {
    render(
      <FormControl id="ta-ctx-help">
        <Textarea />
        <FormHelperText>Hint</FormHelperText>
      </FormControl>
    );
    expect(screen.getByRole('textbox')).toHaveAttribute(
      'aria-describedby',
      expect.stringContaining('ta-ctx-help-helper')
    );
  });
});

/* ─── Interaction ────────────────────────────────────────────────────────────── */

describe('Textarea — interaction', () => {
  it('accepts typed input', async () => {
    const user = userEvent.setup();
    render(<Textarea aria-label="notes" />);
    const ta = screen.getByRole('textbox') as HTMLTextAreaElement;
    await user.type(ta, 'hello world');
    expect(ta.value).toBe('hello world');
  });

  it('does not accept input when disabled', async () => {
    const user = userEvent.setup();
    render(<Textarea aria-label="notes" disabled />);
    const ta = screen.getByRole('textbox') as HTMLTextAreaElement;
    await user.type(ta, 'text').catch(() => {});
    expect(ta.value).toBe('');
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('Textarea — accessibility', () => {
  it('passes axe with a label via FormControl', async () => {
    const { container } = render(
      <FormControl id="axe-ta">
        <FormLabel>Bio</FormLabel>
        <Textarea rows={3} />
        <FormHelperText>Tell us about yourself.</FormHelperText>
      </FormControl>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe in invalid state', async () => {
    const { container } = render(
      <FormControl id="axe-ta-invalid" invalid>
        <FormLabel>Bio</FormLabel>
        <Textarea />
        <FormErrorMessage>Bio is required.</FormErrorMessage>
      </FormControl>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe in disabled state', async () => {
    const { container } = render(
      <FormControl id="axe-ta-dis" disabled>
        <FormLabel>Bio</FormLabel>
        <Textarea disabled />
      </FormControl>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe in required state', async () => {
    const { container } = render(
      <FormControl id="axe-ta-req" required>
        <FormLabel>Bio</FormLabel>
        <Textarea required />
      </FormControl>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe with autoResize enabled', async () => {
    const { container } = render(
      <FormControl id="axe-ta-auto">
        <FormLabel>Notes</FormLabel>
        <Textarea autoResize />
      </FormControl>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe with aria-label when used standalone', async () => {
    const { container } = render(
      <Textarea aria-label="Standalone notes field" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
