import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const ChevronRightIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} rtl {...props}>
    <polyline points="7,5 12,10 7,15"/>
  </Icon>
));

ChevronRightIcon.displayName = "ChevronRightIcon";

export { ChevronRightIcon };
