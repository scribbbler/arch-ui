import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const ArrowUpIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <line x1="10" y1="15" x2="10" y2="5"/>
  <line x1="10" y1="5" x2="6" y2="9"/>
  <line x1="10" y1="5" x2="14" y2="9"/>
  </Icon>
));

ArrowUpIcon.displayName = "ArrowUpIcon";

export { ArrowUpIcon };
