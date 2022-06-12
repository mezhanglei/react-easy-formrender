import React, { CSSProperties } from 'react';
export interface DeleteBtnProps {
    onClick?: () => void;
    className?: string;
    style?: CSSProperties;
}
export declare const DeleteBtn: React.FC<DeleteBtnProps>;
