import { FormItemProps, FormProps } from "./react-easy-formcore";
import { defaultFields } from './register';
export interface ChildrenComponent {
    component: string;
    props: {
        children?: JSX.Element | ChildrenComponent[];
        [key: string]: any;
    };
}
export interface FormFieldProps extends FormItemProps {
    component?: string;
    render?: any;
    hidden?: string | boolean;
    path?: string;
    props?: ChildrenComponent['props'];
    properties?: {
        [key: string]: FormFieldProps;
    } | FormFieldProps[];
}
export interface RenderFormState {
    hiddenMap: {
        [key: string]: boolean;
    };
    prevSchema?: SchemaData;
}
export interface SchemaData extends FormProps {
    properties: {
        [key: string]: FormFieldProps;
    };
}
export interface RenderFormProps extends FormProps {
    schema: SchemaData;
    widgets: {
        [key: string]: any;
    };
    Fields: typeof defaultFields;
}
