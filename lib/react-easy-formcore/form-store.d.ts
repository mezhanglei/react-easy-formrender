export declare type FormListener = {
    name: string;
    onChange: (name: string) => void;
};
export declare type FormValidatorCallBack = (message?: string) => void;
export declare type FormValidator = (value: any, callBack?: FormValidatorCallBack) => boolean | undefined | Promise<boolean>;
export declare type FormRule = {
    required?: boolean;
    message?: string;
    validator?: FormValidator;
};
export declare type FormRules<T = any> = {
    [key in keyof T]?: FormRule[];
};
export declare type FormErrors<T = any> = {
    [key in keyof T]?: T[key];
};
export declare type ValidateResult<T> = {
    error?: string;
    values: T;
};
export declare class FormStore<T extends Object = any> {
    private initialValues;
    private valueListeners;
    private errorListeners;
    private values;
    private formRules;
    private formErrors;
    constructor(values?: Partial<T>, formRules?: FormRules<T>);
    setFieldRules(name: string, rules?: FormRule[]): void;
    setFieldsRules(values: FormRules<T>): void;
    private notifyValue;
    private notifyError;
    getFieldValue(name?: string | string[]): any;
    setFieldValue(name: string | {
        [key: string]: any;
    }, value?: any, forbidError?: boolean): Promise<void>;
    setFieldsValue(values: Partial<T>): Promise<void>;
    reset(): void;
    getFieldError(name?: string): any;
    private setFieldError;
    private setFieldsError;
    validate(): Promise<ValidateResult<T>>;
    validate(name: string, forbidError?: boolean): Promise<string>;
    subscribeValue(name: string, listener: FormListener['onChange']): () => void;
    subscribeError(name: string, listener: FormListener['onChange']): () => void;
}
