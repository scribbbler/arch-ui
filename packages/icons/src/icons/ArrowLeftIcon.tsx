import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const ArrowLeftIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} rtl {...props}>
    <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
  </Icon>
));

ArrowLeftIcon.displayName = "ArrowLeftIcon";

export { ArrowLeftIcon };
