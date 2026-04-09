import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const AlertIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M13 14H11V9H13M13 18H11V16H13M1 21H23L12 2L1 21Z" />
  </Icon>
));

AlertIcon.displayName = "AlertIcon";

export { AlertIcon };
