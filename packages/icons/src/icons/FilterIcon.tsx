import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const FilterIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <polyline points="2,3 18,3 11,11.5 11,16 9,17.5 9,11.5 2,3"/>
  </Icon>
));

FilterIcon.displayName = "FilterIcon";

export { FilterIcon };
