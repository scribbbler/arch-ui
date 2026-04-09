import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const CodeBracketsIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M15,4V6H18V18H15V20H20V4M4,4V20H9V18H6V6H9V4H4Z" />
  </Icon>
));

CodeBracketsIcon.displayName = "CodeBracketsIcon";

export { CodeBracketsIcon };
