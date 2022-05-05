import { FormFieldProps, SchemaData } from "../types";
export declare const pathToArray: (pathStr?: string | undefined) => string[];
export declare const updatePropertiesByPath: (properties: SchemaData['properties'], pathStr: string, data?: Partial<FormFieldProps> | undefined) => FormFieldProps[] | {
    [key: string]: FormFieldProps;
};
export declare const setPropertiesByPath: (properties: SchemaData['properties'], pathStr: string, data?: Partial<FormFieldProps> | undefined) => FormFieldProps[] | {
    [key: string]: FormFieldProps;
};
