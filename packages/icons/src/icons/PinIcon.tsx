import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const PinIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12Z" />
  </Icon>
));

PinIcon.displayName = "PinIcon";

export { PinIcon };
