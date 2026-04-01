import { forwardRef, type CSSProperties, type ReactNode } from "react";
import "./Code.css";

type CodeSize = "code-md" | "code-sm";

export interface CodeProps {
  /** When true, renders as a block-level pre+code element. Default: false. */
  block?: boolean;
  /** Optional language hint for the code content. Sets data-language attribute. */
  language?: string;
  /** Typography scale size. Default: 'code-md'. */
  size?: CodeSize;
  /** Code content. */
  children?: ReactNode;
  /** Additional CSS class names. */
  className?: string;
}

const SIZE_TOKEN_MAP: Record<CodeSize, string> = {
  "code-md": "typography-scale-code-md",
  "code-sm": "typography-scale-code-sm",
};

const Code = forwardRef<HTMLElement, CodeProps>(
  (
    {
      block = false,
      language,
      size = "code-md",
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const scaleToken = SIZE_TOKEN_MAP[size];

    const cssVars: CSSProperties & Record<string, string> = {
      "--code-font-size": `var(--${scaleToken}-font-size)`,
      "--code-line-height": `var(--${scaleToken}-line-height)`,
      "--code-letter-spacing": `var(--${scaleToken}-letter-spacing)`,
    };

    const languageProps = language ? { "data-language": language } : {};

    if (block) {
      const preClasses = ["arch-code-block", className].filter(Boolean).join(" ");
      return (
        <pre className={preClasses} style={cssVars} {...languageProps} {...rest}>
          <code ref={ref as React.Ref<HTMLElement>} className="arch-code">
            {children}
          </code>
        </pre>
      );
    }

    const inlineClasses = ["arch-code", "arch-code--inline", className]
      .filter(Boolean)
      .join(" ");

    return (
      <code
        ref={ref as React.Ref<HTMLElement>}
        className={inlineClasses}
        style={cssVars}
        {...languageProps}
        {...rest}
      >
        {children}
      </code>
    );
  },
);

Code.displayName = "Code";

export { Code };
