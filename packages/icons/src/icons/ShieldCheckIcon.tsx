import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const ShieldCheckIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1Z" />
  </Icon>
));

ShieldCheckIcon.displayName = "ShieldCheckIcon";

export { ShieldCheckIcon };
