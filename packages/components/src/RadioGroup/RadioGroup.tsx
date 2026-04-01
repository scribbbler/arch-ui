import React, {
  createContext,
  forwardRef,
  useContext,
  useCallback,
  useRef,
} from 'react';
import './RadioGroup.css';

/* ─── Context ────────────────────────────────────────────────────────────────── */

export interface RadioGroupContextValue {
  name: string;
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

export const RadioGroupContext = createContext<RadioGroupContextValue>({
  name: '',
  value: '',
  onChange: () => undefined,
  disabled: false,
});

/**
 * useRadioGroup — read the nearest RadioGroup context.
 * Must be used inside a RadioGroup.
 */
export function useRadioGroup(): RadioGroupContextValue {
  return useContext(RadioGroupContext);
}

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export interface RadioGroupProps {
  /** Accessible label for the group. Rendered as a <legend>. Required. */
  legend: string;
  /** Shared name attribute for all Radio inputs. */
  name: string;
  /** Currently selected radio value. */
  value: string;
  /** Called when the selected value changes. */
  onChange: (value: string) => void;
  /** Layout direction of radio items. Defaults to 'vertical'. */
  direction?: 'vertical' | 'horizontal';
  /** Disables all Radio children. */
  disabled?: boolean;
  /** Radio components to render. */
  children?: React.ReactNode;
  /** Additional CSS class names for the fieldset. */
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * RadioGroup
 *
 * Wraps Radio components in an accessible `<fieldset>` with a `<legend>`.
 * Provides name, value, onChange and disabled via context to child Radio
 * components. Implements arrow key navigation per the ARIA radio group pattern.
 *
 * @example
 * <RadioGroup legend="Preferred size" name="size" value={size} onChange={setSize}>
 *   <Radio value="sm">Small</Radio>
 *   <Radio value="md">Medium</Radio>
 *   <Radio value="lg">Large</Radio>
 * </RadioGroup>
 */
const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  function RadioGroup(
    {
      legend,
      name,
      value,
      onChange,
      direction = 'vertical',
      disabled = false,
      children,
      className,
    },
    ref
  ) {
    const fieldsetRef = useRef<HTMLFieldSetElement>(null);
    const resolvedRef =
      (ref as React.RefObject<HTMLFieldSetElement>) ?? fieldsetRef;

    /* Arrow key navigation — ARIA radio group pattern */
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLFieldSetElement>) => {
        const isArrow = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(
          e.key
        );
        if (!isArrow) return;

        e.preventDefault();

        const fieldset = resolvedRef.current;
        if (!fieldset) return;

        const radios = Array.from(
          fieldset.querySelectorAll<HTMLInputElement>('input[type="radio"]:not(:disabled)')
        );
        if (radios.length === 0) return;

        const currentIndex = radios.findIndex((r) => r.checked);
        const isNext = e.key === 'ArrowDown' || e.key === 'ArrowRight';
        const isPrev = e.key === 'ArrowUp' || e.key === 'ArrowLeft';

        let nextIndex: number;
        if (currentIndex === -1) {
          nextIndex = isNext ? 0 : radios.length - 1;
        } else if (isNext) {
          nextIndex = (currentIndex + 1) % radios.length;
        } else if (isPrev) {
          nextIndex = (currentIndex - 1 + radios.length) % radios.length;
        } else {
          return;
        }

        const nextRadio = radios[nextIndex];
        nextRadio.focus();
        onChange(nextRadio.value);
      },
      [onChange, resolvedRef]
    );

    const fieldsetClasses = ['arch-radio-group', className]
      .filter(Boolean)
      .join(' ');

    const itemsClasses = [
      'arch-radio-group__items',
      direction === 'horizontal' && 'arch-radio-group__items--horizontal',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <RadioGroupContext.Provider value={{ name, value, onChange, disabled }}>
        <fieldset
          ref={resolvedRef}
          className={fieldsetClasses}
          role="radiogroup"
          aria-disabled={disabled || undefined}
          onKeyDown={handleKeyDown}
        >
          <legend className="arch-radio-group__legend">{legend}</legend>
          <div className={itemsClasses}>{children}</div>
        </fieldset>
      </RadioGroupContext.Provider>
    );
  }
);

export { RadioGroup };
export default RadioGroup;
