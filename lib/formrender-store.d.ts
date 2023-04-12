import { FieldUnionType, GeneratePrams, PropertiesData } from "./types";
import { InsertDataType } from "./utils/utils";
export declare type FormRenderListener = (newValue?: any, oldValue?: any) => void;
export declare class FormRenderStore {
    private controls;
    private components;
    private properties;
    private lastProperties;
    private propertiesListeners;
    constructor();
    registry(key: 'components' | 'controls', data: any): void;
    controlParse(target?: FieldUnionType): any;
    componentParse(target?: FieldUnionType): any;
    controlInstance(target?: FieldUnionType, commonProps?: GeneratePrams, finalChildren?: any): any;
    componentInstance(target?: FieldUnionType, commonProps?: GeneratePrams, finalChildren?: any): any;
    getProperties(): PropertiesData;
    setProperties(data?: PropertiesData): void;
    updateItemByPath: (data?: any, path?: string, attributeName?: string) => void;
    setItemByPath: (data?: any, path?: string, attributeName?: string) => void;
    updateNameByPath: (path?: string, newName?: string) => void;
    addItemByIndex: (data: InsertDataType, index?: number, parent?: string) => void;
    delItemByPath: (path?: string, attributeName?: string) => void;
    getItemByPath: (path?: string, attributeName?: string) => any;
    moveItemByPath: (from: {
        parent?: string;
        index: number;
    }, to: {
        parent?: string;
        index?: number;
    }) => void;
    subscribeProperties(listener: FormRenderListener): () => void;
    private notifyProperties;
    addAfterByPath: (data: InsertDataType, path?: string) => void;
    addBeforeByPath: (data: InsertDataType, path?: string) => void;
}
