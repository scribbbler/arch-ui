import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const SquareRoundedOutlineIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M8 3H16C18.76 3 21 5.24 21 8V16C21 18.76 18.76 21 16 21H8C5.24 21 3 18.76 3 16V8C3 5.24 5.24 3 8 3M8 5C6.34 5 5 6.34 5 8V16C5 17.66 6.34 19 8 19H16C17.66 19 19 17.66 19 16V8C19 6.34 17.66 5 16 5H8Z" />
  </Icon>
));

SquareRoundedOutlineIcon.displayName = "SquareRoundedOutlineIcon";

export { SquareRoundedOutlineIcon };
