import React, {
  createContext,
  forwardRef,
  useContext,
  useId,
} from 'react';
import './FormControl.css';

/* ─── Context ─────────────────────────────────────────────────────────────────── */

export interface FormControlContextValue {
  /** The root field id shared by label, input, helper text, and error message. */
  id: string;
  /** Whether the field is required. */
  required: boolean;
  /** Whether the field is disabled. */
  disabled: boolean;
  /** Whether the field is in an invalid / error state. */
  invalid: boolean;
}

const FormControlContext = createContext<FormControlContextValue | null>(null);

/**
 * useFormControl
 *
 * Returns the nearest FormControl context. Safe to call outside a FormControl —
 * returns sensible defaults so standalone inputs still work.
 */
export function useFormControl(): FormControlContextValue {
  const ctx = useContext(FormControlContext);
  return ctx ?? { id: '', required: false, disabled: false, invalid: false };
}

/* ─── FormControl ─────────────────────────────────────────────────────────────── */

export interface FormControlProps {
  /**
   * Root id for the field group. Auto-generated via useId when not provided.
   * Supply an explicit id when server-rendering to avoid hydration mismatches.
   */
  id?: string;
  /** Marks the field as required. Propagated via context. */
  required?: boolean;
  /** Disables the entire field group. Propagated via context. */
  disabled?: boolean;
  /** Puts the field into an invalid / error state. Propagated via context. */
  invalid?: boolean;
  children?: React.ReactNode;
  className?: string;
}

/**
 * FormControl
 *
 * A context-providing wrapper that connects a label, input, helper text, and
 * error message through shared ARIA ids and state. Place FormLabel, an input
 * component, and optionally FormHelperText / FormErrorMessage as children.
 *
 * @example
 * <FormControl id="email" required invalid={hasError}>
 *   <FormLabel>Email address</FormLabel>
 *   <Input type="email" />
 *   <FormHelperText>We'll never share your email.</FormHelperText>
 *   <FormErrorMessage>A valid email is required.</FormErrorMessage>
 * </FormControl>
 */
const FormControl = forwardRef<HTMLDivElement, FormControlProps>(
  function FormControl(
    {
      id: idProp,
      required = false,
      disabled = false,
      invalid = false,
      children,
      className,
    },
    ref
  ) {
    const generatedId = useId();
    const id = idProp ?? generatedId;

    const contextValue: FormControlContextValue = {
      id,
      required,
      disabled,
      invalid,
    };

    const classes = ['arch-form-control', className].filter(Boolean).join(' ');

    return (
      <FormControlContext.Provider value={contextValue}>
        <div ref={ref} className={classes}>
          {children}
        </div>
      </FormControlContext.Provider>
    );
  }
);

/* ─── FormLabel ──────────────────────────────────────────────────────────────── */

export interface FormLabelProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * FormLabel
 *
 * Renders a `<label>` whose `htmlFor` is wired to the nearest FormControl id.
 * Must be used inside a FormControl.
 */
const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(
  function FormLabel({ children, className }, ref) {
    const { id, required, disabled } = useFormControl();

    const classes = ['arch-form-label', className].filter(Boolean).join(' ');

    return (
      <label
        ref={ref}
        htmlFor={id || undefined}
        className={classes}
        data-required={required ? 'true' : undefined}
        data-disabled={disabled ? 'true' : undefined}
      >
        {children}
      </label>
    );
  }
);

/* ─── FormHelperText ──────────────────────────────────────────────────────────── */

export interface FormHelperTextProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * FormHelperText
 *
 * Renders persistent guidance text below the input. Its id (`{id}-helper`) is
 * referenced by the input's aria-describedby.
 */
const FormHelperText = forwardRef<HTMLDivElement, FormHelperTextProps>(
  function FormHelperText({ children, className }, ref) {
    const { id } = useFormControl();

    const classes = ['arch-form-helper-text', className]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} id={id ? `${id}-helper` : undefined} className={classes}>
        {children}
      </div>
    );
  }
);

/* ─── FormErrorMessage ───────────────────────────────────────────────────────── */

export interface FormErrorMessageProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * FormErrorMessage
 *
 * Renders a validation error below the input. Only mounts when the nearest
 * FormControl's `invalid` is true — mounting/unmounting triggers the
 * `role="alert"` announcement in screen readers.
 *
 * Its id (`{id}-error`) is referenced by the input's aria-describedby.
 */
const FormErrorMessage = forwardRef<HTMLDivElement, FormErrorMessageProps>(
  function FormErrorMessage({ children, className }, ref) {
    const { id, invalid } = useFormControl();

    if (!invalid) return null;

    const classes = ['arch-form-error-message', className]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        id={id ? `${id}-error` : undefined}
        role="alert"
        aria-live="polite"
        className={classes}
      >
        {children}
      </div>
    );
  }
);

/* ─── Exports ─────────────────────────────────────────────────────────────────── */

export { FormControl, FormLabel, FormHelperText, FormErrorMessage };
export default FormControl;
