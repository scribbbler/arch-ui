import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const MenuIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <line x1="3" y1="5" x2="17" y2="5"/>
  <line x1="3" y1="10" x2="17" y2="10"/>
  <line x1="3" y1="15" x2="17" y2="15"/>
  </Icon>
));

MenuIcon.displayName = "MenuIcon";

export { MenuIcon };
