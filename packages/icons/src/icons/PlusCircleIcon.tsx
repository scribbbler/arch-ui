import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const PlusCircleIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M17,13H13V17H11V13H7V11H11V7H13V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
  </Icon>
));

PlusCircleIcon.displayName = "PlusCircleIcon";

export { PlusCircleIcon };
