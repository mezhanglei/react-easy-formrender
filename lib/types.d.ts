/// <reference types="react" />
import { FormItemProps, FormProps } from "react-easy-formcore";
import { FormRenderStore } from "./formrender-store";
import { defaultFields } from './components';
export interface FormFieldProps extends FormItemProps {
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
    properties?: {
        [key: string]: FormFieldProps;
    } | FormFieldProps[];
}
export declare type WatchHandler = (newValue: any, oldValue: string) => void;
export interface BaseRenderProps {
    watch?: {
        [key: string]: {
            immediate?: boolean;
            handler: WatchHandler;
        } | WatchHandler;
    };
    widgets?: any;
    slotWidgets?: any;
    Fields?: typeof defaultFields;
    customList?: React.ComponentType<CustomListProps & {
        children: any;
    }>;
    customInner?: React.ComponentType<GenerateParams & {
        children: any;
    }>;
}
export interface RenderFormProps extends FormProps<FormRenderStore>, BaseRenderProps {
    onSchemaChange?: (newValue: SchemaData) => void;
    schema: SchemaData;
}
export interface RenderFormChildrenProps extends BaseRenderProps {
    onPropertiesChange?: (newValue: SchemaData['properties'], oldValue?: SchemaData['properties']) => void;
    properties: SchemaData['properties'];
}
export declare type ValueOf<T> = T[keyof T];
export interface SlotParams {
    type: string;
    props?: any;
    hidden?: boolean;
    addItem?: FormFieldProps;
}
export interface WidgetParams {
    widget: string;
    widgetProps: FormFieldProps['widgetProps'];
}
export interface CustomListProps {
    properties: SchemaData['properties'];
    parent?: GenerateParams;
}
export interface GenerateParams {
    name: string;
    field: FormFieldProps;
    path?: string;
}
export declare type getChildrenList = (properties: SchemaData['properties'], generate: generateChildFunc, parent?: GenerateParams) => any;
export declare type generateChildFunc = (params: GenerateParams, properties?: SchemaData['properties']) => JSX.Element | undefined;
