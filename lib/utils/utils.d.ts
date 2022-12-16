import { FormFieldProps, PropertiesData } from "../types";
export declare const getPathEnd: (path: string) => string | undefined;
export declare const getParent: (path: string) => string | undefined;
export declare const endIsListItem: (path?: string) => boolean | undefined;
export declare const isPathEnd: (path: string, name: string) => boolean | undefined;
export declare const changePathEnd: (oldPath: string, endName: string | number) => string | undefined;
export declare const getPathEndIndex: (path: string, properties?: PropertiesData) => number;
export declare const getEndIndex: (end?: string, properties?: PropertiesData, parentPath?: string) => number;
export declare const updateItemByPath: (properties: PropertiesData, pathStr: string, data?: Partial<FormFieldProps>) => PropertiesData;
export declare const setItemByPath: (properties: PropertiesData, pathStr: string, data?: Partial<FormFieldProps>) => PropertiesData;
export declare const getItemByPath: (properties?: PropertiesData, pathStr?: string) => any;
export declare const getItemByIndex: (properties: PropertiesData, index: number, parentPath?: string) => any;
export declare const toList: (properties: PropertiesData) => any[];
export declare const updateName: (properties: PropertiesData, pathStr: string, newName?: string) => PropertiesData | undefined;
export declare const addItemByIndex: (properties: PropertiesData, data: FormFieldProps | FormFieldProps[], index?: number, parentPath?: string) => PropertiesData | undefined;
export declare const moveSameLevel: (properties: PropertiesData, from: {
    parent?: string;
    index: number;
}, to: {
    parent?: string;
    index?: number;
}) => PropertiesData | undefined;
export declare const moveDiffLevel: (properties: PropertiesData, from: {
    parent?: string;
    index: number;
}, to: {
    parent?: string;
    index?: number;
}) => PropertiesData | undefined;
export declare const getInitialValues: (properties?: PropertiesData) => {} | undefined;
