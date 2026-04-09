import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const MenuRightIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} rtl {...props}>
    <path d="M10,17L15,12L10,7V17Z" />
  </Icon>
));

MenuRightIcon.displayName = "MenuRightIcon";

export { MenuRightIcon };
