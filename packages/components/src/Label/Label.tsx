import { forwardRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import "./Label.css";

type LabelSize = "large" | "medium" | "small" | "xsmall";

export interface LabelProps {
  /** Label size. Default: 'medium'. */
  size?: LabelSize;
  /** Semantic text color token name. Default: 'color-text-default'. */
  color?: string;
  /** HTML element to render. Default: 'span'. */
  as?: ElementType;
  /** Content. */
  children?: ReactNode;
  /** Additional class name. */
  className?: string;
}

const SIZE_TOKEN_MAP: Record<LabelSize, string> = {
  large: "typography-scale-label-large",
  medium: "typography-scale-label-medium",
  small: "typography-scale-label-small",
  xsmall: "typography-scale-label-xsmall",
};

const Label = forwardRef<HTMLElement, LabelProps>(
  (
    {
      size = "medium",
      color = "color-text-default",
      as: Component = "span",
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const scaleToken = SIZE_TOKEN_MAP[size];

    const cssVars: CSSProperties & Record<string, string> = {
      "--label-font-size": `var(--${scaleToken}-font-size)`,
      "--label-line-height": `var(--${scaleToken}-line-height)`,
      "--label-letter-spacing": `var(--${scaleToken}-letter-spacing)`,
      "--label-font-weight": `var(--${scaleToken}-font-weight)`,
      "--label-color": `var(--${color})`,
    };

    const classes = ["arch-label", className].filter(Boolean).join(" ");

    return (
      <Component ref={ref} className={classes} style={cssVars} {...rest}>
        {children}
      </Component>
    );
  },
);

Label.displayName = "Label";

export { Label };
