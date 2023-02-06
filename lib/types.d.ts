import { ReactNode } from "react";
import { FormItemProps, FormProps, FormRule, FormStore } from "react-easy-formcore";
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
export interface GenerateFieldProps extends FormComponent, FormItemProps {
    ignore?: boolean;
    fieldComponent?: FieldUnionType;
    inside?: FieldUnionType;
    outside?: FieldUnionType;
    readOnly?: boolean;
    readOnlyRender?: FieldUnionType | ReactNode;
    typeRender?: any;
    properties?: PropertiesData;
}
export declare type PropertiesData = {
    [name: string]: FormFieldProps;
} | FormFieldProps[];
export declare type FormFieldProps = GenerateFieldProps & {
    [key in keyof Omit<GenerateFieldProps, 'properties'>]: key extends 'rules' ? (string | Array<{
        [key in keyof FormRule]: FormRule[key] | string;
    }> | GenerateFieldProps[key]) : (string | GenerateFieldProps[key]);
};
export declare type WatchHandler = (newValue: any, oldValue: any) => void;
export interface BaseRenderProps {
    uneval?: boolean;
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
export interface GeneratePrams<T = GenerateFieldProps> {
    name?: string | number;
    field?: T;
    parent?: string;
    formparent?: string;
    store?: FormRenderStore;
    form: FormStore;
    children?: any;
}
export {};
