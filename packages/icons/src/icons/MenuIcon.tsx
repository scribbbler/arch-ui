import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const MenuIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
  </Icon>
));

MenuIcon.displayName = "MenuIcon";

export { MenuIcon };
