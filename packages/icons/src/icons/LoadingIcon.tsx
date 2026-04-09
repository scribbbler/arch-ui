import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const LoadingIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
  </Icon>
));

LoadingIcon.displayName = "LoadingIcon";

export { LoadingIcon };
