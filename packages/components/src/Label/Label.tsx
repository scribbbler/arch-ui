import { forwardRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import "./Label.css";

type LabelSize = "lg" | "md" | "sm" | "xs";
type LabelWeight = "medium" | "semibold" | "bold";

export interface LabelProps {
  /** Label size. Default: 'md'. */
  size?: LabelSize;
  /** Font weight. Default: 'medium'. */
  weight?: LabelWeight;
  /** Semantic text color token name. Default: 'color-text-default'. */
  color?: string;
  /** Uppercase with wider letter-spacing. */
  uppercase?: boolean;
  /** HTML element to render. Default: 'span'. */
  as?: ElementType;
  /** Content. */
  children?: ReactNode;
  /** Additional class name. */
  className?: string;
}

const SIZE_TOKEN_MAP: Record<LabelSize, string> = {
  lg: "typography-scale-text-lg",
  md: "typography-scale-text-md",
  sm: "typography-scale-text-sm",
  xs: "typography-scale-text-xs",
};

const WEIGHT_TOKEN_MAP: Record<LabelWeight, string> = {
  medium: "typography-weight-medium",
  semibold: "typography-weight-semibold",
  bold: "typography-weight-bold",
};

const Label = forwardRef<HTMLElement, LabelProps>(
  (
    {
      size = "md",
      weight = "medium",
      color = "color-text-default",
      uppercase = false,
      as: Component = "span",
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const scaleToken = SIZE_TOKEN_MAP[size];
    const weightToken = WEIGHT_TOKEN_MAP[weight];

    const cssVars: CSSProperties & Record<string, string> = {
      "--label-font-size": `var(--${scaleToken}-font-size)`,
      "--label-line-height": `var(--${scaleToken}-line-height)`,
      "--label-letter-spacing": `var(--${scaleToken}-letter-spacing)`,
      "--label-font-weight": `var(--${weightToken})`,
      "--label-color": `var(--${color})`,
    };

    const classes = [
      "arch-label",
      uppercase ? "arch-label--uppercase" : null,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <Component ref={ref} className={classes} style={cssVars} {...rest}>
        {children}
      </Component>
    );
  },
);

Label.displayName = "Label";

export { Label };
