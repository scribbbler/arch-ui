import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const ArrowRightIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} rtl {...props}>
    <line x1="5" y1="10" x2="15" y2="10"/>
  <line x1="15" y1="10" x2="11" y2="6"/>
  <line x1="15" y1="10" x2="11" y2="14"/>
  </Icon>
));

ArrowRightIcon.displayName = "ArrowRightIcon";

export { ArrowRightIcon };
