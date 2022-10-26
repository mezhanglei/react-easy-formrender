# react-easy-formrender

[English](./README.md) | 中文说明

[![Version](https://img.shields.io/badge/version-5.1.1-green)](https://www.npmjs.com/package/react-easy-formrender)

# 适用场景

高自由度、轻量级动态表单引擎，高端的方案往往只需要简单的设计(该方案基于[react-easy-formcore](https://github.com/mezhanglei/react-easy-formcore)开发完成).

# version log
- v5.x:
  - 底层库`react-easy-formcore`更新，需要删除旧包，再安装新版本的包
  - `readOnlyItem`废弃，只保留`readOnlyRender`
  - 5.1.0 `store.swapItemByPath` => `store.moveItemByPath`
- v4.x:
  - 大版本更新，废除固定容器属性`col`和`customInner`，增加自定义容器`inside`和`outside`;
  - `widgets` 改为 `controls`, `widget`和`widgetProps`改为`type`和`props`;
  - ~~`readOnlyWidget` 改为 `readOnlyItem`;~~
  - 增加非表单控件的注册: `components`;
- v3.1.x:
  - 调整表单域的`layout`属性，增加`inline`, `labelWidth`属性
  - 调整默认导出组件的`onPropertiesChange`改为`onSchemaChange`
  - ~~调整`customChild`改为`customInner`~~
- v3.0.x:
  - 字符串表达式中表示表单值的字符由`$form`改为`$formvalues`.
  - 字符串表达式中增加`$store`表示`FormRenderStore`的实例，可以获取表单的相关方法和数据.
  - 如果需要引入内置组件(列表的增删按钮), 则需要`import 'react-easy-formrender/lib/css/main.css'`.
- v2.x:
  - 移除 `dependencies` 属性，改为给widget组件自动注入表单值`formvalues`.
  - ~~更改`RenderFormChildren`组件的api~~
  - 更改`FormRenderStore`的Methods
- v1.x:
   - 更改表单控件的方法
   - 优化`onValuesChange`使用
   - ~~更改schema中的`component`和`props`为`widget`和`widgetProps`~~
   - ~~更改schema中的`render`为`readOnlyWidget`和`readOnlyRender`~~
   - 版本匹配react-easy-formcore的1.1.x版本以上

# 默认导出组件

- 原子组件和表单引擎完全解耦，在使用表单前可以更换为任意具有`value`(或通过`valueProp`设置)和`onChange`接口`props`的ui库控件或自定义的其他控件
- 通过`schema`属性渲染表单，主要分为三部分, 1. 最外层表单容器的props. 2. 字段对应的`FormFieldProps`用来描述表单域的属性. 3. FormFieldProps中的`props`用来描述`controls`组件
- `schema`中关于表单域属性字段已全面支持字符串表达式

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
export const AntdBaseControls = {
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
    <RenderBaseForm {...props} controls={{ ...AntdBaseControls, ...props?.controls }} />
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
    // inside: {
    //   type: 'row'
    // },
    properties: {
      name1: {
        label: "只读展示",
        required: true,
        readOnly: true,
        readOnlyRender: "只读展示组件",
        initialValue: 1111,
        // outside: { type: 'col', props: { span: 6 } },
        hidden: '{{$formvalues.name6 == true}}',
        type: 'Input',
        props: {}
      },
      name2: {
        label: "输入框",
        required: true,
        // outside: { type: 'col', props: { span: 6 } },
        rules: [{ required: true, message: 'name2空了' }],
        initialValue: 1,
        hidden: '{{$formvalues.name6 == true}}',
        type: 'Input',
        props: {}
      },
      name3: {
        label: "数组name3",
        required: true,
        // outside: { type: 'col', props: { span: 6 } },
        properties: [{
          required: true,
          rules: [{ required: true, message: 'name3[0]空了' }],
          initialValue: { label: '选项1', value: '1', key: '1' },
          type: 'Select',
          props: {
            labelInValue: true,
            style: { width: '100%' },
            children: [
              { type: 'Select.Option', props: { key: 1, value: '1', children: '选项1' } },
              { type: 'Select.Option', props: { key: 2, value: '2', children: '选项2' } }
            ]
          }
        }, {
          required: true,
          rules: [{ required: true, message: 'name3[1]空了' }],
          type: 'Select',
          props: {
            labelInValue: true,
            style: { width: '100%' },
            children: [
              { type: 'Select.Option', props: { key: 1, value: '1', children: '选项1' } },
              { type: 'Select.Option', props: { key: 2, value: '2', children: '选项2' } }
            ]
          }
        }]
      },
      name4: {
        label: '对象嵌套',
        required: true,
        // outside: { type: 'col', props: { span: 6 } },
        properties: {
          first: {
            rules: [{ required: true, message: 'name4空了' }],
            type: 'Select',
            props: {
              style: { width: '100%' },
              children: [{ type: 'Select.Option', props: { key: 1, value: '1', children: '选项1' } }]
            }
          },
          second: {
            rules: [{ required: true, message: 'name2空了' }],
            type: 'Select',
            props: {
              style: { width: '100%' },
              children: [{ type: 'Select.Option', props: { key: 1, value: '1', children: '选项1' } }]
            }
          }
        }
      },
      name5: {
        label: 'name5',
        initialValue: { span: 12 },
        valueSetter: "{{(value)=> (value && value['span'])}}",
        valueGetter: "{{(value) => ({span: value})}}",
        type: 'Select',
        props: {
          style: { width: '100%' },
          children: [
            { type: 'Select.Option', props: { key: 1, value: 12, children: '一行一列' } },
            { type: 'Select.Option', props: { key: 2, value: 6, children: '一行二列' } },
            { type: 'Select.Option', props: { key: 3, value: 4, children: '一行三列' } }
          ]
        }
      },
      name6: {
        label: 'name6',
        required: true,
        valueProp: 'checked',
        // outside: { type: 'col', props: { span: 6 } },
        initialValue: true,
        rules: [{ required: true, message: 'name5空了' }],
        type: 'Checkbox',
        props: {
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
- `controls`：注册表单控件.
- `components`：注册表单中控件以外的其他组件(容器组件，按钮等);
- `renderList`：提供自定义渲染列表.
- `renderItem`：提供自定义渲染表单项.
- `inside` 表单项的显示容器.
- `onSchemaChange`: `(newValue: SchemaData) => void;` `schema`更改时回调函数

### 表单域属性(FormFieldProps)
1. `FormItemProps`中的属性: 继承自[react-easy-formcore](https://github.com/mezhanglei/react-easy-formcore)中的`Form.Item`或`Form.List`组件的`props`。
2. 表单域的全面支持字符串表达式，例如`hidden:{{$formvalues.字段路径 === 某个值}}`表示表单的某个字段值等于某个值时隐藏，其中`$formvalues`表示表单值对象
完整属性类型如下：
```javascript
export interface BaseFieldProps extends SchemaComponent {
  ignore?: boolean; // 忽略当前节点不会作为表单值
  fieldComponent?: FieldUnionType; // 表单域组件
  inside?: FieldUnionType; // 表单域组件内层嵌套组件
  outside?: FieldUnionType; // 表单域组件外层嵌套组件
  readOnly?: boolean; // 只读模式
  readOnlyRender?: FieldUnionType | ReactNode; // 只读模式下的组件
  typeRender?: any; // 表单控件自定义渲染
}

export interface FormFieldProps extends FormItemProps, BaseFieldProps {
  valueGetter?: string | ((...args: any[]) => any); // 拦截输出项
  valueSetter?: string | ((value: any) => any); // 拦截输入项
  properties?: { [name: string]: FormFieldProps } | FormFieldProps[]; // 嵌套的表单控件 为对象时表示对象嵌套，为数组类型时表示数组集合
}
```

### 表单中的使用的组件描述
  表单中使用的容器组件、表单控件、按钮，统一用同样的结构描述。
```javascript
// 组件描述基本属性
export interface SchemaComponent {
  type?: string;
  props?: {
    [key: string]: any;
    children?: any | Array<SchemaComponent>
  };
  hidden?: string | boolean;
}
```

### rules
表单控件中的`rules`规则来自于[react-easy-formcore](https://github.com/mezhanglei/react-easy-formcore)中的`rules`属性。

### FormRenderStore Methods
  包括两部分：渲染表单的方法以及表单控件的方法
1. 渲染表单的方法。(其中path的规则：`a.b[0]`, 表示a属性下的b数组属性的第0项)
 - `updateItemByPath`: `(path: string, data?: Partial<FormFieldProps>) => void` 更新schema中`path`对应的信息
 - `setItemByPath`: `(path: string, data?: Partial<FormFieldProps>) => void` 设置schema中`path`对应的信息
 - `updateNameByPath`: `(path: string, newName?: string) => void` 更新指定路径的name键
 - `delItemByPath`: `(path: string) => void` 删除schema中`path`对应的信息
 - `addItemByIndex`: `(data: AddItem | AddItem[], index?: number, parent?: string) => void` 根据序号和父节点路径添加选项
 - `addAfterByPath`: `(data: AddItem | AddItem[], path: string) => void` 在目标路径后面添加选项
 - `addBeforeByPath`: `(data: AddItem | AddItem[], path: string) => void` 在目标节点前面添加选项
 - `getItemByPath`: `(path: string) => void` 获取schema中`path`对应的信息
 - `moveItemByPath`: `(from: { parent?: string, index: number }, to: { parent?: string, index?: number })` 把树中的选项从一个位置调换到另外一个位置
 - `setProperties`: `(data?: Partial<FormFieldProps>) => void` 设置`properties`;
2. 表单控件的方法
  继承[react-easy-formcore](https://github.com/mezhanglei/react-easy-formcore)中的`FormStore Methods`属性和方法

```javascript
interface AddItem {
  name: string
  field: FormFieldProps 
}
```
### Hooks

- `useFormRenderStore(defaultValues)` 使用 hooks 创建 FormRenderStore。