import React, { CSSProperties } from 'react';
import { FormRule } from './form-store';
export interface FormListProps {
    label?: string;
    suffix?: React.ReactNode;
    name?: string;
    rules?: FormRule[];
    path?: string;
    initialValue?: any[];
    className?: string;
    style?: CSSProperties;
    children?: React.ReactNode;
}
export declare const FormList: React.ForwardRefExoticComponent<FormListProps & React.RefAttributes<unknown>>;
