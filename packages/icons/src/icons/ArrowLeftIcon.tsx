import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const ArrowLeftIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} rtl {...props}>
    <line x1="15" y1="10" x2="5" y2="10"/>
  <line x1="5" y1="10" x2="9" y2="6"/>
  <line x1="5" y1="10" x2="9" y2="14"/>
  </Icon>
));

ArrowLeftIcon.displayName = "ArrowLeftIcon";

export { ArrowLeftIcon };
