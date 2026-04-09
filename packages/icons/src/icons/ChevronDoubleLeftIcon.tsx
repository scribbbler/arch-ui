import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const ChevronDoubleLeftIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} rtl {...props}>
    <path d="M18.41,7.41L17,6L11,12L17,18L18.41,16.59L13.83,12L18.41,7.41M12.41,7.41L11,6L5,12L11,18L12.41,16.59L7.83,12L12.41,7.41Z" />
  </Icon>
));

ChevronDoubleLeftIcon.displayName = "ChevronDoubleLeftIcon";

export { ChevronDoubleLeftIcon };
