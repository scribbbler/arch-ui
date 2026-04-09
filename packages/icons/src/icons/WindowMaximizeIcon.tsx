import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const WindowMaximizeIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M4,4H20V20H4V4M6,8V18H18V8H6Z" />
  </Icon>
));

WindowMaximizeIcon.displayName = "WindowMaximizeIcon";

export { WindowMaximizeIcon };
