import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

const DownloadIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon ref={ref} {...props}>
    <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
  </Icon>
));

DownloadIcon.displayName = "DownloadIcon";

export { DownloadIcon };
