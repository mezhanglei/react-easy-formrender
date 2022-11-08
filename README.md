# react-easy-formrender

English | [中文说明](./README_CN.md)

[![Version](https://img.shields.io/badge/version-6.0.1-green)](https://www.npmjs.com/package/react-easy-formrender)

# Introduction?

High degree of freedom and Lightweight dynamic form Engine, high-end solutions often require only simple design(which is done based on [react-easy-formcore](https://github.com/mezhanglei/react-easy-formcore) development).

- Component structure: default export component = combination of `Form` component and `RenderFormChildren` (`Form` component is responsible for the form values, `RenderFormChildren` component is responsible for the rendering of the form)
- Component description: `properties` as properties for rendering forms, support for arrays, objects, nesting
- Component rendering: a `Form` component can wrap multiple `RenderFormChildren` components

# version log
- v6.x
  6.x has two major updates from v5.x.
  - The component is split into `Form` and `RenderFormChildren` components, the `Form` component handles the form values, the `RenderFormChildren` renders the form based on the information provided, a `Form` component can wrap multiple `RenderFormChildren` components, if multiple ` RenderFormChildren` components have the same properties as each other, the later will override the previous
  - ~~`schema`~~ properties are flattened, so you need to use `properties` to render the form instead, and ~~`onSchemaChange`~~ needs to be replaced with `onPropertiesChange`
- v5.x:
  This update completes the decoupling of the form display component from the form value related logic. basic version.
  - The underlying library `react-easy-formcore` is updated, you need to remove the old package and install the new version
  - ~~`readOnlyItem` is deprecated~~, only `readOnlyRender` is kept
  - 5.1.0 `store.swapItemByPath` => `store.moveItemByPath`
  - 5.2.x Remove the old package and install the new version again, changed the second parameter of `store.addItemByIndex`, `store.addAfterByPath` and `store.addBeforeByPath`.
- v4.x:
  v4.x and previous versions mostly adjust some method naming and parameter passing changes.
  - Deprecate fixed container properties ~~`col`~~ and ~~`customInner`~~, add custom containers `inside` and `outside`;
  - ~~`widgets`~~ to `controls`, ~~`widget`~~ and ~~`widgetProps`~~ to `type` and `props`;
  - ~~`readOnlyWidget` to `readOnlyItem`;~~
  - Add registration for non-form controls: `components`;
- v3.1.x:
  - Adjust the `layout` property of form fields, add `inline`, `labelWidth` properties
  - ~~Adjust `onPropertiesChange` of default export component to `onSchemaChange`~~
  - ~~Adjust `customChild` to `customInner`~~
- v3.0.x:
  - String expressions representing form values changed from ~~`$form`~~ to `$formvalues`.
  - Add `$store` to the string expression to represent an instance of `FormRenderStore`, which can get the form related methods and data.
  - If you need to introduce a built-in component (add/remove buttons for lists), you need to `import 'react-easy-formrender/lib/css/main.css'`.
- v2.x:
  - ~~remove the `dependencies` property~~ and instead inject the form values `formvalues` to the widget component automatically.
  - ~~change api of `RenderFormChildren` component~~
- v1.x:
  - Change the method of the form control
  - ~~Change `component` and `props` in schema to `widget` and `widgetProps`~~
  - ~~change `render` in schema to `readOnlyWidget` and `readOnlyRender`~~
  - Version matching react-easy-formcore version 1.1.x or higher

## install

```bash
npm install react-easy-formrender --save
# 或者
yarn add react-easy-formrender
```

## example

### 1.First register the basic components(Take the `antd@4.20.2` UI library as an example)
```javascript
// register
import RenderFormDefault, { RenderFormChildren as RenderFormChilds, RenderFormChildrenProps, RenderFormProps } from 'react-easy-formrender';
import React from 'react';
import { Input, InputNumber, Checkbox, DatePicker, Mentions, Radio, Rate, Select, Slider, Switch, TimePicker } from 'antd';
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
### 2.import registered components
```javascript
import { Button } from 'antd';
import React, { useState } from 'react';
import RenderForm, { useFormStore } from './form-render';
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
    })

  const form = useFormStore();

  const onSubmit = async (e) => {
    e?.preventDefault?.();
    const result = await form.validate();
    console.log(result, 'result');
  };

  return (
    <div>
      <RenderForm form={form} properties={properties} watch={watch} />
      <div style={{ marginLeft: '120px' }}>
        <Button onClick={onSubmit}>submit</Button>
      </div>
    </div>
  );
}
```

### multiple RenderFormChildren demo
  The form engine also supports multiple `RenderFormChildren` components to render and then the `Form` component to handle the form values in a unified manner.
 - `useFormStore` hook: hook to provide a class for form value processing.
 - `useFormRenderStore` hook: hook to provide a class for form rendering, provided by the default component itself, or passed in by external props.
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
      hidden: '{{$formvalues.name6 == true}}',
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
      hidden: '{{$formvalues.name6 == true}}',
      type: 'Input',
      props: {}
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
    <div style={{ padding: '0 8px' }}>
      <Form store={form}>
        <div>
          <p>part1</p>
          <RenderFormChildren properties={properties1} watch={watch} />
        </div>
        <div>
          <p>part2</p>
          <RenderFormChildren properties={properties2} watch={watch} />
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

### Path rules involved in the form
Forms are allowed to be nested, so they will involve finding a certain property. The paths follow certain rules

for Example:
- `a[0]` means the first option under the array `a`
- `a[0]b` or `a[0].b` means the `b` attribute of the first option under the array `a`

### Form Component
来源于[react-easy-formcore](https://github.com/mezhanglei/react-easy-formcore)

### RenderFormChildren's props
- `properties`: `{ [name: string]: FormFieldProps } | FormFieldProps[]` Rendering json data in the form of a DSL for a form.
- `watch`：can listen to changes in the value of any field, for example:
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
      immediate: true
  }
  ...
  <RenderForm watch={watch} />
}
```
- `controls`：register form field's control to use.
- `components`：register other component for form to use.
- `renderList`: function that provides custom rendering List.
- `renderItem`: function that provides custom render field item.
- `onPropertiesChange`: `(newValue: ProertiesData) => void;` Callback function when `properties` is changed
- `store`: The form class responsible for rendering. Created with `useFormRenderStore()`.

### FormFieldProps
Used to describe a form field
1. Properties of form field controls, allowing nesting and array management, where `FormItemProps` are derived from the `props` of the `Form.Item` or `Form.List` components in [react-easy-formcore](https://github.com/mezhanglei/react-easy-formcore).
2. The simple type attribute of the form field fully supports string expressions. for example `hidden: {{$formvalues.xxx === xxx}}` means that a field value of the form is equal to a value, where `$formvalues` represents the form value object
The full props are as follows：
```javascript
export interface BaseFieldProps extends FormItemProps, FormComponent {
  ignore?: boolean; // ignore current form field
  fieldComponent?: FieldUnionType; // field display component
  inside?: FieldUnionType; // Form field component inner nested components
  outside?: FieldUnionType; // Form field component outside nested components
  readOnly?: boolean; // readonly？
  readOnlyRender?: FieldUnionType | ReactNode; // readonly display component
  typeRender?: any; // form field's control render
  valueGetter?: string | ((...args: any[]) => any); // output getter
  valueSetter?: string | ((value: any) => any); // input setter
  properties?: { [name: string]: FormFieldProps } | FormFieldProps[]; // Nested form controls Nested objects when they are objects, or collections of arrays when they are array types
}
```

### Description of the components used in the form
  The container components, form controls and buttons used in the form are uniformly described in the same structure.
```javascript
interface FormComponent {
  type?: string;
  props?: {
    [key: string]: any;
    children?: any | Array<FormComponent>
  };
  hidden?: string | boolean;
}
```

### rules
The `rules` rules in the form control are derived from the `rules` property in [react-easy-formcore](https://github.com/mezhanglei/react-easy-formcore)。

### FormRenderStore Methods
  Only responsible for the rendering of the form
 - `updateItemByPath`: `(path: string, data?: Partial<FormFieldProps>) => void` Update the information corresponding to `path` in properties.
 - `setItemByPath`: `(path: string, data?: Partial<FormFieldProps>) => void` Override set the information corresponding to `path` in properties.
 - `updateNameByPath`: `(path: string, newName?: string) => void` Update the name key of the path.
 - `delItemByPath`: `(path: string) => void` delete the information corresponding to `path` in properties.
 - `addItemByIndex`: `(data: FormFieldProps | FormFieldProps[], index?: number, parent?: string) => void` Add item based on `index` and `parent`.
 - `addAfterByPath`: `(data: FormFieldProps | FormFieldProps[], path: string) => void` Add item after `path`
 - `addBeforeByPath`: `(data: FormFieldProps | FormFieldProps[], path: string) => void` add item before `path`
 - `getItemByPath`: `(path: string) => void` get the information corresponding to `path` in properties.
 - `moveItemByPath`: `(from: { parent?: string, index: number }, to: { parent?: string, index?: number })` move option in the tree from one position to another
 - `setProperties`: `(data?: Partial<FormFieldProps>) => void` set the `properties`.

### Hooks

- `useFormRenderStore()` create FormRenderStore by hook。
- `useFormStore(defaultValues)` create FormStore by hook。