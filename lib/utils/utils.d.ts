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
    className?: string | undefined;
    children?: import("react").ReactNode;
    col?: import("react-easy-formcore").FromColProps | undefined;
    footer?: any;
    label?: string | undefined;
    style?: import("react").CSSProperties | undefined;
    path?: string | undefined;
    name: string;
    suffix?: any;
    valueProp?: string | ((type: any) => string) | undefined;
    rules?: import("react-easy-formcore").FormRule[] | undefined;
    index?: number | undefined;
    initialValue?: any;
    errorClassName?: string | undefined;
    customInner?: any;
    colon?: boolean | undefined;
    layout?: string | undefined;
    labelWidth?: number | undefined;
    labelAlign?: import("csstype").Property.TextAlign | undefined;
    inline?: boolean | undefined;
    labelStyle?: import("react").CSSProperties | undefined;
    compact?: boolean | undefined;
    required?: boolean | undefined;
    gutter?: number | undefined;
    onFieldsChange?: ((obj: {
        path: string;
        name?: string | undefined;
        value: any;
    }) => void) | undefined;
    onValuesChange?: ((obj: {
        path?: string | undefined;
        name?: string | undefined;
        value: any;
    }) => void) | undefined;
    valueGetter?: string | ((...args: any[]) => any) | undefined;
    valueSetter?: string | ((value: any) => any) | undefined;
    readOnly?: boolean | undefined;
    readOnlyWidget?: string | undefined;
    readOnlyRender?: any;
    hidden?: string | boolean | undefined;
    widget?: string | undefined;
    widgetProps?: import("../types").WidgetProps | undefined;
};
export declare const toList: (properties: SchemaData['properties']) => {
    properties?: {
        [name: string]: FormFieldProps;
    } | FormFieldProps[] | undefined;
    className?: string | undefined;
    children?: import("react").ReactNode;
    col?: import("react-easy-formcore").FromColProps | undefined;
    footer?: any;
    label?: string | undefined;
    style?: import("react").CSSProperties | undefined;
    path?: string | undefined;
    name: string;
    suffix?: any;
    valueProp?: string | ((type: any) => string) | undefined;
    rules?: import("react-easy-formcore").FormRule[] | undefined;
    index?: number | undefined;
    initialValue?: any;
    errorClassName?: string | undefined;
    customInner?: any;
    colon?: boolean | undefined;
    layout?: string | undefined;
    labelWidth?: number | undefined;
    labelAlign?: import("csstype").Property.TextAlign | undefined;
    inline?: boolean | undefined;
    labelStyle?: import("react").CSSProperties | undefined;
    compact?: boolean | undefined;
    required?: boolean | undefined;
    gutter?: number | undefined;
    onFieldsChange?: ((obj: {
        path: string;
        name?: string | undefined;
        value: any;
    }) => void) | undefined;
    onValuesChange?: ((obj: {
        path?: string | undefined;
        name?: string | undefined;
        value: any;
    }) => void) | undefined;
    valueGetter?: string | ((...args: any[]) => any) | undefined;
    valueSetter?: string | ((value: any) => any) | undefined;
    readOnly?: boolean | undefined;
    readOnlyWidget?: string | undefined;
    readOnlyRender?: any;
    hidden?: string | boolean | undefined;
    widget?: string | undefined;
    widgetProps?: import("../types").WidgetProps | undefined;
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
