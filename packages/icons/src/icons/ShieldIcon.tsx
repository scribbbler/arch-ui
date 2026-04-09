import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const ShieldIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1Z" />
  </Icon>
));

ShieldIcon.displayName = "ShieldIcon";

export { ShieldIcon };
