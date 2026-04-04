import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const StarIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
  </Icon>
));

StarIcon.displayName = "StarIcon";

export { StarIcon };
