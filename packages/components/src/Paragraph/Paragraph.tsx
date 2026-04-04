import { forwardRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import "./Paragraph.css";

type ParagraphSize = "large" | "medium" | "small" | "xsmall";

export interface ParagraphProps {
  /** Paragraph size. Default: 'medium'. */
  size?: ParagraphSize;
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
  large: "typography-scale-paragraph-large",
  medium: "typography-scale-paragraph-medium",
  small: "typography-scale-paragraph-small",
  xsmall: "typography-scale-paragraph-xsmall",
};

const Paragraph = forwardRef<HTMLElement, ParagraphProps>(
  (
    {
      size = "medium",
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

    const cssVars: CSSProperties & Record<string, string> = {
      "--paragraph-font-size": `var(--${scaleToken}-font-size)`,
      "--paragraph-line-height": `var(--${scaleToken}-line-height)`,
      "--paragraph-letter-spacing": `var(--${scaleToken}-letter-spacing)`,
      "--paragraph-font-weight": `var(--${scaleToken}-font-weight)`,
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
