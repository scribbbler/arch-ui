import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const ImageIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <rect x="2" y="3" width="16" height="14" rx="1.5"/>
  <circle cx="7" cy="8" r="2"/>
  <polyline points="18,12 14,8 6,17"/>
  </Icon>
));

ImageIcon.displayName = "ImageIcon";

export { ImageIcon };
