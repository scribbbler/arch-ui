import React, { forwardRef, useId } from 'react';
import { useFormControl } from '../FormControl/index';
import './Toggle.css';

/* ─── Types ───────────────────────────────────────────────────────────────────── */

export type ToggleSize = 'xs' | 'sm' | 'md';

export interface ToggleProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Whether the toggle is in the on (checked) state. */
  checked?: boolean;
  /** Whether the toggle is disabled. Also picked up from nearest FormControl context. */
  disabled?: boolean;
  /** Callback fired when the checked state changes. */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Optional label text rendered beside the track. */
  children?: React.ReactNode;
  /** Size variant. sm = 32px wide track, md = 44px wide track. Defaults to 'md'. */
  size?: ToggleSize;
  /** Additional CSS class names applied to the outermost wrapper element. */
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * Toggle
 *
 * A binary on/off switch rendered as a styled checkbox with role="switch".
 * Thumb position communicates state without relying on colour alone.
 * When placed inside a FormControl, it automatically inherits disabled and
 * required state.
 *
 * @example
 * // Standalone
 * <Toggle aria-label="Enable notifications" />
 *
 * // With label text
 * <Toggle>Enable notifications</Toggle>
 *
 * // Inside FormControl
 * <FormControl id="notifications" disabled>
 *   <Toggle>Enable notifications</Toggle>
 * </FormControl>
 */
const Toggle = forwardRef<HTMLInputElement, ToggleProps>(function Toggle(
  {
    checked,
    disabled: disabledProp,
    onChange,
    children,
    size = 'md',
    className,
    id: idProp,
    ...rest
  },
  ref
) {
  const ctx = useFormControl();
  const generatedId = useId();

  /* Merge props with context — explicit props take priority */
  const id = idProp ?? (ctx.id ? ctx.id : generatedId);
  const disabled = disabledProp ?? ctx.disabled;
  const required = rest.required ?? ctx.required;

  const wrapperClasses = [
    'arch-toggle',
    `arch-toggle--${size}`,
    disabled ? 'arch-toggle--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={wrapperClasses} htmlFor={id}>
      <input
        {...rest}
        ref={ref}
        id={id}
        type="checkbox"
        role="switch"
        checked={checked}
        disabled={disabled}
        required={required}
        onChange={onChange}
        aria-checked={checked}
        aria-disabled={disabled ? true : undefined}
        aria-required={required ? true : undefined}
        className="arch-toggle__input"
      />
      <span className="arch-toggle__track" aria-hidden="true">
        <span className="arch-toggle__thumb" />
      </span>
      {children && (
        <span className="arch-toggle__label">{children}</span>
      )}
    </label>
  );
});

export { Toggle };
export default Toggle;
