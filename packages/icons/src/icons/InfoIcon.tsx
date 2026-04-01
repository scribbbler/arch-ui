import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const InfoIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <circle cx="10" cy="10" r="8"/>
  <line x1="10" y1="9" x2="10" y2="14"/>
  <line x1="10" y1="6" x2="10.01" y2="6"/>
  </Icon>
));

InfoIcon.displayName = "InfoIcon";

export { InfoIcon };
