import React, { forwardRef } from 'react';
import './FlexGrid.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export interface FlexGridProps {
  /** FlexGridItem children. */
  children?: React.ReactNode;
  /** Additional CSS class names. */
  className?: string;
}

export interface FlexGridItemProps {
  /** Column span from 1 to 12. Defaults to 12 (full width). */
  span?: number;
  /** Content. */
  children?: React.ReactNode;
  /** Additional CSS class names. */
  className?: string;
}

/* ─── FlexGridItem ───────────────────────────────────────────────────────────── */

/**
 * FlexGridItem
 *
 * A single cell within the FlexGrid. The span prop (1–12) controls width
 * as a fraction of 12 columns.
 */
const FlexGridItem = forwardRef<HTMLDivElement, FlexGridItemProps>(
  function FlexGridItem({ span = 12, children, className }, ref) {
    const classes = ['arch-flex-grid__item', className]
      .filter(Boolean)
      .join(' ');

    const style = {
      '--arch-flex-grid-item-span': String(span),
    } as React.CSSProperties;

    return (
      <div ref={ref} className={classes} style={style}>
        {children}
      </div>
    );
  },
);

FlexGridItem.displayName = 'FlexGridItem';

/* ─── FlexGrid ───────────────────────────────────────────────────────────────── */

/**
 * FlexGrid
 *
 * A flexbox-based responsive grid using a 12-column model.
 *
 * @example
 * <FlexGrid>
 *   <FlexGridItem span={6}>Left half</FlexGridItem>
 *   <FlexGridItem span={6}>Right half</FlexGridItem>
 * </FlexGrid>
 *
 * @example
 * <FlexGrid>
 *   <FlexGridItem span={4}>Third</FlexGridItem>
 *   <FlexGridItem span={4}>Third</FlexGridItem>
 *   <FlexGridItem span={4}>Third</FlexGridItem>
 * </FlexGrid>
 */
const FlexGrid = forwardRef<HTMLDivElement, FlexGridProps>(
  function FlexGrid({ children, className }, ref) {
    const classes = ['arch-flex-grid', className]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes}>
        {children}
      </div>
    );
  },
);

FlexGrid.displayName = 'FlexGrid';

export { FlexGrid, FlexGridItem };
export default FlexGrid;
