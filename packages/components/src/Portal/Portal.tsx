import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export interface PortalProps {
  /** Content to teleport into the target container. */
  children: React.ReactNode;
  /**
   * Target DOM element. Defaults to document.body when null or not provided.
   */
  container?: HTMLElement | null;
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * Portal
 *
 * Renders children into a DOM node outside the current React tree via
 * `createPortal`. Use this as the rendering layer for overlays, tooltips,
 * modals, and drawers.
 *
 * @example
 * <Portal>
 *   <div>Rendered in document.body</div>
 * </Portal>
 *
 * @example
 * <Portal container={containerRef.current}>
 *   <div>Rendered in custom container</div>
 * </Portal>
 */
function Portal({ children, container = null }: PortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) {
    return null;
  }

  const target = container ?? document.body;

  return createPortal(children, target);
}

export { Portal };
export default Portal;
