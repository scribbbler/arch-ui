import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const VolumeLowIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M7,9V15H11L16,20V4L11,9H7Z" />
  </Icon>
));

VolumeLowIcon.displayName = "VolumeLowIcon";

export { VolumeLowIcon };
