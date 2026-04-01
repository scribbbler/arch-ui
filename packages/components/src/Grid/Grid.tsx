import { forwardRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import "./Grid.css";

interface ResponsiveColumns {
  base?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

export interface GridProps {
  /** Number of columns (1–12), 'auto', or responsive object. */
  columns?: number | "auto" | ResponsiveColumns;
  /** Spacing token for gap. */
  gap?: string;
  /** Spacing token for row gap. */
  rowGap?: string;
  /** Spacing token for column gap. */
  colGap?: string;
  /** HTML element to render. */
  as?: ElementType;
  /** Content. */
  children?: ReactNode;
  /** Additional class name. */
  className?: string;
}

function columnsValue(n: number | "auto"): string {
  if (n === "auto") return "repeat(auto-fill, minmax(200px, 1fr))";
  return `repeat(${n}, 1fr)`;
}

const Grid = forwardRef<HTMLElement, GridProps>(
  (
    {
      columns = 1,
      gap,
      rowGap,
      colGap,
      as: Component = "div",
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const cssVars: CSSProperties & Record<string, string | undefined> = {};

    if (typeof columns === "object") {
      if (columns.base) cssVars["--grid-columns"] = columnsValue(columns.base);
      if (columns.sm) cssVars["--grid-columns-sm"] = columnsValue(columns.sm);
      if (columns.md) cssVars["--grid-columns-md"] = columnsValue(columns.md);
      if (columns.lg) cssVars["--grid-columns-lg"] = columnsValue(columns.lg);
      if (columns.xl) cssVars["--grid-columns-xl"] = columnsValue(columns.xl);
    } else {
      cssVars["--grid-columns"] = columnsValue(columns);
    }

    if (gap) cssVars["--grid-gap"] = `var(--${gap})`;
    if (rowGap) cssVars["--grid-row-gap"] = `var(--${rowGap})`;
    if (colGap) cssVars["--grid-col-gap"] = `var(--${colGap})`;

    return (
      <Component
        ref={ref}
        className={`arch-grid${className ? ` ${className}` : ""}`}
        style={cssVars}
        {...rest}
      >
        {children}
      </Component>
    );
  },
);

Grid.displayName = "Grid";

export { Grid };
