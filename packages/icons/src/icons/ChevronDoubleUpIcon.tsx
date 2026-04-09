import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const ChevronDoubleUpIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M7.41,18.41L6,17L12,11L18,17L16.59,18.41L12,13.83L7.41,18.41M7.41,12.41L6,11L12,5L18,11L16.59,12.41L12,7.83L7.41,12.41Z" />
  </Icon>
));

ChevronDoubleUpIcon.displayName = "ChevronDoubleUpIcon";

export { ChevronDoubleUpIcon };
