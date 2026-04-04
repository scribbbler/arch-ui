import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const ChevronRightIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} rtl {...props}>
    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
  </Icon>
));

ChevronRightIcon.displayName = "ChevronRightIcon";

export { ChevronRightIcon };
