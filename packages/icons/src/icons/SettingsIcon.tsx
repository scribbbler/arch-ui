import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const SettingsIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <circle cx="10" cy="10" r="3"/>
  <path d="M10,1.5 L11.5,4 L14.5,3 L14.5,6 L17.5,7 L16,9.5 L18.5,11.5 L16,13 L17.5,15.5 L14.5,15.5 L14.5,18.5 L11.5,17 L10,19.5 L8.5,17 L5.5,18.5 L5.5,15.5 L2.5,15.5 L4,13 L1.5,11.5 L4,9.5 L2.5,7 L5.5,6 L5.5,3 L8.5,4 Z"/>
  </Icon>
));

SettingsIcon.displayName = "SettingsIcon";

export { SettingsIcon };
