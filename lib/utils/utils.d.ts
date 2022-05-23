import { FormFieldProps, SchemaData } from "../types";
export declare const pathToArray: (pathStr?: string | undefined) => string[];
export declare const updateItemByPath: (properties: SchemaData['properties'], pathStr: string, data?: Partial<FormFieldProps> | undefined) => FormFieldProps[] | {
    [key: string]: FormFieldProps;
};
export declare const setItemByPath: (properties: SchemaData['properties'], pathStr: string, data?: Partial<FormFieldProps> | undefined) => FormFieldProps[] | {
    [key: string]: FormFieldProps;
};
export declare const getItemByPath: (properties: SchemaData['properties'], pathStr?: string | undefined) => any;
export declare const getKeyValueByIndex: (properties: SchemaData['properties'], index: number, parentPath?: string | undefined) => {
    name: string;
    field: any;
};
interface DataListType extends FormFieldProps {
    propertiesType?: 'array' | 'object';
    properties?: DataListType[];
}
export declare const treeItemToListItem: (name: string, field: FormFieldProps) => DataListType;
export declare const objToArr: (properties: SchemaData['properties']) => DataListType[];
export declare const addItemByIndex: (properties: SchemaData['properties'], data: {
    name: string;
    field: FormFieldProps;
}, index?: number | undefined, parentPath?: string | undefined) => FormFieldProps[] | {
    [key: string]: FormFieldProps;
} | undefined;
export declare const swapSameLevel: (properties: SchemaData['properties'], from: {
    parentPath?: string;
    index: number;
}, to: {
    parentPath?: string;
    index: number;
}) => FormFieldProps[] | {
    [key: string]: FormFieldProps;
} | undefined;
export declare const swapDiffLevel: (properties: SchemaData['properties'], from: {
    parentPath?: string;
    index: number;
}, to: {
    parentPath?: string;
    index: number;
}) => FormFieldProps[] | {
    [key: string]: FormFieldProps;
} | undefined;
export {};
