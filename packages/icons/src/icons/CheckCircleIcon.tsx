import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const CheckCircleIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <circle cx="10" cy="10" r="8"/>
  <polyline points="6.5,10 9,12.5 13.5,7.5"/>
  </Icon>
));

CheckCircleIcon.displayName = "CheckCircleIcon";

export { CheckCircleIcon };
