import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const MinusCircleIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M17,13H7V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
  </Icon>
));

MinusCircleIcon.displayName = "MinusCircleIcon";

export { MinusCircleIcon };
