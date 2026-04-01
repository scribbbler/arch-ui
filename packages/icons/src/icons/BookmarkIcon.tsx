import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const BookmarkIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M5,2 H15 V18 L10,14 L5,18 Z"/>
  </Icon>
));

BookmarkIcon.displayName = "BookmarkIcon";

export { BookmarkIcon };
