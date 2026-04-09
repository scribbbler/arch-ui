import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const SquareIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M3,3V21H21V3" />
  </Icon>
));

SquareIcon.displayName = "SquareIcon";

export { SquareIcon };
