import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const PlayIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
  </Icon>
));

PlayIcon.displayName = "PlayIcon";

export { PlayIcon };
