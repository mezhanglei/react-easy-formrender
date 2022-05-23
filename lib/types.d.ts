import { FormItemProps, FormProps } from "react-easy-formcore";
import { FormRenderStore } from "./formrender-store";
import { defaultFields } from './default-field';
export interface FormFieldProps extends FormItemProps {
    dependencies?: string[];
    readOnly?: boolean;
    readOnlyWidget?: string;
    readOnlyRender?: any;
    hidden?: string | boolean;
    widget?: string;
    widgetProps?: {
        children?: any | Array<{
            widget: string;
            widgetProps: FormFieldProps['widgetProps'];
        }>;
        [key: string]: any;
    };
    properties?: {
        [name: string]: FormFieldProps;
    } | FormFieldProps[];
}
export interface SchemaData extends FormProps<FormRenderStore> {
    properties: {
        [key: string]: FormFieldProps;
    } | FormFieldProps[];
}
export declare type WatchHandler = (newValue: any, oldValue: string) => void;
export interface BaseRenderProps {
    onPropertiesChange?: (properties: SchemaData['properties'], oldProperties?: SchemaData['properties']) => void;
    watch?: {
        [key: string]: {
            immediate?: boolean;
            handler: WatchHandler;
        } | WatchHandler;
    };
    widgets: {
        [key: string]: any;
    };
    Fields?: typeof defaultFields;
    customRender?: getChildrenList;
}
export interface RenderFormProps extends FormProps<FormRenderStore>, BaseRenderProps {
    schema: SchemaData;
}
export interface RenderFormChildrenProps extends BaseRenderProps {
    properties: SchemaData['properties'];
}
export declare type ValueOf<T> = T[keyof T];
export declare type getChildrenList = (properties: SchemaData['properties'], generate: generateChildFunc, parent?: {
    name: string;
    field: FormFieldProps;
    path?: string;
}, index?: number) => any;
export declare type generateChildFunc = (params: {
    name: string;
    field: FormFieldProps;
    path?: string;
}, index?: number) => JSX.Element | undefined;
