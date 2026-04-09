import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const TriangleOutlineIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M12,2L1,21H23M12,6L19.53,19H4.47" />
  </Icon>
));

TriangleOutlineIcon.displayName = "TriangleOutlineIcon";

export { TriangleOutlineIcon };
