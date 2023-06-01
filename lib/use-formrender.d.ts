/// <reference types="react" />
import { FormRenderStore } from './formrender-store';
import { FormNodeProps, PropertiesData } from './types';
export declare function useFormRenderStore(): FormRenderStore;
export declare function useProperties(formrender: FormRenderStore): (PropertiesData | import("react").Dispatch<import("react").SetStateAction<PropertiesData | undefined>> | undefined)[];
export declare function useExpandComponents(formrender: FormRenderStore): ({
    [key: string]: FormNodeProps;
} | import("react").Dispatch<import("react").SetStateAction<{
    [key: string]: FormNodeProps;
} | undefined>> | undefined)[];
