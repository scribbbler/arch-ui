import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const MonitorIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M21,16H3V4H21M21,2H3C1.89,2 1,2.89 1,4V16A2,2 0 0,0 3,18H10V20H8V22H16V20H14V18H21A2,2 0 0,0 23,16V4C23,2.89 22.1,2 21,2Z" />
  </Icon>
));

MonitorIcon.displayName = "MonitorIcon";

export { MonitorIcon };
