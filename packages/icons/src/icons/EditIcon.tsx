import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const EditIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M14.5 2.5l3 3L7 16H4v-3L14.5 2.5z"/>
  </Icon>
));

EditIcon.displayName = "EditIcon";

export { EditIcon };
