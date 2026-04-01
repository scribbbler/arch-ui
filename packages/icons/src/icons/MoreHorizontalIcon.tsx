import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const MoreHorizontalIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <circle cx="4" cy="10" r="1.25" fill="currentColor" stroke="none"/>
  <circle cx="10" cy="10" r="1.25" fill="currentColor" stroke="none"/>
  <circle cx="16" cy="10" r="1.25" fill="currentColor" stroke="none"/>
  </Icon>
));

MoreHorizontalIcon.displayName = "MoreHorizontalIcon";

export { MoreHorizontalIcon };
