/// <reference types="react" />
import { FormFieldProps, SchemaData } from "../types";
export declare const pathToArray: (pathStr?: string) => string[];
export declare const updateItemByPath: (properties: SchemaData['properties'], pathStr: string, data?: Partial<FormFieldProps>) => FormFieldProps[] | {
    [key: string]: FormFieldProps;
} | undefined;
export declare const setItemByPath: (properties: SchemaData['properties'], pathStr: string, data?: Partial<FormFieldProps>) => FormFieldProps[] | {
    [key: string]: FormFieldProps;
} | undefined;
export declare const getItemByPath: (properties: SchemaData['properties'], pathStr?: string) => any;
export declare const getKeyValueByIndex: (properties: SchemaData['properties'], index: number, parentPath?: string) => {
    name: string;
    field: any;
};
export declare const treeItemToListItem: (name: string, field: FormFieldProps) => {
    properties?: {
        [name: string]: FormFieldProps;
    } | FormFieldProps[] | undefined;
    ignore?: boolean | undefined;
    label?: string | undefined;
    inline?: boolean | undefined;
    layout?: string | undefined;
    className?: string | undefined;
    children?: any;
    style?: import("react").CSSProperties | undefined;
    colon?: boolean | undefined;
    required?: boolean | undefined;
    labelWidth?: number | undefined;
    labelAlign?: import("csstype").Property.TextAlign | undefined;
    labelStyle?: import("react").CSSProperties | undefined;
    gutter?: number | undefined;
    compact?: boolean | undefined;
    error?: string | undefined;
    suffix?: any;
    footer?: any;
    name: string;
    parent?: string | undefined;
    index?: number | undefined;
    valueProp?: string | ((type: any) => string) | undefined;
    rules?: import("react-easy-formcore").FormRule[] | undefined;
    initialValue?: any;
    errorClassName?: string | undefined;
    onFieldsChange?: ((obj: {
        parent?: string | undefined;
        name?: string | undefined;
        value: any;
    }) => void) | undefined;
    onValuesChange?: ((obj: {
        parent?: string | undefined;
        name?: string | undefined;
        value: any;
    }) => void) | undefined;
    component?: any;
    valueGetter?: any;
    valueSetter?: any;
    fieldComponent?: import("../types").FieldUnionType | undefined;
    inside?: import("../types").FieldUnionType | undefined;
    outside?: import("../types").FieldUnionType | undefined;
    readOnly?: boolean | undefined;
    readOnlyRender?: import("../types").FieldUnionType | import("react").ReactNode;
    typeRender?: any;
    type?: string | undefined;
    props?: any;
    hidden?: string | boolean | undefined;
};
export declare const toList: (properties: SchemaData['properties']) => {
    properties?: {
        [name: string]: FormFieldProps;
    } | FormFieldProps[] | undefined;
    ignore?: boolean | undefined;
    label?: string | undefined;
    inline?: boolean | undefined;
    layout?: string | undefined;
    className?: string | undefined;
    children?: any;
    style?: import("react").CSSProperties | undefined;
    colon?: boolean | undefined;
    required?: boolean | undefined;
    labelWidth?: number | undefined;
    labelAlign?: import("csstype").Property.TextAlign | undefined;
    labelStyle?: import("react").CSSProperties | undefined;
    gutter?: number | undefined;
    compact?: boolean | undefined;
    error?: string | undefined;
    suffix?: any;
    footer?: any;
    name: string;
    parent?: string | undefined;
    index?: number | undefined;
    valueProp?: string | ((type: any) => string) | undefined;
    rules?: import("react-easy-formcore").FormRule[] | undefined;
    initialValue?: any;
    errorClassName?: string | undefined;
    onFieldsChange?: ((obj: {
        parent?: string | undefined;
        name?: string | undefined;
        value: any;
    }) => void) | undefined;
    onValuesChange?: ((obj: {
        parent?: string | undefined;
        name?: string | undefined;
        value: any;
    }) => void) | undefined;
    component?: any;
    valueGetter?: any;
    valueSetter?: any;
    fieldComponent?: import("../types").FieldUnionType | undefined;
    inside?: import("../types").FieldUnionType | undefined;
    outside?: import("../types").FieldUnionType | undefined;
    readOnly?: boolean | undefined;
    readOnlyRender?: import("../types").FieldUnionType | import("react").ReactNode;
    typeRender?: any;
    type?: string | undefined;
    props?: any;
    hidden?: string | boolean | undefined;
}[];
export declare const updateName: (properties: SchemaData['properties'], pathStr: string, newName?: string) => FormFieldProps[] | {
    [key: string]: FormFieldProps;
} | undefined;
export interface AddItem {
    name: string;
    field: FormFieldProps;
}
export declare const addItemByIndex: (properties: SchemaData['properties'], data: AddItem | AddItem[], index?: number, parentPath?: string) => FormFieldProps[] | {
    [key: string]: FormFieldProps;
} | undefined;
export declare const swapSameLevel: (properties: SchemaData['properties'], from: {
    parentPath?: string;
    index: number;
}, to: {
    parentPath?: string;
    index?: number;
}) => FormFieldProps[] | {
    [key: string]: FormFieldProps;
} | undefined;
export declare const swapDiffLevel: (properties: SchemaData['properties'], from: {
    parentPath?: string;
    index: number;
}, to: {
    parentPath?: string;
    index?: number;
}) => FormFieldProps[] | {
    [key: string]: FormFieldProps;
} | undefined;
export declare const getInitialValues: (properties: SchemaData['properties']) => {};
