import React, { forwardRef, useCallback, useId, useRef, useState } from 'react';
import { useLocale } from '../Locale';
import './Accordion.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export interface AccordionItem {
  /** The header title for this section. Can be a string or ReactNode. */
  title: React.ReactNode;
  /** The content rendered inside the expanded panel. */
  content: React.ReactNode;
  /** When true, this individual item is disabled and cannot be toggled. */
  disabled?: boolean;
}

export interface AccordionProps {
  /** Array of accordion sections. */
  items: AccordionItem[];
  /** When true, multiple sections may be open at the same time. Defaults to false. */
  allowMultiple?: boolean;
  /** Indices of sections expanded on first render. */
  defaultExpanded?: number[];
  /** When true, all accordion panels are disabled and cannot be toggled. Defaults to false. */
  disabled?: boolean;
  /** Called when expanded items change. Receives indices of currently expanded items as strings. */
  onChange?: (expandedItems: string[]) => void;
  /** Additional CSS class names. */
  className?: string;
}

/* ─── Chevron icon ───────────────────────────────────────────────────────────── */

function ChevronDownIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * Accordion
 *
 * A vertically stacked set of interactive headings that reveal or hide
 * associated content panels. Fully keyboard-accessible with arrow-key
 * navigation between headers.
 *
 * @example
 * <Accordion
 *   items={[
 *     { title: 'What is arch-ui?', content: 'A design system.' },
 *     { title: 'How do I install it?', content: 'Run pnpm add @arch-ui/components.' },
 *   ]}
 * />
 */
const Accordion = forwardRef<HTMLDivElement, AccordionProps>(function Accordion(
  { items, allowMultiple = false, defaultExpanded = [], disabled = false, onChange, className },
  ref
) {
  const locale = useLocale();
  const uid = useId();
  const [openIndices, setOpenIndices] = useState<Set<number>>(
    () => new Set(defaultExpanded)
  );
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const toggle = useCallback(
    (index: number) => {
      setOpenIndices((prev) => {
        const next = new Set(prev);
        if (next.has(index)) {
          next.delete(index);
        } else {
          if (!allowMultiple) {
            next.clear();
          }
          next.add(index);
        }
        if (onChange) {
          onChange(Array.from(next).map(String));
        }
        return next;
      });
    },
    [allowMultiple, onChange]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      const count = items.length;
      let nextIndex: number | null = null;

      if (event.key === 'ArrowDown') {
        nextIndex = (index + 1) % count;
      } else if (event.key === 'ArrowUp') {
        nextIndex = (index - 1 + count) % count;
      } else if (event.key === 'Home') {
        nextIndex = 0;
      } else if (event.key === 'End') {
        nextIndex = count - 1;
      }

      if (nextIndex !== null) {
        event.preventDefault();
        triggerRefs.current[nextIndex]?.focus();
      }
    },
    [items.length]
  );

  const classes = ['arch-accordion', disabled ? 'arch-accordion--disabled' : '', className].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes}>
      {items.map((item, index) => {
        const isOpen = openIndices.has(index);
        const triggerId = `${uid}-trigger-${index}`;
        const panelId = `${uid}-panel-${index}`;
        const isItemDisabled = disabled || item.disabled === true;

        return (
          <div key={index} className={`arch-accordion__item${isItemDisabled ? ' arch-accordion__item--disabled' : ''}`}>
            <h3 className="arch-accordion__header">
              <button
                id={triggerId}
                ref={(el) => {
                  triggerRefs.current[index] = el;
                }}
                type="button"
                className="arch-accordion__trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                aria-label={isOpen ? locale.accordion.collapse : locale.accordion.expand}
                aria-disabled={isItemDisabled ? 'true' : undefined}
                onClick={() => {
                  if (!isItemDisabled) toggle(index);
                }}
                onKeyDown={(e) => handleKeyDown(e, index)}
              >
                <span>{item.title}</span>
                <span className="arch-accordion__icon">
                  <ChevronDownIcon />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className="arch-accordion__panel"
              data-open={isOpen ? 'true' : 'false'}
            >
              <div className="arch-accordion__panel-inner">
                <div className="arch-accordion__content">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
});

export { Accordion };
export default Accordion;
