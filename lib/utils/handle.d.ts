import React from 'react';
import { CustomUnionType, GenerateParams } from "../types";
export declare const parseComponent: (target: CustomUnionType | undefined, typeMap?: {
    [key: string]: React.ElementType<any>;
} | undefined) => {} | null | undefined;
export declare const renderComponent: (target?: any, typeMap?: {
    [key: string]: React.ElementType<any>;
} | undefined, commonProps?: GenerateParams) => any;
