import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const ArrowLeftBoldIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} rtl {...props}>
    <path d="M20,9V15H12V19.84L4.16,12L12,4.16V9H20Z" />
  </Icon>
));

ArrowLeftBoldIcon.displayName = "ArrowLeftBoldIcon";

export { ArrowLeftBoldIcon };
