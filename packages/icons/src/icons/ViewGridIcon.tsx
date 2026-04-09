import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const ViewGridIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M3,11H11V3H3M3,21H11V13H3M13,21H21V13H13M13,3V11H21V3" />
  </Icon>
));

ViewGridIcon.displayName = "ViewGridIcon";

export { ViewGridIcon };
