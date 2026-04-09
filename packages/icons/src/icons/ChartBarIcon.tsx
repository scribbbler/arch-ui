import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const ChartBarIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M22,21H2V3H4V19H6V10H10V19H12V6H16V19H18V14H22V21Z" />
  </Icon>
));

ChartBarIcon.displayName = "ChartBarIcon";

export { ChartBarIcon };
