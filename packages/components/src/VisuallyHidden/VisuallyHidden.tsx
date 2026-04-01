import { forwardRef, type ElementType, type ReactNode } from "react";
import "./VisuallyHidden.css";

export interface VisuallyHiddenProps {
  /** HTML element to render. Default: 'span'. */
  as?: ElementType;
  /** Content visible to screen readers. */
  children: ReactNode;
  /** Additional class name. */
  className?: string;
}

const VisuallyHidden = forwardRef<HTMLElement, VisuallyHiddenProps>(
  ({ as: Component = "span", children, className, ...rest }, ref) => (
    <Component
      ref={ref}
      className={`arch-visually-hidden${className ? ` ${className}` : ""}`}
      {...rest}
    >
      {children}
    </Component>
  ),
);

VisuallyHidden.displayName = "VisuallyHidden";

export { VisuallyHidden };
