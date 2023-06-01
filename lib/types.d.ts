import { ReactNode } from "react";
import { FormItemProps, FormProps, FormRule, FormStore } from "react-easy-formcore";
import { FormRenderStore } from "./formrender-store";
export interface FormComponent {
    type?: string;
    props?: any;
    children?: any | Array<FormComponent>;
    hidden?: string | boolean;
}
export declare type UnionComponent<P> = React.ComponentType<P> | React.ForwardRefExoticComponent<P> | React.FC<P> | keyof React.ReactHTML;
export declare type CustomUnionType = FormComponent | Array<FormComponent> | UnionComponent<any> | Function | ReactNode;
export interface GenerateFormNodeProps extends FormComponent, FormItemProps {
    ignore?: boolean;
    inside?: CustomUnionType;
    outside?: CustomUnionType;
    readOnly?: boolean;
    readOnlyRender?: CustomUnionType;
    typeRender?: CustomUnionType;
    properties?: PropertiesData;
}
export declare type PropertiesData = {
    [name: string]: FormNodeProps;
} | FormNodeProps[];
export declare type FormNodeProps = {
    [key in keyof GenerateFormNodeProps]: key extends 'rules' ? (string | Array<{
        [key in keyof FormRule]: FormRule[key] | string;
    }> | GenerateFormNodeProps[key]) : (key extends 'properties' ? GenerateFormNodeProps[key] : (string | GenerateFormNodeProps[key]));
};
export declare type WatchHandler = (newValue: any, oldValue: any) => void;
export interface RenderFormChildrenProps {
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
    renderList?: (params: GeneratePrams<any>) => any;
    renderItem?: (params: GeneratePrams<any>) => any;
    onPropertiesChange?: (newValue: PropertiesData, oldValue?: PropertiesData) => void;
    formrender?: FormRenderStore;
}
export interface RenderFormProps extends Omit<FormProps, 'form'>, RenderFormChildrenProps {
    form?: FormStore;
}
export interface GeneratePrams<T = {}> {
    name?: string;
    path?: string;
    field?: T & GenerateFormNodeProps;
    parent?: {
        name?: string;
        path?: string;
        field?: T & GenerateFormNodeProps;
    };
    formrender?: FormRenderStore;
    form?: FormStore;
    children?: any;
}
