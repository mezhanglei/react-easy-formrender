/// <reference types="react" />
import { FormRenderStore } from './formrender-store';
import { FormNodeProps, PropertiesData } from './types';
export declare function useFormRenderStore(): FormRenderStore;
export declare function useProperties(formrender: FormRenderStore, immediate?: boolean): (PropertiesData | import("react").Dispatch<import("react").SetStateAction<PropertiesData | undefined>> | undefined)[];
export declare function useExpandComponents(formrender: FormRenderStore, immediate?: boolean): ({
    [key: string]: FormNodeProps;
} | import("react").Dispatch<import("react").SetStateAction<{
    [key: string]: FormNodeProps;
} | undefined>> | undefined)[];
