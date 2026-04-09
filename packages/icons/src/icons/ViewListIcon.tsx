import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const ViewListIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M9,5V9H21V5M9,19H21V15H9M9,14H21V10H9M4,9H8V5H4M4,19H8V15H4M4,14H8V10H4V14Z" />
  </Icon>
));

ViewListIcon.displayName = "ViewListIcon";

export { ViewListIcon };
