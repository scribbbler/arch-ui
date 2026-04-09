import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const FormatAlignLeftIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} rtl {...props}>
    <path d="M3,3H21V5H3V3M3,7H15V9H3V7M3,11H21V13H3V11M3,15H15V17H3V15M3,19H21V21H3V19Z" />
  </Icon>
));

FormatAlignLeftIcon.displayName = "FormatAlignLeftIcon";

export { FormatAlignLeftIcon };
