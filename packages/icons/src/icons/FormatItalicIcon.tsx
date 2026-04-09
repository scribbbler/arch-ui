import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const FormatItalicIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M10,4V7H12.21L8.79,15H6V18H14V15H11.79L15.21,7H18V4H10Z" />
  </Icon>
));

FormatItalicIcon.displayName = "FormatItalicIcon";

export { FormatItalicIcon };
