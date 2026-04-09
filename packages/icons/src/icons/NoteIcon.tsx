import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const NoteIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M14,10V4.5L19.5,10M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V9L15,3H5Z" />
  </Icon>
));

NoteIcon.displayName = "NoteIcon";

export { NoteIcon };
