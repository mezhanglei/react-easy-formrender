import { FormStore } from "react-easy-formcore";
import { FormFieldProps, SchemaData } from "./types";
export declare type FormRenderListener = {
    name: string;
    onChange: (newValue?: any, oldValue?: any) => void;
};
export declare type PropertiesMap = {
    [key: string]: SchemaData['properties'];
};
export declare class FormRenderStore<T extends Object = any> extends FormStore {
    private propertiesMap;
    private lastPropertiesMap;
    private propertiesListeners;
    constructor(values?: Partial<T>);
    getProperties(name?: string): any;
    setProperties(name: string, data: SchemaData['properties']): void;
    updatePropertiesByPath: (path: string, data?: Partial<FormFieldProps> | undefined, propertiesName?: string) => void;
    setPropertiesByPath: (path: string, data?: Partial<FormFieldProps> | undefined, propertiesName?: string) => void;
    subscribeProperties(name: string, listener: FormRenderListener['onChange']): () => void;
    private notifyProperties;
}
