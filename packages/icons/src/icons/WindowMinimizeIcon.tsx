import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const WindowMinimizeIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M20,14H4V10H20" />
  </Icon>
));

WindowMinimizeIcon.displayName = "WindowMinimizeIcon";

export { WindowMinimizeIcon };
