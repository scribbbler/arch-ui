import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const NavigationIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2Z" />
  </Icon>
));

NavigationIcon.displayName = "NavigationIcon";

export { NavigationIcon };
