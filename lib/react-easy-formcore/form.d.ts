import './style.less';
import React, { CSSProperties } from 'react';
import { FormStore } from './form-store';
import { FormOptions } from './form-options-context';
export declare const formListPath: string[];
export interface FormProps extends FormOptions {
    className?: string;
    store?: FormStore;
    style?: CSSProperties;
    children?: React.ReactNode;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
    onReset?: (e: React.FormEvent<HTMLFormElement>) => void;
    onMount?: () => void;
}
export declare function Form(props: FormProps): JSX.Element;
export declare namespace Form {
    var Item: React.ForwardRefExoticComponent<import("./form-item").FormItemProps & React.RefAttributes<unknown>>;
    var List: React.ForwardRefExoticComponent<import("./form-list").FormListProps & React.RefAttributes<unknown>>;
}
