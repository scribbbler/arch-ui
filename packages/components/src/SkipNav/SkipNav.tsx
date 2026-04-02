import { forwardRef, type ReactNode } from "react";
import { DEFAULT_LABELS, type SkipNavLabels } from "./SkipNav.labels";
import "./SkipNav.css";

export interface SkipNavProps {
  /** The id of the main content element to skip to. */
  targetId?: string;
  /** Link text. Default: 'Skip to main content'. */
  children?: ReactNode;
  /** Override default labels for internationalisation. */
  labels?: Partial<SkipNavLabels>;
  /** Additional class name. */
  className?: string;
}

const SkipNav = forwardRef<HTMLAnchorElement, SkipNavProps>(
  (
    {
      targetId = "main-content",
      children,
      labels,
      className,
      ...rest
    },
    ref,
  ) => {
    const mergedLabels = { ...DEFAULT_LABELS, ...labels };
    const content = children ?? mergedLabels.skipToContent;

    return (
    <a
      ref={ref}
      href={`#${targetId}`}
      className={`arch-skip-nav${className ? ` ${className}` : ""}`}
      {...rest}
    >
      {content}
    </a>
    );
  },
);

SkipNav.displayName = "SkipNav";

export { SkipNav };
export type { SkipNavLabels } from "./SkipNav.labels";
export { DEFAULT_LABELS as DEFAULT_SKIPNAV_LABELS } from "./SkipNav.labels";
