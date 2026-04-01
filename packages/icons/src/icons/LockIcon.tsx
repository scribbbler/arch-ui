import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const LockIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <rect x="4" y="9" width="12" height="9" rx="1.5"/>
  <path d="M7,9V6a3,3,0,0,1,6,0V9"/>
  </Icon>
));

LockIcon.displayName = "LockIcon";

export { LockIcon };
