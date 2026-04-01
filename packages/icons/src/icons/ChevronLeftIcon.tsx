import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const ChevronLeftIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} rtl {...props}>
    <polyline points="13,15 8,10 13,5"/>
  </Icon>
));

ChevronLeftIcon.displayName = "ChevronLeftIcon";

export { ChevronLeftIcon };
