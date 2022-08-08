import React, { CSSProperties } from 'react';
import './btn.less';
import { FormFieldProps, GeneratePrams } from '../types';
export interface DeleteBtnProps extends GeneratePrams {
    onClick?: () => void;
    className?: string;
    style?: CSSProperties;
}
export declare const DeleteBtn: React.FC<DeleteBtnProps>;
export interface AddBtnProps extends GeneratePrams {
    onClick?: () => void;
    className?: string;
    style?: CSSProperties;
    item?: FormFieldProps;
}
export declare const AddBtn: React.FC<AddBtnProps>;
