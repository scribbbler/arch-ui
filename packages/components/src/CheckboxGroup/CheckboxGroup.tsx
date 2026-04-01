import React, { createContext, forwardRef, useContext } from 'react';
import './CheckboxGroup.css';

/* ─── Context ────────────────────────────────────────────────────────────────── */

export interface CheckboxGroupContextValue {
  disabled: boolean;
}

const CheckboxGroupContext = createContext<CheckboxGroupContextValue>({
  disabled: false,
});

/**
 * useCheckboxGroup — read the nearest CheckboxGroup context.
 * Returns defaults when used outside a CheckboxGroup.
 */
export function useCheckboxGroup(): CheckboxGroupContextValue {
  return useContext(CheckboxGroupContext);
}

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export interface CheckboxGroupProps {
  /** Accessible label for the group. Rendered as a <legend>. Required. */
  legend: string;
  /** Layout direction of checkbox items. Defaults to 'vertical'. */
  direction?: 'vertical' | 'horizontal';
  /** Disables all Checkbox children via context. */
  disabled?: boolean;
  /** Checkbox components to render. */
  children?: React.ReactNode;
  /** Additional CSS class names for the fieldset. */
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * CheckboxGroup
 *
 * Wraps related Checkbox components in an accessible `<fieldset>` with a
 * `<legend>`. Propagates `disabled` to all children via context.
 *
 * @example
 * <CheckboxGroup legend="Preferred contact">
 *   <Checkbox value="email" onChange={...}>Email</Checkbox>
 *   <Checkbox value="phone" onChange={...}>Phone</Checkbox>
 * </CheckboxGroup>
 */
const CheckboxGroup = forwardRef<HTMLFieldSetElement, CheckboxGroupProps>(
  function CheckboxGroup(
    { legend, direction = 'vertical', disabled = false, children, className },
    ref
  ) {
    const fieldsetClasses = ['arch-checkbox-group', className]
      .filter(Boolean)
      .join(' ');

    const itemsClasses = [
      'arch-checkbox-group__items',
      direction === 'horizontal' && 'arch-checkbox-group__items--horizontal',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <CheckboxGroupContext.Provider value={{ disabled }}>
        <fieldset ref={ref} className={fieldsetClasses} disabled={disabled}>
          <legend className="arch-checkbox-group__legend">{legend}</legend>
          <div className={itemsClasses}>{children}</div>
        </fieldset>
      </CheckboxGroupContext.Provider>
    );
  }
);

export { CheckboxGroup };
export default CheckboxGroup;
