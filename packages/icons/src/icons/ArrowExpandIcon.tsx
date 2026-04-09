import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const ArrowExpandIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M10,21V19H6.41L10.91,14.5L9.5,13.09L5,17.59V14H3V21H10M14.5,10.91L19,6.41V10H21V3H14V5H17.59L13.09,9.5L14.5,10.91Z" />
  </Icon>
));

ArrowExpandIcon.displayName = "ArrowExpandIcon";

export { ArrowExpandIcon };
