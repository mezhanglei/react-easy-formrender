import React, { CSSProperties } from 'react';
import { FormOptions } from './form-options-context';
import { FormRule } from './form-store';
export interface FormItemProps extends FormOptions {
    className?: string;
    label?: string;
    name?: string;
    valueProp?: string | ((type: any) => string);
    valueGetter?: (...args: any[]) => any;
    suffix?: React.ReactNode;
    children?: React.ReactNode;
    rules?: FormRule[];
    style?: CSSProperties;
    path?: string;
    initialValue?: any;
}
export declare const classes: {
    field: string;
    inline: string;
    compact: string;
    required: string;
    error: string;
    header: string;
    container: string;
    control: string;
    message: string;
    footer: string;
};
export declare const FormItem: React.ForwardRefExoticComponent<FormItemProps & React.RefAttributes<unknown>>;
