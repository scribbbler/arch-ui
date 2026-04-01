import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const MinusIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <line x1="4" y1="10" x2="16" y2="10"/>
  </Icon>
));

MinusIcon.displayName = "MinusIcon";

export { MinusIcon };
