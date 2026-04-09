import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const MenuUpIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M7,15L12,10L17,15H7Z" />
  </Icon>
));

MenuUpIcon.displayName = "MenuUpIcon";

export { MenuUpIcon };
