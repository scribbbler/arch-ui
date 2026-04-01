import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const ChevronDownIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <polyline points="5,7 10,12 15,7"/>
  </Icon>
));

ChevronDownIcon.displayName = "ChevronDownIcon";

export { ChevronDownIcon };
