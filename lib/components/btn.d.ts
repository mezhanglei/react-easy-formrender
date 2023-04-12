import React, { CSSProperties } from 'react';
import './btn.less';
import { GenerateFieldProps, GeneratePrams } from '../types';
export interface DeleteBtnProps extends GeneratePrams<any> {
    onClick?: () => void;
    className?: string;
    style?: CSSProperties;
}
export declare const DeleteBtn: React.FC<DeleteBtnProps>;
export interface AddBtnProps extends GeneratePrams<any> {
    onClick?: () => void;
    className?: string;
    style?: CSSProperties;
    item?: GenerateFieldProps;
}
export declare const AddBtn: React.FC<AddBtnProps>;
