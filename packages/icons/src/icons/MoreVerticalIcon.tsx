import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const MoreVerticalIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <circle cx="10" cy="4" r="1.25" fill="currentColor" stroke="none"/>
  <circle cx="10" cy="10" r="1.25" fill="currentColor" stroke="none"/>
  <circle cx="10" cy="16" r="1.25" fill="currentColor" stroke="none"/>
  </Icon>
));

MoreVerticalIcon.displayName = "MoreVerticalIcon";

export { MoreVerticalIcon };
