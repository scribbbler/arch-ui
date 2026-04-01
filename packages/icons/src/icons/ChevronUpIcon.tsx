import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const ChevronUpIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <polyline points="15,13 10,8 5,13"/>
  </Icon>
));

ChevronUpIcon.displayName = "ChevronUpIcon";

export { ChevronUpIcon };
