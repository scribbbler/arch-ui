import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const ViewDashboardIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M13,3V9H21V3M13,21H21V11H13M3,21H11V15H3M3,13H11V3H3V13Z" />
  </Icon>
));

ViewDashboardIcon.displayName = "ViewDashboardIcon";

export { ViewDashboardIcon };
