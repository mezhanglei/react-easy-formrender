import React, { CSSProperties } from 'react';
import { FormRule } from './form-store';
export interface FormListProps {
    label?: string;
    name?: string;
    children?: React.ReactNode;
    rules?: FormRule[];
    path?: string;
    initialValue?: any[];
    className?: string;
    style?: CSSProperties;
}
export declare const FormList: React.ForwardRefExoticComponent<FormListProps & React.RefAttributes<unknown>>;
