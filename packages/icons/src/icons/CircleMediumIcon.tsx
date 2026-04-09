import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const CircleMediumIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z" />
  </Icon>
));

CircleMediumIcon.displayName = "CircleMediumIcon";

export { CircleMediumIcon };
