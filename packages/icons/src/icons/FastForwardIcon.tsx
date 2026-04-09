import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const FastForwardIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} rtl {...props}>
    <path d="M13,6V18L21.5,12M4,18L12.5,12L4,6V18Z" />
  </Icon>
));

FastForwardIcon.displayName = "FastForwardIcon";

export { FastForwardIcon };
