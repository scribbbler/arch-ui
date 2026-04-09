import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const FormatStrikethroughIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M3,14H21V12H3M5,4V7H10V10H14V7H19V4M10,19H14V16H10V19Z" />
  </Icon>
));

FormatStrikethroughIcon.displayName = "FormatStrikethroughIcon";

export { FormatStrikethroughIcon };
