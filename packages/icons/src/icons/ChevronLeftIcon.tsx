import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const ChevronLeftIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} rtl {...props}>
    <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
  </Icon>
));

ChevronLeftIcon.displayName = "ChevronLeftIcon";

export { ChevronLeftIcon };
