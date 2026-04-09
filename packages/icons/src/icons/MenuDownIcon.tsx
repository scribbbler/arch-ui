import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const MenuDownIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M7,10L12,15L17,10H7Z" />
  </Icon>
));

MenuDownIcon.displayName = "MenuDownIcon";

export { MenuDownIcon };
