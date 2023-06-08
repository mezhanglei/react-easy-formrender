/// <reference types="react" />
export declare const defaultComponents: {
    row: import("react").ForwardRefExoticComponent<import("./grid").GridRowProps & import("react").RefAttributes<any>>;
    col: import("react").ForwardRefExoticComponent<import("./grid").GridColProps & import("react").RefAttributes<any>>;
    add: import("react").FC<import("./btn").AddBtnProps>;
    delete: import("react").FC<import("./btn").DeleteBtnProps>;
    'Form.Item': import("react").ForwardRefExoticComponent<import("react-easy-formcore/lib/components/item").ItemProps & import("react-easy-formcore").ItemCoreProps & {
        className?: string | undefined;
        children?: import("react").ReactNode;
        style?: import("react").CSSProperties | undefined;
        component?: any;
    } & import("react").RefAttributes<any>>;
    'Form.List': import("react").ForwardRefExoticComponent<import("react-easy-formcore/lib/components/item").ItemProps & import("react-easy-formcore").ListCoreProps & {
        className?: string | undefined;
        children?: import("react").ReactNode;
        style?: import("react").CSSProperties | undefined;
        component?: any;
        ignore?: boolean | undefined;
    } & import("react").RefAttributes<any>>;
};
