import { FormItemProps, FormProps } from "react-easy-formcore";
import { defaultFields } from './register';
export interface ChildrenComponent {
    component: string;
    props: {
        children?: JSX.Element | ChildrenComponent[];
        [key: string]: any;
    };
}
export interface FormFieldProps extends FormItemProps {
    component: string;
    readOnly?: boolean | string;
    render?: any;
    props?: {
        children?: JSX.Element | ChildrenComponent[];
        [key: string]: any;
    };
    hidden?: string | boolean;
    properties?: {
        [name: string]: FormFieldProps;
    } | FormFieldProps[];
}
export interface RenderFormState {
    fieldPropsMap: Map<string, any>;
    prevSchema?: SchemaData;
    schema?: SchemaData;
}
export interface SchemaData extends FormProps {
    properties: {
        [key: string]: FormFieldProps;
    };
}
export declare type WatchHandler = (newValue: any, oldValue: string) => void;
export interface RenderFormProps extends FormProps {
    schema: SchemaData;
    watch?: {
        [key: string]: {
            immediate?: boolean;
            handler: WatchHandler;
        } | WatchHandler;
    };
    widgets: {
        [key: string]: any;
    };
    Fields: typeof defaultFields;
    children?: (properties: SchemaData['properties'], renderItem: (params: {
        name: string;
        field: FormFieldProps;
        path?: string;
    }) => any) => any;
}
