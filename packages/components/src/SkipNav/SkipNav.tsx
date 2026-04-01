import { forwardRef, type ReactNode } from "react";
import "./SkipNav.css";

export interface SkipNavProps {
  /** The id of the main content element to skip to. */
  targetId?: string;
  /** Link text. Default: 'Skip to main content'. */
  children?: ReactNode;
  /** Additional class name. */
  className?: string;
}

const SkipNav = forwardRef<HTMLAnchorElement, SkipNavProps>(
  (
    {
      targetId = "main-content",
      children = "Skip to main content",
      className,
      ...rest
    },
    ref,
  ) => (
    <a
      ref={ref}
      href={`#${targetId}`}
      className={`arch-skip-nav${className ? ` ${className}` : ""}`}
      {...rest}
    >
      {children}
    </a>
  ),
);

SkipNav.displayName = "SkipNav";

export { SkipNav };
