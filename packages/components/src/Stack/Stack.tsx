import { forwardRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import "./Stack.css";

export interface StackProps {
  /** Spacing token for gap between children. */
  gap?: string;
  /** Cross-axis alignment. */
  align?: "start" | "center" | "end" | "stretch";
  /** Main-axis alignment. */
  justify?: "start" | "center" | "end" | "space-between";
  /** Stack direction. */
  direction?: "column" | "column-reverse";
  /** HTML element to render. */
  as?: ElementType;
  /** Content. */
  children?: ReactNode;
  /** Additional class name. */
  className?: string;
}

const Stack = forwardRef<HTMLElement, StackProps>(
  (
    {
      gap,
      align,
      justify,
      direction,
      as: Component = "div",
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const cssVars: CSSProperties & Record<string, string | undefined> = {};

    if (gap) cssVars["--stack-gap"] = `var(--${gap})`;
    if (align) cssVars["--stack-align"] = align;
    if (justify) cssVars["--stack-justify"] = justify;
    if (direction) cssVars["--stack-direction"] = direction;

    return (
      <Component
        ref={ref}
        className={`arch-stack${className ? ` ${className}` : ""}`}
        style={cssVars}
        {...rest}
      >
        {children}
      </Component>
    );
  },
);

Stack.displayName = "Stack";

export { Stack };
