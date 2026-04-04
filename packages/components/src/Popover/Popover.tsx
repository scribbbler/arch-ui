import React, {
  useRef,
  useEffect,
  useCallback,
  useId,
  useState,
} from 'react';
import { Portal } from '../Portal';
import { Overlay } from '../Overlay';
import { FocusTrap } from '../FocusTrap';
import './Popover.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export type PopoverPosition = 'top' | 'bottom' | 'start' | 'end';
export type PopoverTriggerType = 'click' | 'hover';

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
  /** Called when the popover should open (used with triggerType='hover'). */
  onOpen?: () => void;
  /** How the popover is triggered. Defaults to 'click'. */
  triggerType?: PopoverTriggerType;
  /** When true, renders an arrow element pointing toward the trigger. Defaults to false. */
  showArrow?: boolean;
  /** Delay in ms before showing the popover on mouse enter (hover trigger only). */
  onMouseEnterDelay?: number;
  /** Delay in ms before hiding the popover on mouse leave (hover trigger only). */
  onMouseLeaveDelay?: number;
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
  onOpen,
  triggerType = 'click',
  showArrow = false,
  onMouseEnterDelay = 200,
  onMouseLeaveDelay = 200,
  children,
}: PopoverProps) {
  const popoverId = useId();
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const coordsRef = useRef<Coords>({ top: 0, left: 0 });
  const [coords, setCoords] = useState<Coords>({ top: 0, left: 0 });
  const enterTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearHoverTimers = useCallback(() => {
    if (enterTimerRef.current !== null) {
      clearTimeout(enterTimerRef.current);
      enterTimerRef.current = null;
    }
    if (leaveTimerRef.current !== null) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
  }, []);

  /* Clean up hover timers on unmount. */
  useEffect(() => {
    return () => clearHoverTimers();
  }, [clearHoverTimers]);

  const handleMouseEnter = useCallback(() => {
    if (triggerType !== 'hover') return;
    if (leaveTimerRef.current !== null) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    enterTimerRef.current = setTimeout(() => {
      onOpen?.();
    }, onMouseEnterDelay);
  }, [triggerType, onOpen, onMouseEnterDelay]);

  const handleMouseLeave = useCallback(() => {
    if (triggerType !== 'hover') return;
    if (enterTimerRef.current !== null) {
      clearTimeout(enterTimerRef.current);
      enterTimerRef.current = null;
    }
    leaveTimerRef.current = setTimeout(() => {
      onClose();
    }, onMouseLeaveDelay);
  }, [triggerType, onClose, onMouseLeaveDelay]);

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

    const closedProps: Record<string, unknown> = {
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
    };

    if (triggerType === 'hover') {
      closedProps.onMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
        handleMouseEnter();
        child.props.onMouseEnter?.(e);
      };
      closedProps.onMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
        handleMouseLeave();
        child.props.onMouseLeave?.(e);
      };
    }

    return React.cloneElement(child, closedProps as React.HTMLAttributes<HTMLElement>);
  }

  const child = React.Children.only(children) as React.ReactElement<
    React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }
  >;

  const openProps: Record<string, unknown> = {
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
  };

  if (triggerType === 'hover') {
    openProps.onMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
      handleMouseEnter();
      child.props.onMouseEnter?.(e);
    };
    openProps.onMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
      handleMouseLeave();
      child.props.onMouseLeave?.(e);
    };
  }

  const clonedTrigger = React.cloneElement(child, openProps as React.HTMLAttributes<HTMLElement>);

  const popoverClasses = [
    'arch-popover',
    showArrow ? `arch-popover--arrow-${position}` : '',
  ].filter(Boolean).join(' ');

  const hoverProps = triggerType === 'hover'
    ? { onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave }
    : {};

  return (
    <>
      {clonedTrigger}
      <Portal>
        {/* Transparent overlay for click-outside detection */}
        {triggerType === 'click' && <Overlay transparent onClick={onClose} />}
        <FocusTrap active={isOpen} restoreFocus>
          <div
            id={popoverId}
            ref={popoverRef}
            role="dialog"
            aria-modal="true"
            className={popoverClasses}
            style={{ top: coords.top, left: coords.left, position: 'absolute' }}
            {...hoverProps}
          >
            {showArrow && <div className="arch-popover__arrow" />}
            {content}
          </div>
        </FocusTrap>
      </Portal>
    </>
  );
}

export { Popover };
export default Popover;
