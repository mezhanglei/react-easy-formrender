import { FormStore } from "react-easy-formcore";
import { FormFieldProps, SchemaData } from "./types";
import { AddItem } from "./utils/utils";
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
    updateItemByPath: (path: string, data?: Partial<FormFieldProps>) => void;
    setItemByPath: (path: string, data?: Partial<FormFieldProps>) => void;
    updateNameByPath: (path: string, newName?: string) => void;
    addItemByIndex: (data: AddItem | AddItem[], index?: number, parent?: string) => void;
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
    addAfterByPath: (data: AddItem | AddItem[], path: string) => void;
    addBeforeByPath: (data: AddItem | AddItem[], path: string) => void;
}
