import { ReactNode } from "react";
import { FormItemProps, FormProps, FormRule, FormStore } from "react-easy-formcore";
import { FormRenderStore } from "./formrender-store";
export interface FormComponent {
    type?: string;
    props?: any & {
        children?: any | Array<FormComponent>;
    };
}
export declare type UnionComponent<P> = React.ComponentType<P> | React.ForwardRefExoticComponent<P> | React.FC<P> | keyof React.ReactHTML;
export declare type CustomUnionType = FormComponent | Array<FormComponent> | UnionComponent<any> | Function | ReactNode;
export declare type GenerateFormNodeProps<T = {}> = FormComponent & FormItemProps & T & {
    ignore?: boolean;
    inside?: CustomUnionType;
    outside?: CustomUnionType;
    readOnly?: boolean;
    readOnlyRender?: CustomUnionType;
    typeRender?: CustomUnionType;
    properties?: PropertiesData;
    hidden?: boolean;
};
export declare type PropertiesData = {
    [name: string]: FormNodeProps;
} | FormNodeProps[];
export declare type CustomRenderType = (params: GeneratePrams<any> & {
    children?: any;
}) => any;
export declare type FormNodeProps = {
    [key in keyof GenerateFormNodeProps]: key extends 'rules' ? (string | Array<{
        [key in keyof FormRule]: FormRule[key] | string;
    }> | GenerateFormNodeProps[key]) : (key extends 'properties' ? GenerateFormNodeProps[key] : (string | GenerateFormNodeProps[key]));
};
export declare type WatchHandler = (newValue: any, oldValue: any) => void;
export interface RenderFormChildrenProps<T = {}> {
    expressionImports?: object;
    uneval?: boolean;
    watch?: {
        [key: string]: {
            immediate?: boolean;
            handler: WatchHandler;
        } | WatchHandler;
    };
    components?: any;
    inside?: CustomUnionType;
    properties?: PropertiesData;
    renderList?: CustomRenderType;
    renderItem?: CustomRenderType;
    onPropertiesChange?: (newValue: PropertiesData, oldValue?: PropertiesData) => void;
    formrender?: FormRenderStore;
    options?: GenerateFormNodeProps<T> | ((params: GenerateFormNodeProps<T>) => GenerateFormNodeProps<T>);
    evalPropNames?: Array<string>;
}
export interface RenderFormProps<T = {}> extends Omit<FormProps, 'form'>, RenderFormChildrenProps<T> {
    form?: FormStore;
}
export interface GeneratePrams<T = {}> {
    name?: string;
    path?: string;
    field?: GenerateFormNodeProps<T>;
    parent?: {
        name?: string;
        path?: string;
        field?: GenerateFormNodeProps<T>;
    };
    formrender?: FormRenderStore;
    form?: FormStore;
}
