import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const ExternalLinkIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} rtl {...props}>
    <path d="M11,3h6v6"/>
  <line x1="17" y1="3" x2="9" y2="11"/>
  <path d="M15,11v5.5a1.5,1.5,0,0,1-1.5,1.5H3.5A1.5,1.5,0,0,1,2,16.5V6.5A1.5,1.5,0,0,1,3.5,5H9"/>
  </Icon>
));

ExternalLinkIcon.displayName = "ExternalLinkIcon";

export { ExternalLinkIcon };
