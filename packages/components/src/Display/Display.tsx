import { forwardRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import "./Display.css";

type DisplaySize = "large" | "medium" | "small" | "xsmall";

export interface DisplayProps {
  /** Typography scale size. Default: 'large'. */
  size?: DisplaySize;
  /** Semantic text color token name. Default: 'color-text-default'. */
  color?: string;
  /** HTML element to render. Default: 'p'. */
  as?: ElementType;
  /** Content. */
  children?: ReactNode;
  /** Additional class name. */
  className?: string;
}

const SIZE_TOKEN_MAP: Record<DisplaySize, string> = {
  large: "typography-scale-display-large",
  medium: "typography-scale-display-medium",
  small: "typography-scale-display-small",
  xsmall: "typography-scale-display-xsmall",
};

const Display = forwardRef<HTMLElement, DisplayProps>(
  (
    {
      size = "large",
      color = "color-text-default",
      as: Component = "p",
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const scaleToken = SIZE_TOKEN_MAP[size];

    const cssVars: CSSProperties & Record<string, string> = {
      "--display-font-size": `var(--${scaleToken}-font-size)`,
      "--display-line-height": `var(--${scaleToken}-line-height)`,
      "--display-letter-spacing": `var(--${scaleToken}-letter-spacing)`,
      "--display-font-weight": `var(--${scaleToken}-font-weight)`,
      "--display-color": `var(--${color})`,
    };

    return (
      <Component
        ref={ref}
        className={`arch-display${className ? ` ${className}` : ""}`}
        style={cssVars}
        {...rest}
      >
        {children}
      </Component>
    );
  },
);

Display.displayName = "Display";

export { Display };
