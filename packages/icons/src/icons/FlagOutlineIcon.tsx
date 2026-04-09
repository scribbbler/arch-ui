import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const FlagOutlineIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M12.36,6L12.76,8H18V14H14.64L14.24,12H7V6H12.36M14,4H5V21H7V14H12.6L13,16H20V6H14.4" />
  </Icon>
));

FlagOutlineIcon.displayName = "FlagOutlineIcon";

export { FlagOutlineIcon };
