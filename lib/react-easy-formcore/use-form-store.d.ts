import { FormRules, FormStore } from './form-store';
export declare function useFormStore<T extends Object = any>(values?: Partial<T>, formRules?: FormRules<T>): FormStore<T>;
