import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const FlashOutlineIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M7,2H17L13.5,9H17L10,22V14H7V2M9,4V12H12V14.66L14,11H10.24L13.76,4H9Z" />
  </Icon>
));

FlashOutlineIcon.displayName = "FlashOutlineIcon";

export { FlashOutlineIcon };
