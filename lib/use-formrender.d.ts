/// <reference types="react" />
import { FormRenderStore } from './formrender-store';
import { FormFieldProps, PropertiesData } from './types';
export declare function useFormRenderStore(): FormRenderStore;
export declare function useProperties(store: FormRenderStore): (PropertiesData | import("react").Dispatch<import("react").SetStateAction<PropertiesData | undefined>> | undefined)[];
export declare function useExpandComponents(store: FormRenderStore): ({
    [key: string]: FormFieldProps;
} | import("react").Dispatch<import("react").SetStateAction<{
    [key: string]: FormFieldProps;
} | undefined>> | undefined)[];
