import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const CreditCardIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M20 4H4A2 2 0 0 0 2 6V18A2 2 0 0 0 4 20H20A2 2 0 0 0 22 18V6A2 2 0 0 0 20 4M20 11H4V8H20Z" />
  </Icon>
));

CreditCardIcon.displayName = "CreditCardIcon";

export { CreditCardIcon };
