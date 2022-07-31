/// <reference types="react" />
import { FormItemProps, FormProps } from "react-easy-formcore";
import { FormRenderStore } from "./formrender-store";
import { defaultFields } from './components';
declare type Overwrite<T, U> = Omit<T, keyof U> & U;
interface Extension {
    valueGetter?: string | ((...args: any[]) => any);
    valueSetter?: string | ((value: any) => any);
}
export interface WidgetProps {
    children?: any | Array<{
        widget: string;
        widgetProps: WidgetProps;
    }>;
    [key: string]: any;
}
export interface BaseFieldProps {
    readOnly?: boolean;
    readOnlyWidget?: string;
    readOnlyRender?: any;
    hidden?: string | boolean;
    widget?: string;
    widgetProps?: WidgetProps;
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
export interface OverwriteFormFieldProps extends FormItemProps, BaseFieldProps {
    properties?: {
        [name: string]: OverwriteFormFieldProps;
    } | OverwriteFormFieldProps[];
}
export declare type WatchHandler = (newValue: any, oldValue: any) => void;
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
    widgetProps: WidgetProps;
}
export interface CustomListProps {
    properties: SchemaData['properties'];
    parent?: GenerateParams;
}
export interface GenerateParams {
    name: string;
    field: OverwriteFormFieldProps;
    path?: string;
}
export declare type getChildrenList = (properties: SchemaData['properties'], generate: generateChildFunc, parent?: GenerateParams) => any;
export declare type generateChildFunc = (params: GenerateParams, properties?: SchemaData['properties']) => JSX.Element | undefined;
export {};
