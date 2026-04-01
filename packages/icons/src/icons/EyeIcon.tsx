import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const EyeIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M2,10 C2,10 5,4 10,4 C15,4 18,10 18,10 C18,10 15,16 10,16 C5,16 2,10 2,10 Z"/>
  <circle cx="10" cy="10" r="3"/>
  </Icon>
));

EyeIcon.displayName = "EyeIcon";

export { EyeIcon };
