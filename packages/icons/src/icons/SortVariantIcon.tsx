import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const SortVariantIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M3,13H15V11H3M3,6V8H21V6M3,18H9V16H3V18Z" />
  </Icon>
));

SortVariantIcon.displayName = "SortVariantIcon";

export { SortVariantIcon };
