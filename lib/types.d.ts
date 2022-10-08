import { ReactNode } from "react";
import { FormItemProps, FormProps } from "react-easy-formcore";
import { FormRenderStore } from "./formrender-store";
declare type Overwrite<T, U> = Omit<T, keyof U> & U;
interface Extension {
    valueGetter?: string | ((...args: any[]) => any) | any;
    valueSetter?: string | ((value: any) => any) | any;
}
export interface SchemaComponent {
    type?: string;
    props?: any;
    children?: any | Array<SchemaComponent>;
    hidden?: string | boolean;
}
export declare type FieldUnionType = SchemaComponent | Array<SchemaComponent> | React.ComponentType<any> | Function;
export interface BaseFieldProps extends SchemaComponent {
    ignore?: boolean;
    fieldComponent?: FieldUnionType;
    inside?: FieldUnionType;
    outside?: FieldUnionType;
    readOnly?: boolean;
    readOnlyRender?: FieldUnionType | ReactNode;
    typeRender?: any;
}
export interface FormFieldProps extends Overwrite<FormItemProps, Extension>, BaseFieldProps {
    properties?: {
        [name: string]: FormFieldProps;
    } | FormFieldProps[];
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
    inside?: FieldUnionType;
    renderList?: React.ComponentType<GeneratePrams<any>>;
    renderItem?: React.ComponentType<GeneratePrams<any>>;
}
export interface RenderFormProps extends FormProps<FormRenderStore>, BaseRenderProps {
    onSchemaChange?: (newValue: SchemaData, oldValue?: SchemaData) => void;
    schema: SchemaData;
}
export interface RenderFormChildrenProps extends BaseRenderProps {
    onPropertiesChange?: (newValue: SchemaData['properties'], oldValue?: SchemaData['properties']) => void;
    properties?: SchemaData['properties'];
}
export declare type ValueOf<T> = T[keyof T];
export interface GeneratePrams<T = FormFieldProps> {
    name?: string;
    field?: T;
    parent?: string;
    store?: FormRenderStore;
    children?: any;
}
export {};
