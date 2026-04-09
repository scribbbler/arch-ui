import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const FileMultipleIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M15,7H20.5L15,1.5V7M8,0H16L22,6V18A2,2 0 0,1 20,20H8C6.89,20 6,19.1 6,18V2A2,2 0 0,1 8,0M4,4V22H20V24H4A2,2 0 0,1 2,22V4H4Z" />
  </Icon>
));

FileMultipleIcon.displayName = "FileMultipleIcon";

export { FileMultipleIcon };
