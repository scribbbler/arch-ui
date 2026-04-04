import React, { forwardRef, useCallback, useRef, useState } from 'react';
import { Button } from '../Button';
import { useFormControl } from '../FormControl/index';
import './Textarea.css';

/* ─── Types ───────────────────────────────────────────────────────────────────── */

export type TextareaResize = 'none' | 'vertical' | 'both';
export type TextareaSize = 'xs' | 'sm' | 'md' | 'lg';

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  /** Initial visible number of text lines. Defaults to 3. */
  rows?: number;
  /**
   * CSS resize behaviour. Defaults to 'vertical'.
   * Automatically overridden to 'none' when autoResize is true.
   */
  resize?: TextareaResize;
  /**
   * When true, the textarea grows to fit its content by setting height to
   * scrollHeight on every input event. resize is forced to 'none'.
   */
  autoResize?: boolean;
  /** Shows a clear button when the textarea has content. */
  clearable?: boolean;
  /** Shows a positive (success/valid) border style. */
  positive?: boolean;
  /** Size variant — controls padding and font size. Defaults to 'md'. */
  size?: TextareaSize;
  /** Disables the textarea. Also inherited from FormControl context. */
  disabled?: boolean;
  /** Makes the textarea read-only. */
  readOnly?: boolean;
  /** Additional CSS class names applied to the textarea element. */
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * Textarea
 *
 * A multi-line text input. When placed inside a FormControl, it automatically
 * inherits the field id, required state, disabled state, invalid state, and
 * aria-describedby wiring.
 *
 * @example
 * // Standalone
 * <Textarea rows={5} placeholder="Leave a comment…" aria-label="Comment" />
 *
 * // Inside FormControl
 * <FormControl id="bio" required>
 *   <FormLabel>Bio</FormLabel>
 *   <Textarea rows={4} autoResize />
 *   <FormHelperText>Tell us a little about yourself.</FormHelperText>
 * </FormControl>
 */
const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      rows = 3,
      resize = 'vertical',
      autoResize = false,
      clearable = false,
      positive = false,
      size = 'md',
      disabled: disabledProp,
      readOnly,
      className,
      id: idProp,
      'aria-describedby': ariaDescribedByProp,
      'aria-invalid': ariaInvalidProp,
      onChange,
      ...rest
    },
    ref
  ) {
    const ctx = useFormControl();

    /* Merge props with context — explicit props take priority */
    const id = idProp ?? ctx.id ?? undefined;
    const disabled = disabledProp ?? ctx.disabled;
    const required = rest.required ?? ctx.required;
    const invalid =
      ariaInvalidProp !== undefined ? ariaInvalidProp : ctx.invalid || undefined;

    /* Build aria-describedby from context ids when inside a FormControl */
    const describedByParts: string[] = [];
    if (ariaDescribedByProp) {
      describedByParts.push(ariaDescribedByProp as string);
    } else if (ctx.id) {
      if (ctx.invalid) describedByParts.push(`${ctx.id}-error`);
      describedByParts.push(`${ctx.id}-helper`);
    }
    const ariaDescribedBy =
      describedByParts.length > 0 ? describedByParts.join(' ') : undefined;

    /* autoResize — grow the textarea to fit its content */
    const internalRef = useRef<HTMLTextAreaElement | null>(null);

    const setRef = useCallback(
      (node: HTMLTextAreaElement | null) => {
        internalRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current =
            node;
        }
      },
      [ref]
    );

    /* Track value internally for clearable display */
    const [internalValue, setInternalValue] = useState('');
    const currentValue = rest.value !== undefined ? String(rest.value) : internalValue;

    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInternalValue(event.target.value);
        if (autoResize && internalRef.current) {
          const el = internalRef.current;
          /* Reset height first so scrollHeight reports the natural content height */
          el.style.height = 'auto';
          el.style.height = `${el.scrollHeight}px`;
        }
        onChange?.(event);
      },
      [autoResize, onChange]
    );

    const showClear = clearable && !disabled && !readOnly && currentValue !== '';

    function handleClear() {
      setInternalValue('');
      if (onChange) {
        const syntheticEvent = {
          target: { ...internalRef.current, value: '' },
          currentTarget: { ...internalRef.current, value: '' },
        } as React.ChangeEvent<HTMLTextAreaElement>;
        onChange(syntheticEvent);
      }
      internalRef.current?.focus();
    }

    const effectiveResize = autoResize ? 'none' : resize;

    const classes = [
      'arch-textarea',
      `arch-textarea--${size}`,
      positive && !invalid ? 'arch-textarea--positive' : '',
      autoResize
        ? 'arch-textarea--auto-resize'
        : `arch-textarea--resize-${effectiveResize}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const wrapperClasses = [
      'arch-textarea-wrapper',
      showClear && 'arch-textarea-wrapper--clearable',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={wrapperClasses}>
        <textarea
          {...rest}
          ref={setRef}
          id={id}
          rows={rows}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          aria-required={required ? true : undefined}
          aria-invalid={invalid ? true : undefined}
          aria-disabled={disabled ? true : undefined}
          aria-describedby={ariaDescribedBy}
          className={classes}
          onChange={handleChange}
        />
        {showClear && (
          <Button
            kind="tertiary"
            size="compact"
            shape="square"
            className="arch-textarea__clear"
            onClick={handleClear}
            aria-label="Clear textarea"
            tabIndex={-1}
            startEnhancer={<span aria-hidden="true">&times;</span>}
          />
        )}
      </div>
    );
  }
);

export { Textarea };
export default Textarea;
