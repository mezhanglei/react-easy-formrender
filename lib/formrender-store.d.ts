import { FormStore } from "react-easy-formcore";
import { FormFieldProps, PropertiesData } from "./types";
export declare type FormRenderListener = (newValue?: any, oldValue?: any) => void;
export declare class FormRenderStore<T extends Object = any> extends FormStore {
    private properties;
    private lastProperties;
    private propertiesListeners;
    constructor(values?: Partial<T>);
    getProperties(): PropertiesData;
    setProperties(data?: PropertiesData): void;
    updateProperties(data?: PropertiesData): void;
    updateItemByPath: (path: string, data?: Partial<FormFieldProps>) => void;
    setItemByPath: (path: string, data?: Partial<FormFieldProps>) => void;
    updateNameByPath: (path: string, newName?: string) => void;
    addItemByIndex: (data: FormFieldProps | FormFieldProps[], index?: number, parent?: string) => void;
    delItemByPath: (path: string) => void;
    getItemByPath: (path: string) => any;
    moveItemByPath: (from: {
        parent?: string;
        index: number;
    }, to: {
        parent?: string;
        index?: number;
    }) => void;
    subscribeProperties(listener: FormRenderListener): () => void;
    private notifyProperties;
    addAfterByPath: (data: FormFieldProps | FormFieldProps[], path: string) => void;
    addBeforeByPath: (data: FormFieldProps | FormFieldProps[], path: string) => void;
}
