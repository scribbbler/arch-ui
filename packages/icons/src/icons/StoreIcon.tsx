import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const StoreIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M12,18H6V14H12M21,14V12L20,7H4L3,12V14H4V20H14V14H18V20H20V14M20,4H4V6H20V4Z" />
  </Icon>
));

StoreIcon.displayName = "StoreIcon";

export { StoreIcon };
