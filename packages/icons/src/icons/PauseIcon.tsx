import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const PauseIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M14,19H18V5H14M6,19H10V5H6V19Z" />
  </Icon>
));

PauseIcon.displayName = "PauseIcon";

export { PauseIcon };
