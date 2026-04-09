import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const SendIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
  </Icon>
));

SendIcon.displayName = "SendIcon";

export { SendIcon };
