import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const FormatQuoteCloseIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z" />
  </Icon>
));

FormatQuoteCloseIcon.displayName = "FormatQuoteCloseIcon";

export { FormatQuoteCloseIcon };
