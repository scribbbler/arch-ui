import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const XIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <line x1="5" y1="5" x2="15" y2="15"/>
  <line x1="15" y1="5" x2="5" y2="15"/>
  </Icon>
));

XIcon.displayName = "XIcon";

export { XIcon };
