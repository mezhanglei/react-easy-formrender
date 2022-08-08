/// <reference types="react" />
import { FormItemProps, FormProps } from "react-easy-formcore";
import { defaultFields } from "./fields";
import { FormRenderStore } from "./formrender-store";
declare type Overwrite<T, U> = Omit<T, keyof U> & U;
interface Extension {
    valueGetter?: string | ((...args: any[]) => any);
    valueSetter?: string | ((value: any) => any);
}
export interface SchemaComponent {
    type?: string;
    props?: {
        [key: string]: any;
        children?: any | Array<SchemaComponent>;
    };
    hidden?: string | boolean;
}
export interface BaseFieldProps extends SchemaComponent {
    category?: string;
    inside?: SchemaComponent;
    outside?: SchemaComponent;
    readOnly?: boolean;
    readOnlyItem?: string;
    readOnlyRender?: any;
    typeRender?: any;
}
export interface FormFieldProps extends Overwrite<FormItemProps, Extension>, BaseFieldProps {
    properties?: {
        [name: string]: FormFieldProps;
    } | FormFieldProps[];
}
export interface OverwriteFormFieldProps extends FormItemProps, BaseFieldProps {
    properties?: {
        [name: string]: OverwriteFormFieldProps;
    } | OverwriteFormFieldProps[];
}
export interface SchemaData extends FormProps<FormRenderStore> {
    properties?: {
        [key: string]: FormFieldProps;
    } | FormFieldProps[];
}
export declare type WatchHandler = (newValue: any, oldValue: any) => void;
export interface BaseRenderProps {
    watch?: {
        [key: string]: {
            immediate?: boolean;
            handler: WatchHandler;
        } | WatchHandler;
    };
    controls?: any;
    components?: any;
    inside?: SchemaComponent;
    Fields?: typeof defaultFields;
    renderList?: React.ComponentType<GeneratePrams & {
        children: any;
    }>;
    renderItem?: React.ComponentType<GeneratePrams & {
        children: any;
    }>;
}
export interface RenderFormProps extends FormProps<FormRenderStore>, BaseRenderProps {
    onSchemaChange?: (newValue: SchemaData) => void;
    schema: SchemaData;
}
export interface RenderFormChildrenProps extends BaseRenderProps {
    onPropertiesChange?: (newValue: SchemaData['properties'], oldValue?: SchemaData['properties']) => void;
    properties?: SchemaData['properties'];
}
export declare type ValueOf<T> = T[keyof T];
export interface FormItemInfo {
    name?: string;
    field: OverwriteFormFieldProps;
    path?: string;
}
export interface GeneratePrams extends FormItemInfo {
    store?: FormRenderStore;
}
export declare type getChildrenList = (generate: generateChildFunc, parent?: FormItemInfo) => any;
export declare type generateChildFunc = (params: FormItemInfo) => JSX.Element | undefined;
export {};
