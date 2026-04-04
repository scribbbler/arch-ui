import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";
import "./Link.css";

type LinkVariant = "default" | "subtle" | "inverse";

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** The URL the link points to. */
  href: string;
  /** When true, appends ' (opens in new tab)' to aria-label. Does NOT auto-set target. */
  external?: boolean;
  /** Color variant. Default: 'default'. */
  variant?: LinkVariant;
  /** When true, the underline animates in on hover. Defaults to false. */
  animateUnderline?: boolean;
  /** Link label content. */
  children?: ReactNode;
  /** Additional CSS class names. */
  className?: string;
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      href,
      external = false,
      variant = "default",
      animateUnderline = false,
      className,
      children,
      "aria-label": ariaLabel,
      ...rest
    },
    ref,
  ) => {
    const classes = [
      "arch-link",
      `arch-link--${variant}`,
      animateUnderline ? "arch-link--animate-underline" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const resolvedAriaLabel =
      external && ariaLabel
        ? `${ariaLabel} (opens in new tab)`
        : external && typeof children === "string"
        ? `${children} (opens in new tab)`
        : external
        ? undefined
        : ariaLabel;

    const externalAriaDescription = external && !resolvedAriaLabel
      ? "(opens in new tab)"
      : undefined;

    return (
      <a
        ref={ref}
        href={href}
        className={classes}
        aria-label={resolvedAriaLabel}
        aria-description={externalAriaDescription}
        {...rest}
      >
        {children}
        {external && (
          <svg
            className="arch-link__external-icon"
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 3H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-3M9 2h5m0 0v5m0-5L7 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </a>
    );
  },
);

Link.displayName = "Link";

export { Link };
