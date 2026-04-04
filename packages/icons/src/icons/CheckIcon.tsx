import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const CheckIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
  </Icon>
));

CheckIcon.displayName = "CheckIcon";

export { CheckIcon };
