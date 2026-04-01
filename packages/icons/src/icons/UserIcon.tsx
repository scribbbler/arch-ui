import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const UserIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <circle cx="10" cy="6" r="3.5"/>
  <path d="M3,18 C3,14 6,11.5 10,11.5 C14,11.5 17,14 17,18"/>
  </Icon>
));

UserIcon.displayName = "UserIcon";

export { UserIcon };
