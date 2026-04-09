import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const HomeVariantIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M12,3L20,9V21H15V14H9V21H4V9L12,3Z" />
  </Icon>
));

HomeVariantIcon.displayName = "HomeVariantIcon";

export { HomeVariantIcon };
