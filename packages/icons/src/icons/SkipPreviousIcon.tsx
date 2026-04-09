import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const SkipPreviousIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} rtl {...props}>
    <path d="M6,18V6H8V18H6M9.5,12L18,6V18L9.5,12Z" />
  </Icon>
));

SkipPreviousIcon.displayName = "SkipPreviousIcon";

export { SkipPreviousIcon };
