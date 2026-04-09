import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const ArrowBottomRightIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} rtl {...props}>
    <path d="M5,6.41L6.41,5L17,15.59V9H19V19H9V17H15.59L5,6.41Z" />
  </Icon>
));

ArrowBottomRightIcon.displayName = "ArrowBottomRightIcon";

export { ArrowBottomRightIcon };
