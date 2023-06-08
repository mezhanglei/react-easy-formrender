import React from 'react';
import { CustomUnionType, GeneratePrams } from "../types";
export declare const parseComponent: (target: CustomUnionType | undefined, typeMap?: {
    [key: string]: React.ElementType<any>;
} | undefined) => any;
export declare const createInstance: (target?: any, typeMap?: {
    [key: string]: React.ElementType<any>;
} | undefined, commonProps?: GeneratePrams) => any;
