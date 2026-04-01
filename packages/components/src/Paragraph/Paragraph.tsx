import { forwardRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import "./Paragraph.css";

type ParagraphSize = "lg" | "md" | "sm" | "xs";
type ParagraphWeight = "regular" | "medium";

export interface ParagraphProps {
  /** Paragraph size. Default: 'md'. */
  size?: ParagraphSize;
  /** Font weight. Default: 'regular'. */
  weight?: ParagraphWeight;
  /** Semantic text color token name. Default: 'color-text-default'. */
  color?: string;
  /** Truncate with ellipsis. */
  truncate?: boolean;
  /** HTML element to render. Default: 'p'. */
  as?: ElementType;
  /** Content. */
  children?: ReactNode;
  /** Additional class name. */
  className?: string;
}

const SIZE_TOKEN_MAP: Record<ParagraphSize, string> = {
  lg: "typography-scale-text-lg",
  md: "typography-scale-text-md",
  sm: "typography-scale-text-sm",
  xs: "typography-scale-text-xs",
};

const WEIGHT_TOKEN_MAP: Record<ParagraphWeight, string> = {
  regular: "typography-weight-regular",
  medium: "typography-weight-medium",
};

const Paragraph = forwardRef<HTMLElement, ParagraphProps>(
  (
    {
      size = "md",
      weight = "regular",
      color = "color-text-default",
      truncate = false,
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
      "--paragraph-font-size": `var(--${scaleToken}-font-size)`,
      "--paragraph-line-height": `var(--${scaleToken}-line-height)`,
      "--paragraph-letter-spacing": `var(--${scaleToken}-letter-spacing)`,
      "--paragraph-font-weight": `var(--${weightToken})`,
      "--paragraph-color": `var(--${color})`,
    };

    const classes = [
      "arch-paragraph",
      truncate ? "arch-paragraph--truncate" : null,
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

Paragraph.displayName = "Paragraph";

export { Paragraph };
