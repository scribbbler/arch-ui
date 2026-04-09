import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const ArrowDownBoldIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M9,4H15V12H19.84L12,19.84L4.16,12H9V4Z" />
  </Icon>
));

ArrowDownBoldIcon.displayName = "ArrowDownBoldIcon";

export { ArrowDownBoldIcon };
