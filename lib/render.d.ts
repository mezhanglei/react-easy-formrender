import React from 'react';
import { ChildrenComponent, FormFieldProps, RenderFormProps, RenderFormState, SchemaData } from './types';
import { AopFactory } from './utils/function-aop';
import 'react-easy-formcore/lib/css/main.css';
export default class RenderForm extends React.Component<RenderFormProps, RenderFormState> {
    aopOnValuesChange: AopFactory;
    constructor(props: RenderFormProps);
    static defaultProps: {
        widgets: {};
        Fields: {
            [key: string]: any;
        };
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    onValuesChange(): void;
    componentDidUpdate(prevProps: RenderFormProps, prevState: RenderFormState): void;
    static getDerivedStateFromProps(nextProps: RenderFormProps, prevState: RenderFormState): {
        prevSchema: SchemaData;
        fieldPropsMap: Map<string, any>;
        schema?: SchemaData | undefined;
    } | null;
    initWatch(): void;
    handleFieldProps(): void;
    showCalcFieldProps(field?: object, path?: string): {
        [k: string]: any;
    } | undefined;
    calcExpression(target?: string | boolean): any;
    generateChildren(children?: ChildrenComponent['props']['children']): JSX.Element | JSX.Element[] | undefined;
    renderFormItem(params: {
        name: string;
        itemField: FormFieldProps;
        path?: string;
    }): JSX.Element;
    renderListItem(params: {
        name: string;
        itemField: FormFieldProps;
        path?: string;
    }): JSX.Element;
    renderProperties(params: {
        name: string;
        propertiesField: FormFieldProps;
        path?: string;
    }): JSX.Element;
    generateTree(params: {
        name: string;
        field: FormFieldProps;
        path?: string;
    }): false | JSX.Element | undefined;
    getFormList(properties: SchemaData['properties'], renderItem: (params: {
        name: string;
        field: FormFieldProps;
        path?: string;
    }) => any): any[];
    render(): JSX.Element;
}
