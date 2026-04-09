import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const SwapHorizontalIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M21,9L17,5V8H10V10H17V13M7,11L3,15L7,19V16H14V14H7V11Z" />
  </Icon>
));

SwapHorizontalIcon.displayName = "SwapHorizontalIcon";

export { SwapHorizontalIcon };
