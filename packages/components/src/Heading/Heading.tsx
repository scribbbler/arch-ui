import { forwardRef, type CSSProperties, type ReactNode } from "react";
import "./Heading.css";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingSize = "display-2xl" | "display-xl" | "display-lg" | "display-md" | "display-sm" | "text-xl";
type HeadingWeight = "semibold" | "bold" | "extrabold";

export interface HeadingProps {
  /** Semantic heading level (h1–h6). Controls HTML element. Default: 1. */
  level?: HeadingLevel;
  /** Visual typography scale size. Independent of level. */
  size?: HeadingSize;
  /** Font weight. Default: 'bold'. */
  weight?: HeadingWeight;
  /** Semantic text color token name. Default: 'color-text-default'. */
  color?: string;
  /** Heading content. */
  children?: ReactNode;
  /** Additional CSS class names. */
  className?: string;
}

const LEVEL_DEFAULT_SIZE_MAP: Record<HeadingLevel, HeadingSize> = {
  1: "display-2xl",
  2: "display-xl",
  3: "display-lg",
  4: "display-md",
  5: "display-sm",
  6: "text-xl",
};

const SIZE_TOKEN_MAP: Record<HeadingSize, string> = {
  "display-2xl": "typography-scale-display-2xl",
  "display-xl": "typography-scale-display-xl",
  "display-lg": "typography-scale-display-lg",
  "display-md": "typography-scale-display-md",
  "display-sm": "typography-scale-display-sm",
  "text-xl": "typography-scale-text-xl",
};

const WEIGHT_TOKEN_MAP: Record<HeadingWeight, string> = {
  semibold: "typography-weight-semibold",
  bold: "typography-weight-bold",
  extrabold: "typography-weight-extrabold",
};

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      level = 1,
      size,
      weight = "bold",
      color = "color-text-default",
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const resolvedSize = size ?? LEVEL_DEFAULT_SIZE_MAP[level];
    const scaleToken = SIZE_TOKEN_MAP[resolvedSize];
    const weightToken = WEIGHT_TOKEN_MAP[weight];

    const cssVars: CSSProperties & Record<string, string> = {
      "--heading-font-size": `var(--${scaleToken}-font-size)`,
      "--heading-line-height": `var(--${scaleToken}-line-height)`,
      "--heading-letter-spacing": `var(--${scaleToken}-letter-spacing)`,
      "--heading-font-weight": `var(--${weightToken})`,
      "--heading-color": `var(--${color})`,
    };

    const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

    const classes = ["arch-heading", className].filter(Boolean).join(" ");

    return (
      <Tag ref={ref} className={classes} style={cssVars} {...rest}>
        {children}
      </Tag>
    );
  },
);

Heading.displayName = "Heading";

export { Heading };
