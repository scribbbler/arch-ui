import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const ArrowBottomLeftIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} rtl {...props}>
    <path d="M19,6.41L17.59,5L7,15.59V9H5V19H15V17H8.41L19,6.41Z" />
  </Icon>
));

ArrowBottomLeftIcon.displayName = "ArrowBottomLeftIcon";

export { ArrowBottomLeftIcon };
