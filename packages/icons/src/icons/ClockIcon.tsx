import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const ClockIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z" />
  </Icon>
));

ClockIcon.displayName = "ClockIcon";

export { ClockIcon };
