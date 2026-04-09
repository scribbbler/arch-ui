import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const VideoOffIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M3.27,2L2,3.27L4.73,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16C16.2,18 16.39,17.92 16.54,17.82L19.73,21L21,19.73M21,6.5L17,10.5V7A1,1 0 0,0 16,6H9.82L21,17.18V6.5Z" />
  </Icon>
));

VideoOffIcon.displayName = "VideoOffIcon";

export { VideoOffIcon };
