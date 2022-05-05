import { FormItemProps, FormProps } from "react-easy-formcore";
import { FormRenderStore } from "./formrender-store";
import { defaultFields } from './register';

// 表单域(绑定表单字段)
export interface FormFieldProps extends FormItemProps {
  readOnly?: boolean; // 只读模式
  readOnlyWidget?: string; // 只读模式下的组件，和readOnlyRender只能生效一个，readOnlyRender优先级最高
  readOnlyRender?: any; // 只读模式下的组件，和readOnlyWidget只能生效一个，readOnlyRender优先级最高
  widget?: string; // 表单控件代表的字符串，和properties属性不能同时存在
  widgetProps?: { children?: JSX.Element | Array<{ widget: string, widgetProps: FormFieldProps['widgetProps'] }>, [key: string]: any }; // 表单控件自有的props属性
  hidden?: string | boolean; // 显示隐藏的逻辑，支持字符串表达式
  properties?: { [name: string]: FormFieldProps } | FormFieldProps[]; // 嵌套的表单控件 为对象时表示对象嵌套，为数组类型时表示数组集合
}

// schema
export interface SchemaData extends FormProps<FormRenderStore> {
  properties: { [key: string]: FormFieldProps } | FormFieldProps[]
}

export type WatchHandler = (newValue: any, oldValue: string) => void

// 带form容器的渲染组件props
export interface RenderFormProps extends FormProps<FormRenderStore> {
  schema: SchemaData;
  onPropertiesChange?: (name: string, properties: SchemaData['properties']) => void;
  watch?: { [key: string]: { immediate?: boolean, handler: WatchHandler } | WatchHandler };
  widgets: { [key: string]: any };
  Fields?: typeof defaultFields;
};

// 不带form容器的渲染组件props
export interface RenderFormChildrenProps {
  propertiesName: string; // 控件数据源的名
  properties: SchemaData['properties']; // 控件数据源的数据
  onPropertiesChange?: (name: string, properties: SchemaData['properties']) => void;
  watch?: { [key: string]: { immediate?: boolean, handler: WatchHandler } | WatchHandler };
  widgets: { [key: string]: any };
  Fields?: typeof defaultFields;
};

export type ValueOf<T> = T[keyof T];
