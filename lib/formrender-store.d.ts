import { CustomUnionType, GeneratePrams, PropertiesData } from "./types";
import { InsertItemType } from "./utils/utils";
export declare type FormRenderListener = (newValue?: any, oldValue?: any) => void;
export declare class FormRenderStore {
    private components;
    private properties;
    private lastProperties;
    private propertiesListeners;
    constructor();
    registry(key: 'components', data: any): void;
    componentParse(target?: CustomUnionType): any;
    componentInstance(target?: CustomUnionType, commonProps?: GeneratePrams): any;
    getProperties(): PropertiesData;
    setProperties(data?: PropertiesData): void;
    updateItemByPath: (data?: any, path?: string, attributeName?: string) => void;
    setItemByPath: (data?: any, path?: string, attributeName?: string) => void;
    setItemByIndex: (data?: any, index?: number, parent?: {
        path?: string;
        attributeName?: string;
    }) => void;
    updateNameByPath: (endName?: string, path?: string) => void;
    insertItemByIndex: (data: InsertItemType, index?: number, parent?: {
        path?: string;
        attributeName?: string;
    }) => void;
    delItemByPath: (path?: string, attributeName?: string) => void;
    getItemByPath: (path?: string, attributeName?: string) => any;
    getItemByIndex: (index: number, parent: {
        path?: string;
        attributeName?: string;
    }) => any;
    moveItemByPath: (from: {
        parent?: string;
        index: number;
    }, to: {
        parent?: string;
        index?: number;
    }) => void;
    subscribeProperties(listener: FormRenderListener): () => void;
    unsubscribeProperties(): void;
    private notifyProperties;
}
