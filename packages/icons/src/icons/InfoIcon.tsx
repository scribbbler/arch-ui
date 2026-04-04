import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const InfoIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
  </Icon>
));

InfoIcon.displayName = "InfoIcon";

export { InfoIcon };
