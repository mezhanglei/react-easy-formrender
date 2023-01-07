import { ReactNode } from "react";
import { FormItemProps, FormProps, FormStore } from "react-easy-formcore";
import { FormRenderStore } from "./formrender-store";
declare type Overwrite<T, U> = Omit<T, keyof U> & U;
export interface FormComponent {
    type?: string;
    props?: any;
    children?: any | Array<FormComponent>;
    hidden?: string | boolean;
}
export declare type UnionComponent<P> = React.ComponentType<P> | React.ForwardRefExoticComponent<P> | React.FC<P> | keyof React.ReactHTML;
export declare type FieldUnionType = FormComponent | Array<FormComponent> | UnionComponent<any> | Function;
export interface BaseFieldProps extends FormComponent {
    ignore?: boolean;
    fieldComponent?: FieldUnionType;
    inside?: FieldUnionType;
    outside?: FieldUnionType;
    readOnly?: boolean;
    readOnlyRender?: FieldUnionType | ReactNode;
    typeRender?: any;
}
export declare type PropertiesData = {
    [name: string]: FormFieldProps;
} | FormFieldProps[];
export interface FormFieldProps extends Overwrite<FormItemProps, {
    valueGetter?: string | ((...args: any[]) => any) | any;
    valueSetter?: string | ((value: any) => any) | any;
}>, BaseFieldProps {
    properties?: PropertiesData;
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
    renderList?: (params: GeneratePrams<any>) => any;
    renderItem?: (params: GeneratePrams<any>) => any;
}
export interface RenderFormProps extends Overwrite<FormProps, {
    store?: FormRenderStore;
}>, BaseRenderProps {
    onPropertiesChange?: (newValue: PropertiesData, oldValue?: PropertiesData) => void;
    properties?: PropertiesData;
    form?: FormStore;
}
export interface RenderFormChildrenProps extends BaseRenderProps {
    onPropertiesChange?: (newValue: PropertiesData, oldValue?: PropertiesData) => void;
    properties?: PropertiesData;
    store?: FormRenderStore;
}
export declare type ValueOf<T> = T[keyof T];
export interface GeneratePrams<T = FormFieldProps> {
    name?: string | number;
    field?: T;
    parent?: string;
    store?: FormRenderStore;
    form: FormStore;
    children?: any;
}
export {};
