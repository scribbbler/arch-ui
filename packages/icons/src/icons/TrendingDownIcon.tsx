import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const TrendingDownIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M16,18L18.29,15.71L13.41,10.83L9.41,14.83L2,7.41L3.41,6L9.41,12L13.41,8L19.71,14.29L22,12V18H16Z" />
  </Icon>
));

TrendingDownIcon.displayName = "TrendingDownIcon";

export { TrendingDownIcon };
