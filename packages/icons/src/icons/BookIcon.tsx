import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const BookIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M18,22A2,2 0 0,0 20,20V4C20,2.89 19.1,2 18,2H12V9L9.5,7.5L7,9V2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18Z" />
  </Icon>
));

BookIcon.displayName = "BookIcon";

export { BookIcon };
