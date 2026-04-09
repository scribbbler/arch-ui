import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const EmailIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
  </Icon>
));

EmailIcon.displayName = "EmailIcon";

export { EmailIcon };
