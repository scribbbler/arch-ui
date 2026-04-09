import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const FlashIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M7,2V13H10V22L17,10H13L17,2H7Z" />
  </Icon>
));

FlashIcon.displayName = "FlashIcon";

export { FlashIcon };
