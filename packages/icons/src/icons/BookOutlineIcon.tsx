import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const BookOutlineIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M18,2A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2H18M18,4H13V12L10.5,9.75L8,12V4H6V20H18V4Z" />
  </Icon>
));

BookOutlineIcon.displayName = "BookOutlineIcon";

export { BookOutlineIcon };
