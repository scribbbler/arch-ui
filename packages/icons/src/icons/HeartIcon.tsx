import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const HeartIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M10,17 C10,17 2,12 2,7 A4,4,0,0,1,10,5 A4,4,0,0,1,18,7 C18,12 10,17 10,17 Z"/>
  </Icon>
));

HeartIcon.displayName = "HeartIcon";

export { HeartIcon };
