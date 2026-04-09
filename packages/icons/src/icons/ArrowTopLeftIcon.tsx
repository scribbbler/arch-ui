import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const ArrowTopLeftIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} rtl {...props}>
    <path d="M19,17.59L17.59,19L7,8.41V15H5V5H15V7H8.41L19,17.59Z" />
  </Icon>
));

ArrowTopLeftIcon.displayName = "ArrowTopLeftIcon";

export { ArrowTopLeftIcon };
