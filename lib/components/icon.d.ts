import React from 'react';
import './icon.less';
interface SvgIconProps extends React.HtmlHTMLAttributes<SVGSVGElement> {
    name: string;
    className?: string;
}
declare const SvgIcon: React.ForwardRefExoticComponent<SvgIconProps & React.RefAttributes<SVGSVGElement>>;
export default SvgIcon;
