import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const TrashIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
  </Icon>
));

TrashIcon.displayName = "TrashIcon";

export { TrashIcon };
