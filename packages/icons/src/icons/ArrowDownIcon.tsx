import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const ArrowDownIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <line x1="10" y1="5" x2="10" y2="15"/>
  <line x1="10" y1="15" x2="6" y2="11"/>
  <line x1="10" y1="15" x2="14" y2="11"/>
  </Icon>
));

ArrowDownIcon.displayName = "ArrowDownIcon";

export { ArrowDownIcon };
