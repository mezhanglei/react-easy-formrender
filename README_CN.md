# react-easy-formrender

[English](./README.md) | 中文说明

[![Version](https://img.shields.io/badge/version-3.1.2-green)](https://www.npmjs.com/package/react-easy-formrender)

# 适用场景

高自由度、轻量级动态表单引擎，高端的方案往往只需要简单的设计(该方案基于[react-easy-formcore](https://github.com/mezhanglei/react-easy-formcore)开发完成), 提供两种组件： (1)默认导出组件自带`Form`容器组件进行渲染,可以实现完整的表单功能(2)导出`RenderFormChildren`组件不带`Form`容器, 只提供表单域的控件渲染, 需要配合`Form`容器组件使用才具有完整表单功能.

# version log
- v3.1.x:
  - 调整表单域的`layout`属性，增加`inline`, `labelWidth`属性
  - 调整默认导出组件的`onPropertiesChange`改为`onSchemaChange`
  - 调整`customChild`改为`customInner`
- v3.0.x:
  - 字符串表达式中表示表单值的字符由`$form`改为`$formvalues`.
  - 字符串表达式中增加`$store`表示`FormRenderStore`的实例，可以获取表单的相关方法和数据.
  - 如果需要引入内置组件(列表的增删按钮), 则需要`import 'react-easy-formrender/lib/css/main.css'`.
- v2.x:
  - 移除 `dependencies` 属性，改为给widget组件自动注入表单值`formvalues`.
  - 更改`RenderFormChildren`组件的api
  - 更改`FormRenderStore`的Methods
- v1.x:
   - 更改表单控件的方法
   - 优化`onValuesChange`使用
   - 更改schema中的`component`和`props`为`widget`和`widgetProps`
   - 更改schema中的`render`为`readOnlyWidget`和`readOnlyRender`
   - 版本匹配react-easy-formcore的1.1.x版本以上

# 默认导出组件

- 原子组件和表单引擎完全解耦，在使用表单前可以更换为任意具有`value`(或通过`valueProp`设置)和`onChange`接口`props`的ui库控件或自定义的其他控件
- 通过`schema`属性渲染表单，主要分为三部分, 1. 最外层表单容器的props. 2. 字段对应的`FormFieldProps`用来描述表单域的属性. 3. FormFieldProps中的`widgetProps`用来描述`widgets`组件
- `schema`中关于表单域属性字段已全面支持字符串表达式

# RenderFormChildren组件

- 通过`properties`属性渲染表单域
- `onPropertiesChange`: `(newValue: SchemaData['properties'], oldValue?: SchemaData['properties']) => void;` `properties`更改时回调函数
- 该组件只能使用一个

## 安装

```bash
npm install react-easy-formrender --save
# 或者
yarn add react-easy-formrender
```

## 基本使用

1. 首先注册基本组件(以antd@4.20.2组件库为例)
```javascript
// register
import RenderBaseForm, { RenderFormProps } from 'react-easy-formrender';
import React from 'react';
import { Input, InputNumber, Checkbox, DatePicker, Mentions, Radio, Rate, Select, Slider, Switch, TimePicker } from 'antd';
export * from 'react-easy-formrender';
// 提供开发过程中的基础控件(控件需要满足具有value传参，onChange回调函数的props)
export const AntdBaseWidgets = {
  "Input": Input, // 输入控件
  "Input.TextArea": Input.TextArea, // 输入文本域
  "Input.Password": Input.Password, // 输入密码组件
  "Input.Search": Input.Search, // 输入搜索组件
  "InputNumber": InputNumber, // 数字输入控件
  "Mentions": Mentions, // 携带@提示的输入控件
  "Mentions.Option": Mentions.Option, // 提示控件的option
  "Checkbox": Checkbox, // 多选组件
  'Checkbox.Group': Checkbox.Group, // 多选列表组件
  "Radio": Radio, // 单选组件
  "Radio.Group": Radio.Group, // 单选列表组件
  "Radio.Button": Radio.Button, // 单选按钮组件
  "DatePicker": DatePicker, // 日期控件
  "DatePicker.RangePicker": DatePicker.RangePicker, // 日期范围控件
  "Rate": Rate, // 星星评分控件
  "Select": Select, // 选择控件
  "Select.Option": Select.Option, // 选择的选项
  "Slider": Slider, // 滑动输入项
  "Switch": Switch, // 切换组件
  "TimePicker": TimePicker, // 时分秒控件
  "TimePicker.RangePicker": TimePicker.RangePicker, // 时分秒范围控件
}

export default function FormRender(props: RenderFormProps) {
  return (
    <RenderBaseForm {...props} widgets={{ ...AntdBaseWidgets, ...props?.widgets }} />
  );
}
```
2. 引入第一步已经注册完的组件
```javascript
import { Button } from 'antd';
import React, { useState } from 'react';
import RenderForm, { useFormRenderStore } from './form-render';
export default function Demo5(props) {

  const watch = {
    'name2': (newValue, oldValue) => {
      console.log(newValue, oldValue)
    },
    'name3[0]': (newValue, oldValue) => {
      console.log(newValue, oldValue)
    },
    'name4': (newValue, oldValue) => {
      console.log(newValue, oldValue)
    }
  }

  const [schema, setSchema] = useState({
    properties: {
      name1: {
        label: "只读展示",
        widget: 'Input',
        required: true,
        readOnly: true,
        readOnlyRender: "只读展示组件",
        initialValue: 1111,
        // col: { span: 6 },
        hidden: '{{$formvalues.name5 == true}}',
        widgetProps: {}
      },
      name2: {
        label: "输入框",
        widget: 'Input',
        required: true,
        // col: { span: 6 },
        rules: [{ required: true, message: 'name2空了' }],
        initialValue: 1,
        hidden: '{{$formvalues.name5 == true}}',
        widgetProps: {}
      },
      name3: {
        label: "数组",
        required: true,
        // col: { span: 6 },
        properties: [{
          widget: 'Select',
          required: true,
          rules: [{ required: true, message: 'name3[0]空了' }],
          initialValue: { label: '选项1', value: '1', key: '1' },
          widgetProps: {
            labelInValue: true,
            style: { width: '100%' },
            children: [
              { widget: 'Select.Option', widgetProps: { key: 1, value: '1', children: '选项1' } },
              { widget: 'Select.Option', widgetProps: { key: 2, value: '2', children: '选项2' } }
            ]
          }
        }, {
          widget: 'Select',
          required: true,
          rules: [{ required: true, message: 'name3[1]空了' }],
          widgetProps: {
            labelInValue: true,
            style: { width: '100%' },
            children: [
              { widget: 'Select.Option', widgetProps: { key: 1, value: '1', children: '选项1' } },
              { widget: 'Select.Option', widgetProps: { key: 2, value: '2', children: '选项2' } }
            ]
          }
        }]
      },
      name4: {
        label: '对象嵌套',
        required: true,
        // col: { span: 6 },
        properties: {
          first: {
            rules: [{ required: true, message: 'name4空了' }],
            widget: 'Select',
            widgetProps: {
              style: { width: '100%' },
              children: [{ widget: 'Select.Option', widgetProps: { key: 1, value: '1', children: '选项1' } }]
            }
          },
          second: {
            rules: [{ required: true, message: 'name2空了' }],
            widget: 'Select',
            widgetProps: {
              style: { width: '100%' },
              children: [{ widget: 'Select.Option', widgetProps: { key: 1, value: '1', children: '选项1' } }]
            }
          }
        }
      },
      name5: {
        label: 'name5',
        widget: 'Checkbox',
        required: true,
        valueProp: 'checked',
        // col: { span: 6 },
        initialValue: true,
        rules: [{ required: true, message: 'name5空了' }],
        widgetProps: {
          style: { width: '100%' },
          children: '多选框'
        }
      },
    }
  })

  const store = useFormRenderStore();

  const onSubmit = async (e) => {
    e?.preventDefault?.();
    const result = await store.validate();
    console.log(result, 'result');
  };

  return (
    <div>
      <RenderForm store={store} schema={schema} watch={watch} />
      <div style={{ marginLeft: '120px' }}>
        <Button onClick={onSubmit}>submit</Button>
      </div>
    </div>
  );
}
```

### 表单容器的props
- 基础属性：继承[react-easy-formcore](https://github.com/mezhanglei/react-easy-formcore)中的`Form Props`.
- `schema`: 渲染表单的DSL形式的json数据
```javascript
// schema 属性
export interface SchemaData extends FormProps<FormRenderStore> {
  properties: { [key: string]: FormFieldProps } | FormFieldProps[]
}
```
- `watch`属性：可以监听任意字段的值的变化，例如：
```javascript
// 声明式传值
const watch = {
  'name1': (newValue, oldValue) => {
    // console.log(newValue, oldValue)
  },
  'name2[0]': (newValue, oldValue) => {
    // console.log(newValue, oldValue)
  },
  'name3': {
      handler: (newValue, oldValue) => {
        // console.log(newValue, oldValue)
      }
      immediate: true // 立即监听
  }
  ...
  <RenderForm watch={watch} />
}
```
- `widgets`：注册表单所需要使用的组件.
- `customList`：提供自定义渲染列表.
- `customInner`：提供自定义渲染表单项.
- `onSchemaChange`: `(newValue: SchemaData) => void;` `schema`更改时回调函数

### 表单域属性(FormFieldProps)
1. `FormItemProps`中的属性: 继承自[react-easy-formcore](https://github.com/mezhanglei/react-easy-formcore)中的`Form.Item`或`Form.List`组件的`props`。
2. 表单域的全面支持字符串表达式，例如`hidden:{{$formvalues.字段路径 === 某个值}}`表示表单的某个字段值等于某个值时隐藏，其中`$formvalues`表示表单值对象
完整属性类型如下：
```javascript
export interface FormFieldProps extends FormItemProps {
  readOnly?: boolean; // 只读模式
  readOnlyWidget?: string; // 只读模式下的组件，和readOnlyRender只能生效一个，readOnlyRender优先级最高
  readOnlyRender?: any; // 只读模式下的组件，和readOnlyWidget只能生效一个，readOnlyRender优先级最高
  widget?: string; // 表单控件代表的字符串，和properties属性不能同时存在
  widgetProps?: { children?: any | Array<{ widget: string, widgetProps: FormFieldProps['widgetProps'] }>, [key: string]: any }; // 表单控件自有的props属性
  hidden?: string | boolean; // 显示隐藏的逻辑，支持字符串表达式
  properties?: { [name: string]: FormFieldProps } | FormFieldProps[]; // 嵌套的表单控件 为对象时表示对象嵌套，为数组类型时表示数组集合
}
```

### 描述`widgets`组件(`widgetProps`)

```javascript
interface widgetProps?: { 
  children?: JSX.Element |
  Array<{ widget: string, widgetProps: FormFieldProps['widgetProps'] }>, [key: string]: any }; // 表单控件自有的props属性
}
```

### rules
表单控件中的`rules`规则来自于[react-easy-formcore](https://github.com/mezhanglei/react-easy-formcore)中的`rules`属性。

### FormRenderStore Methods
  包括两部分：渲染表单的方法以及表单控件的方法
1. 渲染表单的方法。(其中path的规则：`a.b[0]`, 表示a属性下的b数组属性的第0项)
 - `updateItemByPath`: `(path: string, data?: Partial<FormFieldProps>) => void` 更新schema中`path`对应的信息
 - `setItemByPath`: `(path: string, data?: Partial<FormFieldProps>) => void` 设置schema中`path`对应的信息
 - `delItemByPath`: `(path: string) => void` 删除schema中`path`对应的信息
 - `addItemByIndex`: `(data: { name: string, field: FormFieldProps }, index?: number, parentPath?: string) => void` 根据序号和父节点路径添加选项
 - `getItemByPath`: `(path: string) => void` 获取schema中`path`对应的信息
 - `swapItemByPath`: `(from: { parentPath?: string, index: number }, to: { parentPath?: string, index?: number })` 把树中的选项从一个位置调换到另外一个位置
 - `setProperties`: `(data?: Partial<FormFieldProps>) => void` 设置`properties`;
2. 表单控件的方法
  继承[react-easy-formcore](https://github.com/mezhanglei/react-easy-formcore)中的`FormStore Methods`属性和方法

### Hooks

- `useFormRenderStore(defaultValues)` 使用 hooks 创建 FormRenderStore。