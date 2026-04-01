import { forwardRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import "./Inline.css";

export interface InlineProps {
  /** Spacing token for gap between children. */
  gap?: string;
  /** Cross-axis alignment. */
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  /** Main-axis alignment. */
  justify?: "start" | "center" | "end" | "space-between";
  /** Whether children wrap. Default: true. */
  wrap?: boolean;
  /** HTML element to render. */
  as?: ElementType;
  /** Content. */
  children?: ReactNode;
  /** Additional class name. */
  className?: string;
}

const Inline = forwardRef<HTMLElement, InlineProps>(
  (
    {
      gap,
      align,
      justify,
      wrap = true,
      as: Component = "div",
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const cssVars: CSSProperties & Record<string, string | undefined> = {};

    if (gap) cssVars["--inline-gap"] = `var(--${gap})`;
    if (align) cssVars["--inline-align"] = align;
    if (justify) cssVars["--inline-justify"] = justify;
    if (!wrap) cssVars["--inline-wrap"] = "nowrap";

    return (
      <Component
        ref={ref}
        className={`arch-inline${className ? ` ${className}` : ""}`}
        style={cssVars}
        {...rest}
      >
        {children}
      </Component>
    );
  },
);

Inline.displayName = "Inline";

export { Inline };
