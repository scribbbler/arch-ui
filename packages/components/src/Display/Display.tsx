import { forwardRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import "./Display.css";

type DisplaySize = "display-2xl" | "display-xl" | "display-lg" | "display-md" | "display-sm";
type DisplayWeight = "semibold" | "bold" | "extrabold";

export interface DisplayProps {
  /** Typography scale size. Default: 'display-lg'. */
  size?: DisplaySize;
  /** Font weight. Default: 'bold'. */
  weight?: DisplayWeight;
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
  "display-2xl": "typography-scale-display-2xl",
  "display-xl": "typography-scale-display-xl",
  "display-lg": "typography-scale-display-lg",
  "display-md": "typography-scale-display-md",
  "display-sm": "typography-scale-display-sm",
};

const WEIGHT_TOKEN_MAP: Record<DisplayWeight, string> = {
  semibold: "typography-weight-semibold",
  bold: "typography-weight-bold",
  extrabold: "typography-weight-extrabold",
};

const Display = forwardRef<HTMLElement, DisplayProps>(
  (
    {
      size = "display-lg",
      weight = "bold",
      color = "color-text-default",
      as: Component = "p",
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const scaleToken = SIZE_TOKEN_MAP[size];
    const weightToken = WEIGHT_TOKEN_MAP[weight];

    const cssVars: CSSProperties & Record<string, string> = {
      "--display-font-size": `var(--${scaleToken}-font-size)`,
      "--display-line-height": `var(--${scaleToken}-line-height)`,
      "--display-letter-spacing": `var(--${scaleToken}-letter-spacing)`,
      "--display-font-weight": `var(--${weightToken})`,
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
