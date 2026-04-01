import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const CheckIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <polyline points="4,10.5 8,14.5 16,5.5"/>
  </Icon>
));

CheckIcon.displayName = "CheckIcon";

export { CheckIcon };
