import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const PlusIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <line x1="10" y1="4" x2="10" y2="16"/>
  <line x1="4" y1="10" x2="16" y2="10"/>
  </Icon>
));

PlusIcon.displayName = "PlusIcon";

export { PlusIcon };
