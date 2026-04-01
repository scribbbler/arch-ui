import React, { forwardRef, useRef, useEffect, useCallback } from 'react';

/* ─── Constants ──────────────────────────────────────────────────────────────── */

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export interface FocusTrapProps {
  /** Whether focus trapping is currently active. */
  active: boolean;
  /**
   * When true, focus returns to the previously focused element when active
   * transitions to false. Defaults to true.
   */
  restoreFocus?: boolean;
  /** A single child element serving as the focus trap container. */
  children: React.ReactNode;
  /** Additional CSS class names applied to the wrapper div. */
  className?: string;
}

/* ─── Helpers ────────────────────────────────────────────────────────────────── */

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * FocusTrap
 *
 * Constrains keyboard Tab / Shift+Tab cycling within a container. When
 * `active` becomes false with `restoreFocus=true`, focus returns to the
 * element that was focused before activation.
 *
 * @example
 * <FocusTrap active={isOpen} restoreFocus>
 *   <div>…dialog content…</div>
 * </FocusTrap>
 */
const FocusTrap = forwardRef<HTMLDivElement, FocusTrapProps>(function FocusTrap(
  { active, restoreFocus = true, children, className },
  ref
) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  /* Save the element that had focus when the trap activates. */
  useEffect(() => {
    if (active) {
      previousFocusRef.current = document.activeElement as HTMLElement | null;

      /* Move focus inside the trap on the next tick so the container is rendered. */
      const id = window.setTimeout(() => {
        if (containerRef.current) {
          const focusable = getFocusableElements(containerRef.current);
          if (focusable.length > 0) {
            focusable[0].focus();
          } else {
            containerRef.current.focus();
          }
        }
      }, 0);

      return () => window.clearTimeout(id);
    } else if (restoreFocus && previousFocusRef.current) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    }
    return undefined;
  }, [active, restoreFocus]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!active || event.key !== 'Tab') return;

      const container = containerRef.current;
      if (!container) return;

      const focusable = getFocusableElements(container);
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey) {
        /* Shift+Tab: if focus is on the first element, wrap to last */
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else {
        /* Tab: if focus is on the last element, wrap to first */
        if (document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    },
    [active]
  );

  /* Merge the forwarded ref with our internal ref. */
  const setRef = useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    [ref]
  );

  return (
    <div
      ref={setRef}
      className={className}
      onKeyDown={handleKeyDown}
      /* Allow the container itself to receive programmatic focus. */
      tabIndex={-1}
    >
      {children}
    </div>
  );
});

export { FocusTrap };
export default FocusTrap;
