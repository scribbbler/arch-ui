import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const SkipNextIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} rtl {...props}>
    <path d="M16,18H18V6H16M6,18L14.5,12L6,6V18Z" />
  </Icon>
));

SkipNextIcon.displayName = "SkipNextIcon";

export { SkipNextIcon };
