import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const MenuLeftIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} rtl {...props}>
    <path d="M14,7L9,12L14,17V7Z" />
  </Icon>
));

MenuLeftIcon.displayName = "MenuLeftIcon";

export { MenuLeftIcon };
