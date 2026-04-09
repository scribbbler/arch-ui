import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const ArrowRightBoldIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} rtl {...props}>
    <path d="M4,15V9H12V4.16L19.84,12L12,19.84V15H4Z" />
  </Icon>
));

ArrowRightBoldIcon.displayName = "ArrowRightBoldIcon";

export { ArrowRightBoldIcon };
