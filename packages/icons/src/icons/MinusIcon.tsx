import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const MinusIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M19,13H5V11H19V13Z" />
  </Icon>
));

MinusIcon.displayName = "MinusIcon";

export { MinusIcon };
