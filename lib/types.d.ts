import { FormItemProps, FormProps } from "react-easy-formcore";
import { FormRenderStore } from "./formrender-store";
import { defaultFields } from './register';
export interface FormFieldProps extends FormItemProps {
    readOnly?: boolean;
    readOnlyWidget?: string;
    readOnlyRender?: any;
    widget?: string;
    widgetProps?: {
        children?: JSX.Element | Array<{
            widget: string;
            widgetProps: FormFieldProps['widgetProps'];
        }>;
        [key: string]: any;
    };
    hidden?: string | boolean;
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
export interface RenderFormProps extends FormProps<FormRenderStore> {
    schema: SchemaData;
    onPropertiesChange?: (name: string, properties: SchemaData['properties']) => void;
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
}
export interface RenderFormChildrenProps {
    propertiesName: string;
    properties: SchemaData['properties'];
    onPropertiesChange?: (name: string, properties: SchemaData['properties']) => void;
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
}
export declare type ValueOf<T> = T[keyof T];
