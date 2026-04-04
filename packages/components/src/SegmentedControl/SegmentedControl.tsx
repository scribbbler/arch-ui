import React, { forwardRef, useRef, useCallback } from 'react';
import './SegmentedControl.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export interface SegmentedControlOption {
  /** Visible label for this segment. */
  label: string;
  /** Unique identifier for this segment. */
  id: string;
}

export type SegmentedControlSize = 'mini' | 'compact' | 'default' | 'large';

export interface SegmentedControlProps {
  /** Array of segment options. */
  options: SegmentedControlOption[];
  /** The id of the currently active segment (controlled). */
  activeId: string;
  /** Called when the user selects a segment. */
  onChange: (id: string) => void;
  /** Size of the control. Defaults to 'default'. */
  size?: SegmentedControlSize;
  /** Disables the entire control. */
  disabled?: boolean;
  /** Stretches the control to full container width. Defaults to false. */
  fullWidth?: boolean;
  /** Additional class names applied to the root element. */
  className?: string;
}

/* ─── Size class mapping ─────────────────────────────────────────────────────── */

const sizeClassMap: Record<SegmentedControlSize, string> = {
  mini: 'arch-segmented-control--mini',
  compact: 'arch-segmented-control--compact',
  default: 'arch-segmented-control--default',
  large: 'arch-segmented-control--large',
};

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * SegmentedControl
 *
 * A horizontal set of options where one is always selected. Functions like a
 * compact tab bar. Keyboard navigation follows the ARIA radiogroup pattern:
 * arrow keys move between options, Home/End jump to first/last.
 *
 * @example
 * <SegmentedControl
 *   options={[
 *     { label: 'Day', id: 'day' },
 *     { label: 'Week', id: 'week' },
 *     { label: 'Month', id: 'month' },
 *   ]}
 *   activeId="week"
 *   onChange={setActiveId}
 * />
 */
const SegmentedControl = forwardRef<HTMLDivElement, SegmentedControlProps>(
  function SegmentedControl(
    {
      options,
      activeId,
      onChange,
      size = 'default',
      disabled = false,
      fullWidth = false,
      className,
    },
    ref
  ) {
    const segmentRefs = useRef<Array<HTMLButtonElement | null>>([]);

    const focusAt = useCallback((index: number) => {
      const btn = segmentRefs.current[index];
      if (btn) btn.focus();
    }, []);

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
        const enabledIndices = options
          .map((_, i) => i)
          .filter(() => !disabled);

        const currentPos = enabledIndices.indexOf(currentIndex);
        if (currentPos === -1) return;

        let nextIndex: number | undefined;

        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
          event.preventDefault();
          nextIndex =
            currentPos === 0
              ? enabledIndices[enabledIndices.length - 1]
              : enabledIndices[currentPos - 1];
        } else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
          event.preventDefault();
          nextIndex =
            currentPos === enabledIndices.length - 1
              ? enabledIndices[0]
              : enabledIndices[currentPos + 1];
        } else if (event.key === 'Home') {
          event.preventDefault();
          nextIndex = enabledIndices[0];
        } else if (event.key === 'End') {
          event.preventDefault();
          nextIndex = enabledIndices[enabledIndices.length - 1];
        }

        if (nextIndex !== undefined) {
          focusAt(nextIndex);
          onChange(options[nextIndex].id);
        }
      },
      [disabled, focusAt, onChange, options]
    );

    const rootClasses = [
      'arch-segmented-control',
      sizeClassMap[size],
      fullWidth && 'arch-segmented-control--full-width',
      disabled && 'arch-segmented-control--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} role="radiogroup" className={rootClasses}>
        {options.map((option, index) => {
          const isActive = option.id === activeId;

          return (
            <button
              key={option.id}
              ref={(el) => {
                segmentRefs.current[index] = el;
              }}
              role="radio"
              type="button"
              aria-checked={isActive}
              tabIndex={isActive ? 0 : -1}
              disabled={disabled}
              className={[
                'arch-segmented-control__segment',
                isActive && 'arch-segmented-control__segment--active',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => {
                if (!disabled) {
                  onChange(option.id);
                }
              }}
              onKeyDown={(e) => handleKeyDown(e, index)}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    );
  }
);

export { SegmentedControl };
export default SegmentedControl;
