import React, { forwardRef, Children, isValidElement, cloneElement } from 'react';
import type { ButtonKind, ButtonSize, ButtonShape } from '../Button';
import './ButtonGroup.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export type ButtonGroupMode = 'radio' | 'checkbox';

export interface ButtonGroupProps {
  /** Selection mode. 'radio' allows single selection, 'checkbox' allows multi. Defaults to 'radio'. */
  mode?: ButtonGroupMode;
  /** Currently selected index (radio) or indices (checkbox). */
  selected?: number | number[];
  /** Called when the user selects an option. */
  onChange?: (event: React.MouseEvent, index: number) => void;
  /** Size applied to all child buttons. Defaults to 'default'. */
  size?: ButtonSize;
  /** Shape applied to all child buttons. Defaults to 'default'. */
  shape?: ButtonShape;
  /** Kind applied to all child buttons. Defaults to 'secondary'. */
  kind?: ButtonKind;
  /** Disables the entire group. */
  disabled?: boolean;
  /** Button elements to render inside the group. */
  children?: React.ReactNode;
  /** Additional class names applied to the root element. */
  className?: string;
}

/* ─── Helpers ────────────────────────────────────────────────────────────────── */

function isSelected(index: number, selected: number | number[] | undefined): boolean {
  if (selected === undefined) return false;
  if (Array.isArray(selected)) return selected.includes(index);
  return selected === index;
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * ButtonGroup
 *
 * A group of mutually exclusive (radio) or multi-select (checkbox) buttons.
 * Clones each Button child, injecting shared props for consistent sizing,
 * styling, and selection state.
 *
 * @example
 * <ButtonGroup selected={0} onChange={(e, i) => setSelected(i)}>
 *   <Button>One</Button>
 *   <Button>Two</Button>
 *   <Button>Three</Button>
 * </ButtonGroup>
 */
const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(function ButtonGroup(
  {
    mode = 'radio',
    selected,
    onChange,
    size = 'default',
    shape = 'default',
    kind = 'secondary',
    disabled = false,
    children,
    className,
  },
  ref
) {
  const rootClasses = [
    'arch-button-group',
    shape === 'pill' && 'arch-button-group--pill',
    disabled && 'arch-button-group--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={ref} role="group" className={rootClasses}>
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child;

        const childSelected = isSelected(index, selected);

        return cloneElement(child as React.ReactElement<Record<string, unknown>>, {
          kind,
          size,
          shape,
          disabled,
          isSelected: childSelected,
          className: [
            'arch-button-group__item',
            (child as React.ReactElement<Record<string, unknown>>).props.className,
          ]
            .filter(Boolean)
            .join(' '),
          onClick: (event: React.MouseEvent) => {
            if (!disabled && onChange) {
              onChange(event, index);
            }
          },
        });
      })}
    </div>
  );
});

export { ButtonGroup };
export default ButtonGroup;
