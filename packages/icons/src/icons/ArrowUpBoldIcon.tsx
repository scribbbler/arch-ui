import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const ArrowUpBoldIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M15,20H9V12H4.16L12,4.16L19.84,12H15V20Z" />
  </Icon>
));

ArrowUpBoldIcon.displayName = "ArrowUpBoldIcon";

export { ArrowUpBoldIcon };
