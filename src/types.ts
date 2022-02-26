import { FormItemProps, FormOptions, FormProps } from "react-easy-formcore";
import { defaultFields } from './register';

// 组件的children(不绑定表单字段)
export interface ChildrenComponent {
  component: string, // 组件代表的字符串
  props: { children?: JSX.Element | ChildrenComponent[], [key: string]: any } // 渲染props数组
}

// 表单域(绑定表单字段)
export interface FormFieldProps extends FormItemProps {
  component: string // 表单控件代表的字符串，和properties属性不能同时存在，不支持字符串表达式
  readOnly?: boolean | string // 是否为只读模式, 不支持字符串表达式
  render?: any // 非表单控件, 在readOnly只读模式下才会覆盖表单控件，支持字符串表达式
  props?: { children?: JSX.Element | ChildrenComponent[], [key: string]: any } // 表单控件自有的props属性
  hidden?: string | boolean // 显示隐藏的逻辑，支持字符串表达式
  properties?: { [name: string]: FormFieldProps } | FormFieldProps[] // 嵌套的表单控件 为对象时表示对象嵌套，为数组类型时表示数组集合
}

// schema
export interface SchemaData extends FormProps {
  properties: { [key: string]: FormFieldProps }
}

export type WatchHandler = (newValue: any, oldValue: string) => void

// 带form容器的渲染组件props
export interface RenderFormProps extends FormProps {
  schema: SchemaData
  watch?: { [key: string]: { immediate?: boolean, handler: WatchHandler } | WatchHandler }
  widgets: { [key: string]: any }
  Fields?: typeof defaultFields
  // 自定义children，并注入渲染表单控件的方法
  children?: (
    properties: SchemaData['properties'],
    renderItem: (params: { name: string, field: FormFieldProps, path?: string }) => any
  ) => any
};

// 不带form容器的渲染组件props
export interface RenderFormChildrenProps extends FormOptions {
  properties: SchemaData['properties']
  initialValues?: Partial<unknown>,
  watch?: { [key: string]: { immediate?: boolean, handler: WatchHandler } | WatchHandler }
  widgets: { [key: string]: any }
  Fields?: typeof defaultFields
  // 自定义children，并注入渲染表单控件的方法
  children?: (
    properties: SchemaData['properties'],
    renderItem: (params: { name: string, field: FormFieldProps, path?: string }) => any
  ) => any
};