import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const LayersIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M12,16L19.36,10.27L21,9L12,2L3,9L4.63,10.27M12,18.54L4.62,12.81L3,14.07L12,21.07L21,14.07L19.37,12.8L12,18.54Z" />
  </Icon>
));

LayersIcon.displayName = "LayersIcon";

export { LayersIcon };
