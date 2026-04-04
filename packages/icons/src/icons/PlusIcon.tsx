import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const PlusIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
  </Icon>
));

PlusIcon.displayName = "PlusIcon";

export { PlusIcon };
