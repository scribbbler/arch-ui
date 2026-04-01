import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const WarningIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M10,2 L18.66,17 H1.34 Z"/>
  <line x1="10" y1="7" x2="10" y2="12"/>
  <line x1="10" y1="14.5" x2="10.01" y2="14.5"/>
  </Icon>
));

WarningIcon.displayName = "WarningIcon";

export { WarningIcon };
