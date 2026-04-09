import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const ArrowTopRightIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} rtl {...props}>
    <path d="M5,17.59L15.59,7H9V5H19V15H17V8.41L6.41,19L5,17.59Z" />
  </Icon>
));

ArrowTopRightIcon.displayName = "ArrowTopRightIcon";

export { ArrowTopRightIcon };
