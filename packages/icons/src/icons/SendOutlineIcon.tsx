import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const SendOutlineIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M4 6.03L11.5 9.25L4 8.25L4 6.03M11.5 14.75L4 17.97V15.75L11.5 14.75M2 3L2 10L17 12L2 14L2 21L23 12L2 3Z" />
  </Icon>
));

SendOutlineIcon.displayName = "SendOutlineIcon";

export { SendOutlineIcon };
