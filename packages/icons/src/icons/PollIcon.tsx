import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const PollIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M3,22V8H7V22H3M10,22V2H14V22H10M17,22V14H21V22H17Z" />
  </Icon>
));

PollIcon.displayName = "PollIcon";

export { PollIcon };
