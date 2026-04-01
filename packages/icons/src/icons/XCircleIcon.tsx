import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const XCircleIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <circle cx="10" cy="10" r="8"/>
  <line x1="7.5" y1="7.5" x2="12.5" y2="12.5"/>
  <line x1="12.5" y1="7.5" x2="7.5" y2="12.5"/>
  </Icon>
));

XCircleIcon.displayName = "XCircleIcon";

export { XCircleIcon };
