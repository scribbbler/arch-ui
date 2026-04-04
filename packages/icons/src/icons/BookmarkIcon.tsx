import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const BookmarkIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M17,3H7A2,2 0 0,0 5,5V21L12,18L19,21V5C19,3.89 18.1,3 17,3Z" />
  </Icon>
));

BookmarkIcon.displayName = "BookmarkIcon";

export { BookmarkIcon };
