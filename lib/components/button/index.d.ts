import React from 'react';
import "./index.less";
export declare type BUTTON_TYPE = "primary" | "default" | "dashed" | "ghost";
export declare type HTML_TYPE = "button" | "submit" | "reset";
export declare type SHAPE_TYPE = "circle";
export declare type SIZE_TYPE = "large" | "small";
export interface ButtonProps {
    prefixCls?: string;
    type?: BUTTON_TYPE;
    htmlType?: HTML_TYPE;
    shape?: SHAPE_TYPE;
    ghost?: boolean;
    size?: SIZE_TYPE;
    danger?: boolean;
    disabled?: boolean;
    onClick?: (e: any) => any;
    className?: string;
    children?: React.ReactNode;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<any>>;
export default Button;
