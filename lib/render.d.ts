import React from 'react';
import { ChildrenComponent, FormFieldProps, RenderFormProps, RenderFormState, SchemaData } from './types';
import { AopFactory } from './utils/function-aop';
import 'react-easy-formcore/lib/css/main.css';
declare class RenderFrom extends React.Component<RenderFormProps, RenderFormState> {
    aopFormOnChange: AopFactory;
    aopFormMount: AopFactory;
    constructor(props: RenderFormProps);
    static defaultProps: {
        widgets: {};
        Fields: {
            [key: string]: any;
        };
    };
    onFormMount(): void;
    componentDidUpdate(prevProps: RenderFormProps, prevState: RenderFormState): void;
    static getDerivedStateFromProps(nextProps: RenderFormProps, prevState: RenderFormState): {
        prevSchema: SchemaData;
        hiddenMap: {
            [key: string]: boolean;
        };
    } | null;
    handleFieldProps(): void;
    onFormChange(params: {
        name: string;
        value: any;
    }): void;
    getValueByForm(target?: string | boolean): any;
    generateChildren(children?: ChildrenComponent['props']['children']): JSX.Element | JSX.Element[] | undefined;
    renderFormItem(name: string, field: FormFieldProps): JSX.Element;
    renderListItem(name: string, field: FormFieldProps): JSX.Element;
    renderProperties(params: {
        name: string;
        field: FormFieldProps;
        path?: string;
    }): JSX.Element;
    generateTree(params: {
        name: string;
        field: FormFieldProps;
        path?: string;
    }): false | JSX.Element | undefined;
    getFormList(properties: SchemaData['properties']): (false | JSX.Element | undefined)[];
    render(): JSX.Element;
}
export default RenderFrom;
