import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const UploadIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <line x1="10" y1="13" x2="10" y2="3"/>
  <polyline points="6,7 10,3 14,7"/>
  <path d="M3,15v1.5A1.5,1.5,0,0,0,4.5,18h11a1.5,1.5,0,0,0,1.5-1.5V15"/>
  </Icon>
));

UploadIcon.displayName = "UploadIcon";

export { UploadIcon };
