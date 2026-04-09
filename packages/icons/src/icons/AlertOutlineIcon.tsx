import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const AlertOutlineIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16" />
  </Icon>
));

AlertOutlineIcon.displayName = "AlertOutlineIcon";

export { AlertOutlineIcon };
