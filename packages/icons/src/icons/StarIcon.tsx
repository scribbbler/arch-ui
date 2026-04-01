import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const StarIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <polygon points="10,2 12.5,7.5 18,8 14,12 15,17.5 10,14.5 5,17.5 6,12 2,8 7.5,7.5"/>
  </Icon>
));

StarIcon.displayName = "StarIcon";

export { StarIcon };
