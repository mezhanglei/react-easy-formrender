/// <reference types="react" />
import { FieldUnionType, FormFieldProps, PropertiesData } from "../types";
export declare const matchExpression: (value?: any) => string | undefined;
export declare const getPathEnd: (path?: string) => string | undefined;
export declare const getParent: (path?: string) => string | undefined;
export declare const endIsListItem: (path?: string) => boolean | undefined;
export declare const changePathEnd: (oldPath: string, endName: string | number) => any;
export declare const updateItemByPath: (properties: PropertiesData, data?: any, path?: string, attributeName?: string) => PropertiesData;
export declare const setItemByPath: (properties: PropertiesData, data?: any, path?: string, attributeName?: string) => PropertiesData;
export declare const getItemByPath: (properties?: PropertiesData, path?: string, attributeName?: string) => any;
export declare const getKeyValueByIndex: (properties: PropertiesData, index?: number, parent?: {
    path?: string;
    attributeName?: string;
}) => any[];
export declare const toEntries: (data: any) => {
    isList: boolean;
    entries: [string, any][];
};
export declare const updateName: (properties: PropertiesData, pathStr?: string, newName?: string) => PropertiesData | undefined;
export declare type InsertItemType = Array<any> | Object | any;
export declare const insertItemByIndex: (properties: PropertiesData, data: InsertItemType, index?: number, parent?: {
    path?: string;
    attributeName?: string;
}) => PropertiesData | undefined;
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
export declare const setExpandControl: (properties?: PropertiesData) => {
    [key: string]: FormFieldProps;
} | undefined;
export declare const parseFromField: (target: FieldUnionType | undefined, typeMap?: {
    [key: string]: import("react").ElementType<any>;
} | undefined) => any;
