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
    getProperties(propertiesName?: string): any;
    setProperties(propertiesName: string, data: SchemaData['properties']): void;
    updateItemByPath: (path: string, data?: Partial<FormFieldProps> | undefined, propertiesName?: string) => void;
    setItemByPath: (path: string, data?: Partial<FormFieldProps> | undefined, propertiesName?: string) => void;
    delItemByPath: (path: string, propertiesName?: string) => void;
    getItemByPath: (path: string, propertiesName?: string) => any;
    subscribeProperties(name: string, listener: FormRenderListener['onChange']): () => void;
    private notifyProperties;
}
