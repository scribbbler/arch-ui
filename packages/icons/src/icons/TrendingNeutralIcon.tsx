import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const TrendingNeutralIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M22,12L18,8V11H3V13H18V16L22,12Z" />
  </Icon>
));

TrendingNeutralIcon.displayName = "TrendingNeutralIcon";

export { TrendingNeutralIcon };
