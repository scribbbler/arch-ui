import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const UsersIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <circle cx="8" cy="6" r="3"/>
  <path d="M2,18 C2,14.5 4.5,12 8,12 C11.5,12 14,14.5 14,18"/>
  <circle cx="15" cy="7" r="2.5"/>
  <path d="M15.5,12 C17.5,12.5 19,14.5 19,18"/>
  </Icon>
));

UsersIcon.displayName = "UsersIcon";

export { UsersIcon };
