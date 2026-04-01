import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const CopyIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <rect x="8" y="8" width="9" height="9" rx="1.5"/>
  <path d="M5,14V4.5A1.5,1.5,0,0,1,6.5,3H12"/>
  </Icon>
));

CopyIcon.displayName = "CopyIcon";

export { CopyIcon };
