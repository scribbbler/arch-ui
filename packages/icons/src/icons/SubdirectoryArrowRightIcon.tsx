import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const SubdirectoryArrowRightIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} rtl {...props}>
    <path d="M19,15L13,21L11.58,19.58L15.17,16H4V4H6V14H15.17L11.58,10.42L13,9L19,15Z" />
  </Icon>
));

SubdirectoryArrowRightIcon.displayName = "SubdirectoryArrowRightIcon";

export { SubdirectoryArrowRightIcon };
