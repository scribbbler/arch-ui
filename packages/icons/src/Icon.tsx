import { forwardRef, type SVGProps } from "react";

export type IconSize = 16 | 20 | 24;

export interface IconProps extends SVGProps<SVGSVGElement> {
  /** Icon size in pixels. Default 20. */
  size?: IconSize;
  /** Icon color. Defaults to currentColor. */
  color?: string;
  /** Accessible label. Required for standalone (non-decorative) use. */
  "aria-label"?: string;
  /** Whether this icon should flip horizontally in RTL layouts. */
  rtl?: boolean;
}

/**
 * Base Icon wrapper. Individual icon components compose this.
 */
const Icon = forwardRef<SVGSVGElement, IconProps & { children: React.ReactNode }>(
  (
    {
      size = 20,
      color = "currentColor",
      "aria-label": ariaLabel,
      rtl = false,
      children,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        width={size}
        height={size}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden={ariaLabel ? undefined : true}
        aria-label={ariaLabel}
        role={ariaLabel ? "img" : undefined}
        className={`arch-icon${rtl ? " arch-icon--rtl" : ""}${className ? ` ${className}` : ""}`}
        style={style}
        {...rest}
      >
        {children}
      </svg>
    );
  },
);

Icon.displayName = "Icon";

export { Icon };
