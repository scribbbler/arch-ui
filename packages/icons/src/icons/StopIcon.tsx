import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const StopIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M18,18H6V6H18V18Z" />
  </Icon>
));

StopIcon.displayName = "StopIcon";

export { StopIcon };
