import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const FileIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M12,2 H5.5 A1.5,1.5,0,0,0,4,3.5 V16.5 A1.5,1.5,0,0,0,5.5,18 H14.5 A1.5,1.5,0,0,0,16,16.5 V6 Z"/>
  <polyline points="12,2 12,6 16,6"/>
  </Icon>
));

FileIcon.displayName = "FileIcon";

export { FileIcon };
