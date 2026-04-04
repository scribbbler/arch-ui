import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const ArrowUpIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z" />
  </Icon>
));

ArrowUpIcon.displayName = "ArrowUpIcon";

export { ArrowUpIcon };
