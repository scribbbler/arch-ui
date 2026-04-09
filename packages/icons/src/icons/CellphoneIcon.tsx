import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const CellphoneIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M17,19H7V5H17M17,1H7C5.89,1 5,1.89 5,3V21A2,2 0 0,0 7,23H17A2,2 0 0,0 19,21V3C19,1.89 18.1,1 17,1Z" />
  </Icon>
));

CellphoneIcon.displayName = "CellphoneIcon";

export { CellphoneIcon };
