import React from 'react';
import { GeneratePrams } from "../types";
declare const createInstance: (target?: any, typeMap?: {
    [key: string]: React.ElementType<any>;
} | undefined, commonProps?: GeneratePrams) => any;
export default createInstance;