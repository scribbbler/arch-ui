import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const ClockIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <circle cx="10" cy="10" r="8"/>
  <line x1="10" y1="5" x2="10" y2="10"/>
  <line x1="10" y1="10" x2="13" y2="13"/>
  </Icon>
));

ClockIcon.displayName = "ClockIcon";

export { ClockIcon };
