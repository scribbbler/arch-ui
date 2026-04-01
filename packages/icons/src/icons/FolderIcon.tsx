import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const FolderIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M2,5.5 A1.5,1.5,0,0,1,3.5,4 H8 L10,6 H16.5 A1.5,1.5,0,0,1,18,7.5 V15.5 A1.5,1.5,0,0,1,16.5,17 H3.5 A1.5,1.5,0,0,1,2,15.5 Z"/>
  </Icon>
));

FolderIcon.displayName = "FolderIcon";

export { FolderIcon };
