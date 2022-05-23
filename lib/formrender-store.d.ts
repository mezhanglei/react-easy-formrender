import { FormStore } from "react-easy-formcore";
import { FormFieldProps, SchemaData } from "./types";
export declare type FormRenderListener = (newValue?: any, oldValue?: any) => void;
export declare type Properties = SchemaData['properties'];
export declare class FormRenderStore<T extends Object = any> extends FormStore {
    private properties;
    private lastProperties;
    private propertiesListeners;
    constructor(values?: Partial<T>);
    getProperties(): FormFieldProps[] | {
        [key: string]: FormFieldProps;
    } | undefined;
    setProperties(data?: SchemaData['properties']): void;
    updateItemByPath: (path: string, data?: Partial<FormFieldProps> | undefined) => void;
    setItemByPath: (path: string, data?: Partial<FormFieldProps> | undefined) => void;
    addItemByIndex: (data: {
        name: string;
        field: FormFieldProps;
    }, index?: number | undefined, parentPath?: string | undefined) => void;
    delItemByPath: (path: string) => void;
    getItemByPath: (path: string) => any;
    swapItemByPath: (from: {
        parentPath?: string;
        index: number;
    }, to: {
        parentPath?: string;
        index: number;
    }) => void;
    subscribeProperties(listener: FormRenderListener): () => void;
    private notifyProperties;
}
