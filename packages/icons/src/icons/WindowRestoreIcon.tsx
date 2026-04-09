import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const WindowRestoreIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M4,8H8V4H20V16H16V20H4V8M16,8V14H18V6H10V8H16M6,12V18H14V12H6Z" />
  </Icon>
));

WindowRestoreIcon.displayName = "WindowRestoreIcon";

export { WindowRestoreIcon };
