import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const FilterVariantIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M6,13H18V11H6M3,6V8H21V6M10,18H14V16H10V18Z" />
  </Icon>
));

FilterVariantIcon.displayName = "FilterVariantIcon";

export { FilterVariantIcon };
