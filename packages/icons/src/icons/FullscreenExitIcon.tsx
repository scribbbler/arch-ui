import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const FullscreenExitIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M14,14H19V16H16V19H14V14M5,14H10V19H8V16H5V14M8,5H10V10H5V8H8V5M19,8V10H14V5H16V8H19Z" />
  </Icon>
));

FullscreenExitIcon.displayName = "FullscreenExitIcon";

export { FullscreenExitIcon };
