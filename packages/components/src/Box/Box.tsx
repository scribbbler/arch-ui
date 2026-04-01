import { forwardRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import "./Box.css";

export interface BoxProps {
  /** Spacing token for all-sides padding. */
  padding?: string;
  /** Spacing token for inline (horizontal) padding. */
  paddingX?: string;
  /** Spacing token for block (vertical) padding. */
  paddingY?: string;
  /** Spacing token for all-sides margin. */
  margin?: string;
  /** Spacing token for inline (horizontal) margin. */
  marginX?: string;
  /** Spacing token for block (vertical) margin. */
  marginY?: string;
  /** Color token for background. */
  background?: string;
  /** Color token for border. Sets border-width to default when provided. */
  border?: string;
  /** Radius token for border-radius. */
  radius?: string;
  /** Shadow token for box-shadow. */
  shadow?: string;
  /** HTML element to render. Default: 'div'. */
  as?: ElementType;
  /** Content. */
  children?: ReactNode;
  /** Additional class name. */
  className?: string;
}

function tokenVar(name: string | undefined): string | undefined {
  return name ? `var(--${name})` : undefined;
}

const Box = forwardRef<HTMLElement, BoxProps>(
  (
    {
      padding,
      paddingX,
      paddingY,
      margin,
      marginX,
      marginY,
      background,
      border,
      radius,
      shadow,
      as: Component = "div",
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const cssVars: CSSProperties & Record<string, string | undefined> = {};

    if (padding) cssVars["--box-padding"] = tokenVar(padding);
    if (paddingX) cssVars["--box-padding-x"] = tokenVar(paddingX);
    if (paddingY) cssVars["--box-padding-y"] = tokenVar(paddingY);
    if (margin) cssVars["--box-margin"] = tokenVar(margin);
    if (marginX) cssVars["--box-margin-x"] = tokenVar(marginX);
    if (marginY) cssVars["--box-margin-y"] = tokenVar(marginY);
    if (background) cssVars["--box-background"] = tokenVar(background);
    if (border) {
      cssVars["--box-border"] = tokenVar(border);
      cssVars["--box-border-width"] = "var(--border-width-default)";
    }
    if (radius) cssVars["--box-radius"] = tokenVar(radius);
    if (shadow) cssVars["--box-shadow"] = tokenVar(shadow);

    return (
      <Component
        ref={ref}
        className={`arch-box${className ? ` ${className}` : ""}`}
        style={cssVars}
        {...rest}
      >
        {children}
      </Component>
    );
  },
);

Box.displayName = "Box";

export { Box };
