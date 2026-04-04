import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const WarningIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
  </Icon>
));

WarningIcon.displayName = "WarningIcon";

export { WarningIcon };
