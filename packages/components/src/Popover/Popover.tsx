import React, {
  useRef,
  useEffect,
  useCallback,
  useId,
} from 'react';
import { Portal } from '../Portal';
import { Overlay } from '../Overlay';
import { FocusTrap } from '../FocusTrap';
import './Popover.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export type PopoverPosition = 'top' | 'bottom' | 'start' | 'end';

export interface PopoverProps {
  /** The interactive content rendered inside the popover panel. */
  content: React.ReactNode;
  /**
   * Preferred position of the popover relative to the trigger.
   * Defaults to 'bottom'.
   */
  position?: PopoverPosition;
  /** Controls whether the popover is visible. */
  isOpen: boolean;
  /** Called when the popover should close (Escape, outside click). */
  onClose: () => void;
  /** The trigger element. Must be a single focusable React element. */
  children: React.ReactElement;
}

interface Coords {
  top: number;
  left: number;
}

/* ─── Helpers ────────────────────────────────────────────────────────────────── */

function computePosition(
  triggerRect: DOMRect,
  popoverEl: HTMLElement,
  position: PopoverPosition
): Coords {
  const popoverRect = popoverEl.getBoundingClientRect();
  const GAP = 8;
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  switch (position) {
    case 'top':
      return {
        top: triggerRect.top + scrollY - popoverRect.height - GAP,
        left: triggerRect.left + scrollX + triggerRect.width / 2 - popoverRect.width / 2,
      };
    case 'start':
      return {
        top: triggerRect.top + scrollY + triggerRect.height / 2 - popoverRect.height / 2,
        left: triggerRect.left + scrollX - popoverRect.width - GAP,
      };
    case 'end':
      return {
        top: triggerRect.top + scrollY + triggerRect.height / 2 - popoverRect.height / 2,
        left: triggerRect.right + scrollX + GAP,
      };
    case 'bottom':
    default:
      return {
        top: triggerRect.bottom + scrollY + GAP,
        left: triggerRect.left + scrollX + triggerRect.width / 2 - popoverRect.width / 2,
      };
  }
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * Popover
 *
 * An interactive overlay panel triggered by clicking a reference element.
 * Closes on Escape and outside click. Manages focus on open and close via
 * FocusTrap and focus restoration.
 *
 * @example
 * <Popover
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   content={<MenuItems />}
 * >
 *   <button onClick={() => setIsOpen(o => !o)}>Open menu</button>
 * </Popover>
 */
function Popover({
  content,
  position = 'bottom',
  isOpen,
  onClose,
  children,
}: PopoverProps) {
  const popoverId = useId();
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const coordsRef = useRef<Coords>({ top: 0, left: 0 });
  const [coords, setCoords] = React.useState<Coords>({ top: 0, left: 0 });

  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !popoverRef.current) return;
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const newCoords = computePosition(triggerRect, popoverRef.current, position);
    coordsRef.current = newCoords;
    setCoords(newCoords);
  }, [position]);

  /* Position and focus management on open. */
  useEffect(() => {
    if (isOpen) {
      /* Position on next tick after render. */
      const id = window.setTimeout(() => {
        updatePosition();
      }, 0);
      return () => window.clearTimeout(id);
    }
    return undefined;
  }, [isOpen, updatePosition]);

  /* Escape key handler. */
  useEffect(() => {
    if (!isOpen) return undefined;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    const child = React.Children.only(children) as React.ReactElement<
      React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }
    >;

    return React.cloneElement(child, {
      ref: (node: HTMLElement | null) => {
        triggerRef.current = node;
        const existingRef = (child as { ref?: React.Ref<HTMLElement> }).ref;
        if (typeof existingRef === 'function') existingRef(node);
        else if (existingRef && typeof existingRef === 'object') {
          (existingRef as React.MutableRefObject<HTMLElement | null>).current = node;
        }
      },
      'aria-expanded': false,
      'aria-haspopup': 'dialog',
    } as React.HTMLAttributes<HTMLElement>);
  }

  const child = React.Children.only(children) as React.ReactElement<
    React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }
  >;

  const clonedTrigger = React.cloneElement(child, {
    ref: (node: HTMLElement | null) => {
      triggerRef.current = node;
      const existingRef = (child as { ref?: React.Ref<HTMLElement> }).ref;
      if (typeof existingRef === 'function') existingRef(node);
      else if (existingRef && typeof existingRef === 'object') {
        (existingRef as React.MutableRefObject<HTMLElement | null>).current = node;
      }
    },
    'aria-expanded': true,
    'aria-haspopup': 'dialog',
    'aria-controls': popoverId,
  } as React.HTMLAttributes<HTMLElement>);

  return (
    <>
      {clonedTrigger}
      <Portal>
        {/* Transparent overlay for click-outside detection */}
        <Overlay transparent onClick={onClose} />
        <FocusTrap active={isOpen} restoreFocus>
          <div
            id={popoverId}
            ref={popoverRef}
            role="dialog"
            aria-modal="true"
            className="arch-popover"
            style={{ top: coords.top, left: coords.left, position: 'absolute' }}
          >
            {content}
          </div>
        </FocusTrap>
      </Portal>
    </>
  );
}

export { Popover };
export default Popover;
