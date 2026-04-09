import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const DoorOpenIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M12,3C10.89,3 10,3.89 10,5H3V19H2V21H22V19H21V5C21,3.89 20.11,3 19,3H12M12,5H19V19H12V5M5,11H7V13H5V11Z" />
  </Icon>
));

DoorOpenIcon.displayName = "DoorOpenIcon";

export { DoorOpenIcon };
