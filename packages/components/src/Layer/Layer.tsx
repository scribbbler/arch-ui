import React, { forwardRef, createContext, useContext, useMemo } from 'react';
import './Layer.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export interface LayerProps {
  /** Content rendered within the stacking context. */
  children?: React.ReactNode;
  /** The z-index value for this layer. Defaults to 0. */
  zIndex?: number;
  /** Additional CSS class names. */
  className?: string;
}

export interface LayerManagerProps {
  /** Application content. */
  children?: React.ReactNode;
}

/* ─── Context ────────────────────────────────────────────────────────────────── */

interface LayerContextValue {
  /** The current z-index depth from the nearest ancestor Layer. */
  currentZIndex: number;
}

const LayerContext = createContext<LayerContextValue>({ currentZIndex: 0 });

/**
 * useLayerContext
 *
 * Returns the current layer context value, including the z-index of the
 * nearest ancestor Layer.
 */
export function useLayerContext(): LayerContextValue {
  return useContext(LayerContext);
}

/* ─── LayerManager ───────────────────────────────────────────────────────────── */

/**
 * LayerManager
 *
 * Context provider for coordinating layer ordering. Place at the app root
 * to enable Layer components to resolve relative stacking.
 *
 * @example
 * <LayerManager>
 *   <App />
 * </LayerManager>
 */
const LayerManager = forwardRef<HTMLDivElement, LayerManagerProps>(
  function LayerManager({ children }, ref) {
    const value = useMemo<LayerContextValue>(() => ({ currentZIndex: 0 }), []);

    return (
      <LayerContext.Provider value={value}>
        <div ref={ref} className="arch-layer-manager">
          {children}
        </div>
      </LayerContext.Provider>
    );
  },
);

LayerManager.displayName = 'LayerManager';

/* ─── Layer ──────────────────────────────────────────────────────────────────── */

/**
 * Layer
 *
 * Creates a new stacking context with a specified z-index.
 *
 * @example
 * <Layer zIndex={10}>
 *   <Popover>Dropdown content</Popover>
 * </Layer>
 *
 * @example
 * <Layer zIndex={100}>
 *   <Modal>Modal content</Modal>
 * </Layer>
 */
const Layer = forwardRef<HTMLDivElement, LayerProps>(
  function Layer({ children, zIndex = 0, className }, ref) {
    const classes = ['arch-layer', className].filter(Boolean).join(' ');

    const style = {
      '--arch-layer-z-index': String(zIndex),
    } as React.CSSProperties;

    const value = useMemo<LayerContextValue>(
      () => ({ currentZIndex: zIndex }),
      [zIndex],
    );

    return (
      <LayerContext.Provider value={value}>
        <div ref={ref} className={classes} style={style}>
          {children}
        </div>
      </LayerContext.Provider>
    );
  },
);

Layer.displayName = 'Layer';

export { Layer, LayerManager };
export default Layer;
