import { FormFieldProps, SchemaData } from "../types";
export declare const getPathEnd: (path: string) => string | undefined;
export declare const getParent: (path: string) => string | undefined;
export declare const endIsListItem: (path: string) => boolean | undefined;
export declare const isPathEnd: (path: string, name: string) => boolean | undefined;
export declare const changePathEnd: (oldPath: string, endName: string | number) => string | undefined;
export declare const getPathEndIndex: (path: string, properties?: SchemaData['properties']) => number;
export declare const updateItemByPath: (properties: SchemaData['properties'], pathStr: string, data?: Partial<FormFieldProps>) => import("../types").PropertiesData | undefined;
export declare const setItemByPath: (properties: SchemaData['properties'], pathStr: string, data?: Partial<FormFieldProps>) => import("../types").PropertiesData | undefined;
export declare const getItemByPath: (properties: SchemaData['properties'], pathStr?: string) => any;
export declare const getItemByIndex: (properties: SchemaData['properties'], index: number, parentPath?: string) => any;
export declare const toList: (properties: SchemaData['properties']) => any[];
export declare const updateName: (properties: SchemaData['properties'], pathStr: string, newName?: string) => import("../types").PropertiesData | undefined;
export declare const addItemByIndex: (properties: SchemaData['properties'], data: FormFieldProps | FormFieldProps[], index?: number, parentPath?: string) => import("../types").PropertiesData | undefined;
export declare const moveSameLevel: (properties: SchemaData['properties'], from: {
    parent?: string;
    index: number;
}, to: {
    parent?: string;
    index?: number;
}) => import("../types").PropertiesData | undefined;
export declare const moveDiffLevel: (properties: SchemaData['properties'], from: {
    parent?: string;
    index: number;
}, to: {
    parent?: string;
    index?: number;
}) => import("../types").PropertiesData | undefined;
export declare const getInitialValues: (properties?: SchemaData['properties']) => {} | undefined;
