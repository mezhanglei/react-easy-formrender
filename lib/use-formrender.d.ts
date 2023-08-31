/// <reference types="react" />
import { FormRenderStore } from './formrender-store';
import { PropertiesData } from './types';
export declare function useFormRenderStore(): FormRenderStore;
export declare function useProperties(formrender: FormRenderStore): (PropertiesData | import("react").Dispatch<import("react").SetStateAction<PropertiesData | undefined>> | undefined)[];
