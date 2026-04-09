import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const SchoolIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z" />
  </Icon>
));

SchoolIcon.displayName = "SchoolIcon";

export { SchoolIcon };
