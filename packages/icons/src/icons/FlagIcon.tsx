import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const FlagIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M14.4,6L14,4H5V21H7V14H12.6L13,16H20V6H14.4Z" />
  </Icon>
));

FlagIcon.displayName = "FlagIcon";

export { FlagIcon };
