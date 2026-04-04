import { forwardRef, type CSSProperties, type ReactNode } from "react";
import "./Heading.css";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingSize = "xxlarge" | "xlarge" | "large" | "medium" | "small" | "xsmall";

export interface HeadingProps {
  /** Semantic heading level (h1–h6). Controls HTML element. Default: 1. */
  level?: HeadingLevel;
  /** Visual typography scale size. Independent of level. */
  size?: HeadingSize;
  /** Semantic text color token name. Default: 'color-text-default'. */
  color?: string;
  /** Heading content. */
  children?: ReactNode;
  /** Additional CSS class names. */
  className?: string;
}

const LEVEL_DEFAULT_SIZE_MAP: Record<HeadingLevel, HeadingSize> = {
  1: "xxlarge",
  2: "xlarge",
  3: "large",
  4: "medium",
  5: "small",
  6: "xsmall",
};

const SIZE_TOKEN_MAP: Record<HeadingSize, string> = {
  xxlarge: "typography-scale-heading-xxlarge",
  xlarge: "typography-scale-heading-xlarge",
  large: "typography-scale-heading-large",
  medium: "typography-scale-heading-medium",
  small: "typography-scale-heading-small",
  xsmall: "typography-scale-heading-xsmall",
};

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      level = 1,
      size,
      color = "color-text-default",
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const resolvedSize = size ?? LEVEL_DEFAULT_SIZE_MAP[level];
    const scaleToken = SIZE_TOKEN_MAP[resolvedSize];

    const cssVars: CSSProperties & Record<string, string> = {
      "--heading-font-size": `var(--${scaleToken}-font-size)`,
      "--heading-line-height": `var(--${scaleToken}-line-height)`,
      "--heading-letter-spacing": `var(--${scaleToken}-letter-spacing)`,
      "--heading-font-weight": `var(--${scaleToken}-font-weight)`,
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
