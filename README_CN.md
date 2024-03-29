# react-easy-formrender

[English](./README.md) | 中文说明

[![Version](https://img.shields.io/badge/version-8.0.25-green)](https://www.npmjs.com/package/react-easy-formrender)

> 项目已迁移至[@simpleform/render](https://github.com/mezhanglei/simpleform), 本仓库已废弃.

# 介绍

高自由度、轻量级动态表单引擎，高端的方案往往只需要简单的设计(该方案基于[react-easy-formcore](https://github.com/mezhanglei/react-easy-formcore)开发完成).

- 组件注册: 注册的表单控件需要符合`value`/`onChange`(或其他字段)传参才能正常使用.
- 组件描述：`properties`支持对象或者数组类型的渲染，支持通过`properties`属性添加嵌套对象字段。
- 组件渲染：`Form`组件处理表单的值, `RenderFormChildren`组件处理表单的渲染, 一个`Form`组件可以支持多个`RenderFormChildren`组件在内部渲染.
- 组件联动：表单属性均可以支持字符串表达式描述联动条件(`properties`除外).

# version log
- v8.x
  - 更新底层组件为`react-easy-formcore`至少5.x版本.
  - 渲染数据源`properties`渲染方式更改，分为嵌套节点和控件节点，其中嵌套节点不再携带表单域组件，只有控件节点才默认携带表单域组件
  - ~~`store`~~ 属性更改为 `formrender`字段.
- v7.x
  - 7.0.0 移除 ~~`controls`~~ 属性, 保留`components`属性注册全局所有组件.
- v6.x
  - 6.2.17 ~~`fieldComponent`~~ 改为`component`，`component`属性可以设置为`null`. `FormRenderStore`的方法也进行更新
  - 6.2.7 当默认组件`RenderForm`在嵌套情况下`form`标签`warning`时, 可以设置`tagName`更换成其他标签. 移除 ~~`addItemByIndex`, `addAfterByPath`, `addBeforeByPath`~~
  - 6.2.5 增强并调整字符串表达式的用法，并在此文档中新增字符串表达式使用方法说明请详细阅读.
  - 6.2.1 适配底层`react-easy-formcore`库的`4.x`版本以上路径系统，修复`useFormValues`的错误.
  - 6.0.1 组件可以拆分为`Form`和`RenderFormChildren`两部分，`Form`组件处理表单值，`RenderFormChildren`根据提供的信息渲染表单，一个`Form`组件可以包裹多个`RenderFormChildren`组件，如果多个`RenderFormChildren`组件之间存在同属性的，后面会覆盖前面
  - ~~`schema`~~ 属性被展平，所以需要用`properties`来代替渲染表单，并且 ~~`onSchemaChange`~~ 也需要换成`onPropertiesChange`
- v5.x:
  本次更新完成了表单的显示组件与表单值相关逻辑的解耦，后续的基础版本。
  - 底层库`react-easy-formcore`更新，需要删除旧包，再安装新版本的包
  - ~~`readOnlyItem`废弃~~，只保留`readOnlyRender`
- v4.x:
  v4.x及之前的版本多数是调整一些方法命名和传参更改
  - 废除固定容器属性 ~~`col`~~ 和 ~~`customInner`~~，增加自定义容器`inside`和`outside`;
  - ~~`widgets`~~ 改为 ~~`controls`~~ , ~~`widget`~~ 和 ~~`widgetProps`~~ 改为`type`和`props`;
  - ~~`readOnlyWidget` 改为 `readOnlyItem`;~~
- v3.1.x:
  - 调整表单域的`layout`属性，增加`inline`, `labelWidth`属性
  - ~~调整默认导出组件的`onPropertiesChange`改为`onSchemaChange`~~
  - ~~调整`customChild`改为`customInner`~~
- v3.0.x:
  - ~~字符串表达式中表示表单值的字符由 `$form` 改为`$formvalues`~~
  - ~~字符串表达式中增加`$store`表示`FormRenderStore`的实例，可以获取表单的相关方法和数据~~
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
import RenderFormDefault, { RenderFormChildren as RenderFormChilds, RenderFormProps } from 'react-easy-formrender';
import React from 'react';
import { Input, InputNumber, Checkbox, DatePicker, Mentions, Radio, Rate, Select, TreeSelect, Slider, Switch, TimePicker } from 'antd';
import 'react-easy-formrender/lib/css/main.css'
export * from 'react-easy-formrender';

export const BaseComponents = {
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
  "TreeSelect": TreeSelect,
  "Slider": Slider,
  "Switch": Switch,
  "TimePicker": TimePicker,
  "TimePicker.RangePicker": TimePicker.RangePicker
}

export type CustomRenderFormProps = RenderFormProps<any>;

// RenderFormChildren
export function RenderFormChildren(props: CustomRenderFormProps) {
  const { components, expressionImports, ...rest } = props;
  return (
    <RenderFormChilds
      options={{ props: { autoComplete: 'off' } }}
      components={{ ...BaseComponents, ...components }}
      // expressionImports={{ ...expressionImports, moment }}
      {...rest}
    />
  );
}

// RenderForm
export default function FormRender(props: CustomRenderFormProps) {
  const { components, expressionImports, ...rest } = props;
  return (
    <RenderFormDefault
      options={{ props: { autoComplete: 'off' } }}
      components={{ ...BaseComponents, ...components }}
      // expressionImports={{ ...expressionImports, moment }}
      {...rest}
    />
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

  const properties = {
      name1: {
        label: "readonly",
        readOnly: true,
        readOnlyRender: "readonly component",
        initialValue: 1111,
        hidden: '{{formvalues && formvalues.name6 == true}}',
        type: 'Input',
        props: {}
      },
      name2: {
        label: "input",
        rules: [{ required: true, message: 'input empty' }],
        initialValue: 1,
        hidden: '{{formvalues && formvalues.name6 == true}}',
        type: 'Input',
        props: {}
      },
      name3: {
        // type: '',
        // props: {},
        properties: [{
          label: 'list[0]',
          rules: [{ required: true, message: 'list[0] empty' }],
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
          label: 'list[1]',
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
        // type: '',
        // props: {},
        properties: {
          first: {
            label: 'first',
            rules: [{ required: true, message: 'first empty' }],
            type: 'Select',
            props: {
              style: { width: '100%' },
              children: [{ type: 'Select.Option', props: { key: 1, value: '1', children: 'option1' } }]
            }
          },
          second: {
            label: 'second',
            rules: [{ required: true, message: 'second empty' }],
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
        valueProp: 'checked',
        initialValue: true,
        rules: [{ required: true, message: 'checkbox empty' }],
        type: 'Checkbox',
        props: {
          style: { width: '100%' },
          children: 'option'
        }
      },
    }

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
        // formrender={formRenderStore}
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
 - `useFormStore`: 给表单值的处理提供类的hook. 默认组件内自己提供，也可以外面props传递进去.
 - `useFormRenderStore`: 给表单的渲染提供类的hook, 默认组件内自己提供，也可以外面props传递进去.
```javascript
import React, { useState } from 'react';
import RenderForm, { RenderFormChildren, Form, useFormStore } from './form-render';
import { Button } from 'antd';
export default function Demo(props) {
  
  const properties1 = {
    part1: {
      label: "part1input",
      rules: [{ required: true, message: 'name1 empty' }],
      initialValue: 1,
      type: 'Input',
      props: {}
    },
  }

  const properties2 = {
    part2: {
      label: "part2input",
      rules: [{ required: true, message: 'name1 empty' }],
      initialValue: 1,
      type: 'Input',
      props: {}
    },
  }

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
      <Form form={form}>
        <div>
          <p>part1</p>
          <RenderFormChildren
            // formrender={formRenderStore1}
            properties={properties1}
          />
        </div>
        <div>
          <p>part2</p>
          <RenderFormChildren
            // formrender={formRenderStore2}
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
### 4. 数组数据
支持数组渲染
```javascript
import React, { useState } from 'react';
import RenderForm, { useFormStore } from './form-render';
import { Button } from 'antd';
export default function Demo(props) {
  
  const properties =
    [
      {
        label: "list-0",
        rules: [{ required: true, message: 'name1 empty' }],
        initialValue: 1,
        type: 'Input',
        props: {}
      },
      {
        label: "list-1",
        rules: [{ required: true, message: 'name1 empty' }],
        initialValue: 2,
        type: 'Input',
        props: {}
      },
      {
        label: "list-2",
        rules: [{ required: true, message: 'name1 empty' }],
        initialValue: 3,
        type: 'Input',
        props: {}
      },
      {
        label: "list-3",
        rules: [{ required: true, message: 'name1 empty' }],
        initialValue: 4,
        type: 'Input',
        props: {}
      },
    ];

  const form = useFormStore();

  const onSubmit = async (e) => {
    e?.preventDefault?.();
    const result = await form.validate();
    console.log(result, 'result');
  };

  return (
    <div style={{ padding: '0 8px' }}>
      <RenderForm
        form={form}
        // formrender={formRenderStore}
        properties={properties}
        watch={watch}
      />
      <div style={{ marginLeft: '120px' }}>
        <Button onClick={onSubmit}>submit</Button>
      </div>
    </div>
  );
}
```

## API

### RenderFormChildren's props
表单渲染组件的属性:
- `properties`: `{ [name: string]: FormNodeProps } | FormNodeProps[]` 渲染表单的DSL形式的json数据
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
- `components`：注册表单中的所有组件;
- `options`： `GenerateFormNodeProps | ((params: GenerateFormNodeProps) => any)` 传递给表单节点组件的参数信息. 优先级比表单节点自身的参数要低
- `renderList`：提供自定义渲染列表的函数.
- `renderItem`：提供自定义渲染节点的函数.
- `onPropertiesChange`: `(newValue: PropertiesData) => void;` `properties`更改时回调函数
- `formrender`: 负责渲染的表单类。通过`useFormRenderStore()`创建，选填.
- `uneval`: 不执行表单中的字符串表达式.
- `expressionImports`: 在字符串表达式中引入的外部的变量.

### Form`s props
来源于[react-easy-formcore](https://github.com/mezhanglei/react-easy-formcore)
- 6.2.7 当默认组件`RenderForm`在嵌套情况下`form`标签报错时, 可以设置`tagName`更换成其他标签.

### FormRenderStore Methods
  仅仅负责表单的渲染
 - `updateItemByPath`: `(data?: any, path?: string, attributeName?: string) => void` 更新路径`path`对应的节点，如果更新节点中的具体属性则需要`attributeName`参数
 - `setItemByPath`: `(data?: any, path?: string, attributeName?: string) => void` 设置路径`path`对应的节点，如果设置节点中的具体属性则需要`attributeName`参数
 - `updateNameByPath`: `(newName?: string, path: string) => void` 更新指定路径的name键
 - `delItemByPath`: `(path?: string, attributeName?: string) => void` 删除路径`path`对应的节点，如果删除节点中的具体属性则需要`attributeName`参数
 - `insertItemByIndex`: `(data: InsertItemType, index?: number, parent?: { path?: string, attributeName?: string }) => void` 根据序号和父节点路径添加选项
 - `getItemByPath`: `(path?: string, attributeName?: string) => void` 获取路径`path`对应的节点，如果是节点中的具体属性则需要`attributeName`参数
 - `moveItemByPath`: `(from: { parent?: string, index: number }, to: { parent?: string, index?: number })` 把树中的选项从一个位置调换到另外一个位置
 - `setProperties`: `(data?: Partial<FormNodeProps>) => void` 设置`properties`;

### Hooks

- `useFormRenderStore()`: 创建 `new FormRenderStore()`.
- `useFormStore(defaultValues)`: 创建 `new FormStore()`

## 其他

### properties结构说明
   `properties`属性中每一项均为一个表单节点，节点分为嵌套节点和控件节点。
- 嵌套节点:
  有`properties`属性的节点，通过`type`和`props`字段描述该节点为哪个组件，不携带表单域组件。
- 节点:
  无`properties`属性的节点，默认携带表单域组件(`Form.Item`), 提供表单域的一些功能, 默认的表单域属性继承自[react-easy-formcore](https://github.com/mezhanglei/react-easy-formcore)中的`Form.Item`的`props`.
```javascript
// name3 为嵌套节点，first和second为控件节点，有表单域属性。
const properties = {
  name3: {
    // type: '',
    // props: {},
    properties: {
      first: {
        label: 'first',
        rules: [{ required: true, message: 'first empty' }],
        type: 'Select',
        props: {
          style: { width: '100%' },
          children: [{ type: 'Select.Option', props: { key: 1, value: '1', children: 'option1' } }]
        }
      },
      second: {
        label: 'second',
        rules: [{ required: true, message: 'second empty' }],
        type: 'Select',
        props: {
          style: { width: '100%' },
          children: [{ type: 'Select.Option', props: { key: 1, value: '1', children: 'option1' } }]
        }
      }
    }
  },
}
```
- 节点的typescript类型
```javascript
// 表单内的的组件类型
export interface FormComponent {
  type?: string;
  props?: any & { children?: any | Array<FormComponent> };
}
export type UnionComponent<P> =
  | React.ComponentType<P>
  | React.ForwardRefExoticComponent<P>
  | React.FC<P>
  | keyof React.ReactHTML;
export type CustomUnionType = FormComponent | Array<FormComponent> | UnionComponent<any> | Function | ReactNode
// 表单树中节点的类型
export interface FormNodeProps extends FormItemProps, FormComponent {
  hidden?: string | boolean;
  ignore?: boolean; // 标记当前节点为非表单节点
  inside?: CustomUnionType; // 节点内层嵌套组件
  outside?: CustomUnionType; // 节点外层嵌套组件
  readOnly?: boolean; // 只读模式
  readOnlyRender?: CustomUnionType; // 只读模式下的组件
  typeRender?: CustomUnionType; // 表单控件自定义渲染
  properties?: { [name: string]: FormNodeProps } | FormNodeProps[]; // 嵌套的表单控件 为对象时表示对象嵌套，为数组类型时表示数组集合
}
```

### 参数注入
 - 表单节点的属性全局设置：
 ```javascript
 import RenderForm, { RenderFormChildren, useFormStore, Form } from "./form-render"

 const properties = {
    name3: {
      label: "name3",
      type: 'Input',
      props: {}
    },
  }
  
  const form = useFormStore();

  // 第一种方式
  <RenderForm
    options={{
      layout: 'vertical', // 节点的属性
      props: { disabled: true } // 节点中type字段渲染的组件的属性
    }}
  />
  // 第二种方式 仅仅可以设置表单域组件(Form.Item)的属性
  // <Form form={form} layout="vertical">
  //   <RenderFormChildren
  //     properties={properties1}
  //   />
  // </Form>
```

 - 表单中的组件注入的参数:
 ```javascript
export interface GeneratePrams<T = {}> {
  name?: string; // 组件所在节点的表单字段
  path?: string; // 组件所在节点的渲染路径
  parent?: { name?: string; path?: string, field?: T & GenerateFormNodeProps; }; // 组件所在父节点的信息
  field?: T & GenerateFormNodeProps; // 组件所在节点的信息
  formrender?: FormRenderStore;
  form?: FormStore;
};
```
### 表单的中涉及的path路径规则
表单允许嵌套，所以表单中会涉及寻找某个属性。其路径遵循一定的规则

举例：
- `a[0]`表示数组a下面的第一个选项
- `a.b` 表示a对象的b属性
- `a[0].b`表示数组a下面的第一个选项的b属性

### 字符串表达式用法
 表单节点中属性字段除`properties`外均可以支持字符串表达式来进行联动
 1. 快速使用：用`{{`和`}}`包裹目标属性值的计算表达式
```javascript
  const properties = {
    name1: {
      label: 'name1',
      valueProp: 'checked',
      initialValue: true,
      type: 'Checkbox',
      props: {
        children: 'option'
      }
    },
    name2: {
      label: "name2",
      rules: '{{[{ required: formvalues && formvalues.name1 === true, message: "name2 empty" }]}}',
      initialValue: 1,
      type: 'Input',
      props: {}
    },
  }

  // OR

  const properties = {
    name1: {
      label: 'name1',
      valueProp: 'checked',
      initialValue: true,
      type: 'Checkbox',
      props: {
        children: 'option'
      }
    },
    name2: {
      label: "name2",
      hidden: '{{formvalues && formvalues.name1 === true}}',
      initialValue: 1,
      type: 'Input',
      props: {}
    },
  }
```
 2. 字符串表达式的使用规则
  - 一个字符串有且只能有一对`{{`和`}}`.
  - 除了内置的三个变量(`form`(即`useFormStore()`), `formrender`(即`useFormRenderStore()`), `formvalues`(表单值对象))以外, 还可以通过`expressionImports`引入外部变量, 然后在字符串表达式内直接引用该变量名.
  - 6.2.5 版本开始, 推荐不写`$`符号. 7.x版本已移除该符号.
```javascript
 import moment from 'moment'
 import RenderForm from "./form-render"

 const properties = {
    name3: {
      label: "name3",
      initialValue: "{{moment().format('YYYY-MM-DD')}}",
      type: 'Input',
      props: {}
    },
  }
  
  <RenderForm properties={properties} expressionImports={{ moment }} />
```