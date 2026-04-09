import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const TriangleIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M1,21H23L12,2" />
  </Icon>
));

TriangleIcon.displayName = "TriangleIcon";

export { TriangleIcon };
