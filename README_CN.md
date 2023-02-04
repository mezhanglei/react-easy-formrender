# react-easy-formrender

[English](./README.md) | 中文说明

[![Version](https://img.shields.io/badge/version-6.2.1-green)](https://www.npmjs.com/package/react-easy-formrender)

# 介绍

高自由度、轻量级动态表单引擎，高端的方案往往只需要简单的设计(该方案基于[react-easy-formcore](https://github.com/mezhanglei/react-easy-formcore)开发完成).

- 组件结构：`Form`组件和`RenderFormChildren`(`Form`组件负责表单的值，`RenderFormChildren`组件负责表单的渲染).
- 组件描述：`properties`作为渲染表单的属性，支持数组，支持对象，支持嵌套, `properties`中的每个节点包含表单域属性的配置以及表单控件的配置(`type`, `props`和`typeRender`).
- 组件渲染：一个`Form`组件可以支持多个`RenderFormChildren`组件在内部渲染.

# version log
- v6.x
  6.x在v5.x版本基础上有两大更新(文档已更新)：
  - 6.2 版本，适配底层`react-easy-formcore`库的`4.x`版本以上路径系统，修复`useFormValues`的错误.
  - 6.0.1版本: 组件可以拆分为`Form`和`RenderFormChildren`两部分，`Form`组件处理表单值，`RenderFormChildren`根据提供的信息渲染表单，一个`Form`组件可以包裹多个`RenderFormChildren`组件，如果多个`RenderFormChildren`组件之间存在同属性的，后面会覆盖前面
  - ~~`schema`~~ 属性被展平，所以需要用`properties`来代替渲染表单，并且 ~~`onSchemaChange`~~ 也需要换成`onPropertiesChange`
- v5.x:
  本次更新完成了表单的显示组件与表单值相关逻辑的解耦，后续的基础版本。
  - 底层库`react-easy-formcore`更新，需要删除旧包，再安装新版本的包
  - ~~`readOnlyItem`废弃~~，只保留`readOnlyRender`
  - 5.1.0 ~~`store.swapItemByPath`~~ => `store.moveItemByPath`
  - 5.2.x 删除旧包，再安装新版本的包，更改了`store.addItemByIndex`、`store.addAfterByPath`和`store.addBeforeByPath`的第二个参数。
- v4.x:
  v4.x及之前的版本多数是调整一些方法命名和传参更改
  - 废除固定容器属性 ~~`col`~~ 和 ~~`customInner`~~，增加自定义容器`inside`和`outside`;
  - ~~`widgets`~~ 改为 `controls`, ~~`widget`~~ 和 ~~`widgetProps`~~ 改为`type`和`props`;
  - ~~`readOnlyWidget` 改为 `readOnlyItem`;~~
  - 增加非表单控件的注册: `components`;
- v3.1.x:
  - 调整表单域的`layout`属性，增加`inline`, `labelWidth`属性
  - ~~调整默认导出组件的`onPropertiesChange`改为`onSchemaChange`~~
  - ~~调整`customChild`改为`customInner`~~
- v3.0.x:
  - 字符串表达式中表示表单值的字符由 ~~`$form`~~ 改为`$formvalues`.
  - 字符串表达式中增加`$store`表示`FormRenderStore`的实例，可以获取表单的相关方法和数据.
  - 如果需要引入内置组件(列表的增删按钮), 则需要`import 'react-easy-formrender/lib/css/main.css'`.
- v2.x:
  - 移除 ~~`dependencies`~~ 属性，改为给widget组件自动注入表单值`formvalues`.
  - ~~更改`RenderFormChildren`组件的api~~
- v1.x:
   - 更改表单控件的方法
   - ~~更改schema中的`component`和`props`为`widget`和`widgetProps`~~
   - ~~更改schema中的`render`为`readOnlyWidget`和`readOnlyRender`~~
   - 版本匹配react-easy-formcore的1.1.x版本以上

## 安装

```bash
npm install react-easy-formrender --save
# 或者
yarn add react-easy-formrender
```

## 基本使用

### 1.首先注册基本组件(以antd@4.20.2组件库为例)
```javascript
// register
import RenderFormDefault, { RenderFormChildren as RenderFormChilds, RenderFormChildrenProps, RenderFormProps } from 'react-easy-formrender';
import React from 'react';
import { Input, InputNumber, Checkbox, DatePicker, Mentions, Radio, Rate, Select, Slider, Switch, TimePicker } from 'antd';
import 'react-easy-formrender/lib/css/main.css'
export * from 'react-easy-formrender';

export const AntdBaseControls = {
  "Input": Input,
  "Input.TextArea": Input.TextArea,
  "Input.Password": Input.Password,
  "Input.Search": Input.Search,
  "InputNumber": InputNumber,
  "Mentions": Mentions,
  "Mentions.Option": Mentions.Option,
  "Checkbox": Checkbox,
  'Checkbox.Group': Checkbox.Group,
  "Radio": Radio,
  "Radio.Group": Radio.Group,
  "Radio.Button": Radio.Button,
  "DatePicker": DatePicker,
  "DatePicker.RangePicker": DatePicker.RangePicker,
  "Rate": Rate,
  "Select": Select,
  "Select.Option": Select.Option,
  "Slider": Slider,
  "Switch": Switch,
  "TimePicker": TimePicker,
  "TimePicker.RangePicker": TimePicker.RangePicker
}

export function RenderFormChildren(props: RenderFormChildrenProps) {
  return (
    <RenderFormChilds {...props} controls={{ ...AntdBaseControls, ...props?.controls }} />
  );
}

export default function FormRender(props: RenderFormProps) {
  return (
    <RenderFormDefault {...props} controls={{ ...AntdBaseControls, ...props?.controls }} />
  );
}
```
### 2. 引入第一步已经注册完的组件
```javascript
import { Button } from 'antd';
import React, { useState } from 'react';
import RenderForm, { useFormStore, useFormRenderStore } from './form-render';
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

  const [properties, setProperties] = useState({
      name1: {
        label: "readonly",
        required: true,
        readOnly: true,
        readOnlyRender: "readonly component",
        initialValue: 1111,
        // outside: { type: 'col', props: { span: 6 } },
        hidden: '{{$formvalues.name6 == true}}',
        type: 'Input',
        props: {}
      },
      name2: {
        label: "input",
        required: true,
        // outside: { type: 'col', props: { span: 6 } },
        rules: [{ required: true, message: 'input empty' }],
        initialValue: 1,
        hidden: '{{$formvalues.name6 == true}}',
        type: 'Input',
        props: {}
      },
      name3: {
        label: "list",
        required: true,
        // outside: { type: 'col', props: { span: 6 } },
        properties: [{
          required: true,
          rules: [{ required: true, message: 'list[0]空了' }],
          initialValue: { label: 'option1', value: '1', key: '1' },
          type: 'Select',
          props: {
            labelInValue: true,
            style: { width: '100%' },
            children: [
              { type: 'Select.Option', props: { key: 1, value: '1', children: 'option1' } },
              { type: 'Select.Option', props: { key: 2, value: '2', children: 'option2' } }
            ]
          }
        }, {
          required: true,
          rules: [{ required: true, message: 'list[1] empty' }],
          type: 'Select',
          props: {
            labelInValue: true,
            style: { width: '100%' },
            children: [
              { type: 'Select.Option', props: { key: 1, value: '1', children: 'option1' } },
              { type: 'Select.Option', props: { key: 2, value: '2', children: 'option2' } }
            ]
          }
        }]
      },
      name4: {
        label: 'object',
        required: true,
        // outside: { type: 'col', props: { span: 6 } },
        properties: {
          first: {
            rules: [{ required: true, message: 'object empty' }],
            type: 'Select',
            props: {
              style: { width: '100%' },
              children: [{ type: 'Select.Option', props: { key: 1, value: '1', children: 'option1' } }]
            }
          },
          second: {
            rules: [{ required: true, message: 'name2空了' }],
            type: 'Select',
            props: {
              style: { width: '100%' },
              children: [{ type: 'Select.Option', props: { key: 1, value: '1', children: 'option1' } }]
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
            { type: 'Select.Option', props: { key: 1, value: 12, children: 'option1' } },
            { type: 'Select.Option', props: { key: 2, value: 6, children: 'option2' } },
            { type: 'Select.Option', props: { key: 3, value: 4, children: 'option3' } }
          ]
        }
      },
      name6: {
        label: 'checkbox',
        required: true,
        valueProp: 'checked',
        // outside: { type: 'col', props: { span: 6 } },
        initialValue: true,
        rules: [{ required: true, message: 'checkbox empty' }],
        type: 'Checkbox',
        props: {
          style: { width: '100%' },
          children: 'option'
        }
      },
    })

  const form = useFormStore();
  // const formRenderStore = useFormRenderStore()

  const onSubmit = async (e) => {
    e?.preventDefault?.();
    const result = await form.validate();
    console.log(result, 'result');
  };

  return (
    <div>
      <RenderForm
        form={form}
        // store={formRenderStore}
        properties={properties}
        watch={watch} />
      <div style={{ marginLeft: '120px' }}>
        <Button onClick={onSubmit}>submit</Button>
      </div>
    </div>
  );
}
```

### 3. 多模块渲染
  表单引擎还支持多个`RenderFormChildren`组件渲染，然后由`Form`组件统一处理表单值.
 - `useFormStore` hook: 给表单值的处理提供类的hook.
 - `useFormRenderStore` hook: 给表单的渲染提供类的hook，默认组件内自己提供，也可以外面props传递进去.
```javascript
import React, { useState } from 'react';
import RenderForm, { RenderFormChildren, Form, useFormStore } from './form-render';
import { Button } from 'antd';
export default function Demo(props) {
  
  const [properties1, setProperties1] = useState({
    part1: {
      label: "part1input",
      required: true,
      outside: { type: 'col', props: { span: 6 } },
      rules: [{ required: true, message: 'name1空了' }],
      initialValue: 1,
      type: 'Input',
      props: {}
    },
  })

  const [properties2, setProperties2] = useState({
    part2: {
      label: "part2input",
      required: true,
      outside: { type: 'col', props: { span: 6 } },
      rules: [{ required: true, message: 'name1空了' }],
      initialValue: 1,
      type: 'Input',
      props: {}
    },
  })

  const form = useFormStore();
  // const formRenderStore1 = useFormRenderStore()
  // const formRenderStore2 = useFormRenderStore()

  const onSubmit = async (e) => {
    e?.preventDefault?.();
    const result = await form.validate();
    console.log(result, 'result');
  };

  return (
    <div style={{ padding: '0 8px' }}>
      <Form store={form}>
        <div>
          <p>part1</p>
          <RenderFormChildren
            // store={formRenderStore1}
            properties={properties1}
          />
        </div>
        <div>
          <p>part2</p>
          <RenderFormChildren
            // store={formRenderStore2}
            properties={properties2}
          />
        </div>
      </Form>
      <div style={{ marginLeft: '120px' }}>
        <Button onClick={onSubmit}>submit</Button>
      </div>
    </div>
  );
}
```

## API

### 表单的中涉及的path路径规则
表单允许嵌套，所以表单中会涉及寻找某个属性。其路径遵循一定的规则

举例：
- `a[0]`表示数组a下面的第一个选项
- `a.b` 表示a对象的b属性
- `a[0]b`或`a[0].b`表示数组a下面的第一个选项的b属性

### Form组件
来源于[react-easy-formcore](https://github.com/mezhanglei/react-easy-formcore)

### RenderFormChildren's props
- `properties`: `{ [name: string]: FormFieldProps } | FormFieldProps[]` 渲染表单的DSL形式的json数据
- `watch`属性：可以监听任意字段的值的变化，例如：
```javascript

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
- `renderList`：提供自定义渲染列表的函数.
- `renderItem`：提供自定义渲染表单项的函数.
- `onPropertiesChange`: `(newValue: PropertiesData) => void;` `properties`更改时回调函数
- `store`: 负责渲染的表单类。通过`useFormRenderStore()`创建，选填.
- `uneval`: 不执行表单中的字符串表达式.

### 表单域属性(FormFieldProps)
用来描述一个表单节点.
1. `FormItemProps`中的属性: 继承自[react-easy-formcore](https://github.com/mezhanglei/react-easy-formcore)中的`Form.Item`或`Form.List`组件的`props`。
2. 表单域中字段全面支持字符串表达式，例如`hidden:{{$formvalues.字段路径 === 某个值}}`表示表单的某个字段值等于某个值时隐藏，其中`$formvalues`表示表单值对象。同理, `$store`表示`useFormRenderStore()`创建实例, `$form`表示`useFormStore()`创建的实例
完整属性类型如下：
```javascript
// 表单中的组件描述
export interface FormComponent {
  type?: string; // 注册组件的字符串代号
  props?: { // 传递给组件的props
    [key: string]: any;
    children?: any | Array<FormComponent> // 部分字段允许继续嵌套
  };
  hidden?: string | boolean; // 支持字符串表达式或者布尔值
}

// 表单上的组件联合类型
export type UnionComponent<P> =
  | React.ComponentType<P>
  | React.ForwardRefExoticComponent<P>
  | React.FC<P>
  | keyof React.ReactHTML;
export type FieldUnionType = FormComponent | Array<FormComponent> | UnionComponent<any> | Function

export interface FormFieldProps extends FormItemProps, FormComponent {
  ignore?: boolean; // 忽略当前节点不会作为表单值
  fieldComponent?: FieldUnionType; // 表单域组件
  inside?: FieldUnionType; // 表单域组件内层嵌套组件
  outside?: FieldUnionType; // 表单域组件外层嵌套组件
  readOnly?: boolean; // 只读模式
  readOnlyRender?: FieldUnionType | ReactNode; // 只读模式下的组件
  typeRender?: any; // 表单控件自定义渲染
  valueGetter?: string | ((...args: any[]) => any); // 拦截输出项
  valueSetter?: string | ((value: any) => any); // 拦截输入项
  properties?: { [name: string]: FormFieldProps } | FormFieldProps[]; // 嵌套的表单控件 为对象时表示对象嵌套，为数组类型时表示数组集合
}
```

### rules
表单控件中的`rules`规则来自于[react-easy-formcore](https://github.com/mezhanglei/react-easy-formcore)中的`rules`属性。

### FormRenderStore Methods
  仅仅负责表单的渲染
 - `updateItemByPath`: `(path: string, data?: Partial<FormFieldProps>) => void` 更新properties中`path`对应的信息
 - `setItemByPath`: `(path: string, data?: Partial<FormFieldProps>) => void` 设置properties中`path`对应的信息
 - `updateNameByPath`: `(path: string, newName?: string) => void` 更新指定路径的name键
 - `delItemByPath`: `(path: string) => void` 删除properties中`path`对应的信息
 - `addItemByIndex`: `(data: FormFieldProps | FormFieldProps[], index?: number, parent?: string) => void` 根据序号和父节点路径添加选项
 - `addAfterByPath`: `(data: FormFieldProps | FormFieldProps[], path: string) => void` 在目标路径后面添加选项
 - `addBeforeByPath`: `(data: FormFieldProps | FormFieldProps[], path: string) => void` 在目标节点前面添加选项
 - `getItemByPath`: `(path: string) => void` 获取properties中`path`对应的信息
 - `moveItemByPath`: `(from: { parent?: string, index: number }, to: { parent?: string, index?: number })` 把树中的选项从一个位置调换到另外一个位置
 - `setProperties`: `(data?: Partial<FormFieldProps>) => void` 设置`properties`;

### Hooks

- `useFormRenderStore()` 使用 hooks 创建 FormRenderStore.
- `useFormStore(defaultValues)` 使用 hooks 创建 FormStore.
