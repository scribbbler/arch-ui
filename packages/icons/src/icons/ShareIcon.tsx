import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const ShareIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M21,12L14,5V9C7,10 4,15 3,20C5.5,16.5 9,14.9 14,14.9V19L21,12Z" />
  </Icon>
));

ShareIcon.displayName = "ShareIcon";

export { ShareIcon };
