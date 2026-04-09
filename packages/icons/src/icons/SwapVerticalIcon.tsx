import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const SwapVerticalIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M9,3L5,7H8V14H10V7H13M16,17V10H14V17H11L15,21L19,17H16Z" />
  </Icon>
));

SwapVerticalIcon.displayName = "SwapVerticalIcon";

export { SwapVerticalIcon };
