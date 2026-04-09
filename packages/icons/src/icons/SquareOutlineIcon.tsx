import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const SquareOutlineIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M3,3H21V21H3V3M5,5V19H19V5H5Z" />
  </Icon>
));

SquareOutlineIcon.displayName = "SquareOutlineIcon";

export { SquareOutlineIcon };
