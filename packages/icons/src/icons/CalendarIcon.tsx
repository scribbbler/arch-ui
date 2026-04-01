import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const CalendarIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <rect x="3" y="4" width="14" height="14" rx="1.5"/>
  <line x1="3" y1="9" x2="17" y2="9"/>
  <line x1="7" y1="2" x2="7" y2="6"/>
  <line x1="13" y1="2" x2="13" y2="6"/>
  </Icon>
));

CalendarIcon.displayName = "CalendarIcon";

export { CalendarIcon };
