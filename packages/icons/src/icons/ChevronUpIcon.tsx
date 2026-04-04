import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const ChevronUpIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" />
  </Icon>
));

ChevronUpIcon.displayName = "ChevronUpIcon";

export { ChevronUpIcon };
