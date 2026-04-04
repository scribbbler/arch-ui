import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const ChevronDownIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
  </Icon>
));

ChevronDownIcon.displayName = "ChevronDownIcon";

export { ChevronDownIcon };
