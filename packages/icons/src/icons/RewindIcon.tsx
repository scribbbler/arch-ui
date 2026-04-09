import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const RewindIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} rtl {...props}>
    <path d="M11.5,12L20,18V6M11,18V6L2.5,12L11,18Z" />
  </Icon>
));

RewindIcon.displayName = "RewindIcon";

export { RewindIcon };
