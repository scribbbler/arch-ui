import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const UploadIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z" />
  </Icon>
));

UploadIcon.displayName = "UploadIcon";

export { UploadIcon };
