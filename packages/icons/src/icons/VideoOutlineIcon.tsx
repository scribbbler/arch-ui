import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const VideoOutlineIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M15,8V16H5V8H15M16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5V7A1,1 0 0,0 16,6Z" />
  </Icon>
));

VideoOutlineIcon.displayName = "VideoOutlineIcon";

export { VideoOutlineIcon };
