import React, {
  useRef,
  useState,
  useCallback,
  useId,
  useEffect,
} from 'react';
import { Portal } from '../Portal';
import './Tooltip.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export type TooltipPosition = 'top' | 'bottom' | 'start' | 'end';

export interface TooltipProps {
  /** The tooltip content. Must be non-interactive text or static elements. */
  content: React.ReactNode;
  /**
   * Preferred position of the tooltip relative to the trigger.
   * Defaults to 'top'.
   */
  position?: TooltipPosition;
  /**
   * Milliseconds to wait before showing the tooltip after hover or focus.
   * Defaults to 300.
   */
  delay?: number;
  /** The trigger element. Must be a single focusable React element. */
  children: React.ReactElement;
}

interface TooltipCoords {
  top: number;
  left: number;
}

/* ─── Helpers ────────────────────────────────────────────────────────────────── */

function computePosition(
  triggerRect: DOMRect,
  tooltipEl: HTMLElement,
  position: TooltipPosition
): TooltipCoords {
  const tooltipRect = tooltipEl.getBoundingClientRect();
  const GAP = 8;
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  switch (position) {
    case 'bottom':
      return {
        top: triggerRect.bottom + scrollY + GAP,
        left: triggerRect.left + scrollX + triggerRect.width / 2 - tooltipRect.width / 2,
      };
    case 'start':
      return {
        top: triggerRect.top + scrollY + triggerRect.height / 2 - tooltipRect.height / 2,
        left: triggerRect.left + scrollX - tooltipRect.width - GAP,
      };
    case 'end':
      return {
        top: triggerRect.top + scrollY + triggerRect.height / 2 - tooltipRect.height / 2,
        left: triggerRect.right + scrollX + GAP,
      };
    case 'top':
    default:
      return {
        top: triggerRect.top + scrollY - tooltipRect.height - GAP,
        left: triggerRect.left + scrollX + triggerRect.width / 2 - tooltipRect.width / 2,
      };
  }
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * Tooltip
 *
 * Non-interactive supplementary content shown on hover and focus after a
 * configurable delay. Renders via Portal into document.body.
 *
 * @example
 * <Tooltip content="Save document" position="top">
 *   <button aria-label="Save"><SaveIcon /></button>
 * </Tooltip>
 */
function Tooltip({
  content,
  position = 'top',
  delay = 300,
  children,
}: TooltipProps) {
  const tooltipId = useId();
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState<TooltipCoords>({ top: 0, left: 0 });
  const showTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const clearShowTimer = useCallback(() => {
    if (showTimerRef.current !== null) {
      clearTimeout(showTimerRef.current);
      showTimerRef.current = null;
    }
  }, []);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const newCoords = computePosition(triggerRect, tooltipRef.current, position);
    setCoords(newCoords);
  }, [position]);

  const show = useCallback(() => {
    clearShowTimer();
    showTimerRef.current = setTimeout(() => {
      setVisible(true);
    }, delay);
  }, [delay, clearShowTimer]);

  const hide = useCallback(() => {
    clearShowTimer();
    setVisible(false);
  }, [clearShowTimer]);

  /* Re-compute position after tooltip becomes visible. */
  useEffect(() => {
    if (visible) {
      updatePosition();
    }
  }, [visible, updatePosition]);

  /* Clean up timer on unmount. */
  useEffect(() => {
    return () => clearShowTimer();
  }, [clearShowTimer]);

  const child = React.Children.only(children) as React.ReactElement<
    React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }
  >;

  const cloned = React.cloneElement(child, {
    'aria-describedby': tooltipId,
    ref: (node: HTMLElement | null) => {
      triggerRef.current = node;
      /* Forward existing ref if present */
      const existingRef = (child as { ref?: React.Ref<HTMLElement> }).ref;
      if (typeof existingRef === 'function') {
        existingRef(node);
      } else if (existingRef && typeof existingRef === 'object') {
        (existingRef as React.MutableRefObject<HTMLElement | null>).current = node;
      }
    },
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
      show();
      child.props.onMouseEnter?.(e);
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      hide();
      child.props.onMouseLeave?.(e);
    },
    onFocus: (e: React.FocusEvent<HTMLElement>) => {
      show();
      child.props.onFocus?.(e);
    },
    onBlur: (e: React.FocusEvent<HTMLElement>) => {
      hide();
      child.props.onBlur?.(e);
    },
  } as React.HTMLAttributes<HTMLElement>);

  return (
    <>
      {cloned}
      <Portal>
        <div
          id={tooltipId}
          ref={tooltipRef}
          role="tooltip"
          className={`arch-tooltip ${visible ? 'arch-tooltip--visible' : 'arch-tooltip--hidden'}`}
          style={{ top: coords.top, left: coords.left, position: 'absolute' }}
        >
          {content}
        </div>
      </Portal>
    </>
  );
}

export { Tooltip };
export default Tooltip;
