import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const SearchIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <circle cx="8.5" cy="8.5" r="5.5"/>
  <line x1="13" y1="13" x2="17" y2="17"/>
  </Icon>
));

SearchIcon.displayName = "SearchIcon";

export { SearchIcon };
