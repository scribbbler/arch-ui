import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const ArrowDownIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z" />
  </Icon>
));

ArrowDownIcon.displayName = "ArrowDownIcon";

export { ArrowDownIcon };
