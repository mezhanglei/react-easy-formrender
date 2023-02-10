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
export declare type FormFieldProps = {
    [key in keyof GenerateFieldProps]: key extends 'rules' ? (string | Array<{
        [key in keyof FormRule]: FormRule[key] | string;
    }> | GenerateFieldProps[key]) : (key extends 'properties' ? GenerateFieldProps[key] : (string | GenerateFieldProps[key]));
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
    controls?: any;
    components?: any;
    inside?: FieldUnionType;
    properties?: PropertiesData;
    renderList?: (params: GeneratePrams<any>) => any;
    renderItem?: (params: GeneratePrams<any>) => any;
    onPropertiesChange?: (newValue: PropertiesData, oldValue?: PropertiesData) => void;
    store?: FormRenderStore;
}
export interface RenderFormProps extends Omit<FormProps, 'store'>, RenderFormChildrenProps {
    form?: FormStore;
}
export interface GeneratePrams<T = GenerateFieldProps> {
    name?: string | number;
    field?: T;
    parent?: string;
    formparent?: string;
    store?: FormRenderStore;
    form: FormStore;
    children?: any;
}
