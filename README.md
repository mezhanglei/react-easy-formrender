# react-easy-formrender

English | [中文说明](./README_CN.md)

[![Version](https://img.shields.io/badge/version-5.2.2-green)](https://www.npmjs.com/package/react-easy-formrender)

# Introduction?

High degree of freedom and Lightweight dynamic form Engine, high-end solutions often require only simple design(which is done based on [react-easy-formcore](https://github.com/mezhanglei/react-easy-formcore) development).

# version log
- v5.x:
  - The underlying library `react-easy-formcore` is updated, you need to remove the old package and install the new version again
  - `readOnlyItem` is deprecated, only `readOnlyRender` remains
  - 5.1.0 `store.swapItemByPath` => `store.moveItemByPath`
- v4.x:
  - Major update to deprecate fixed container properties `col` and `customInner` and add custom containers `inside` and `outside`;
  - `widgets` change to `controls`, `widget` and `widgetProps` change to `type` and `props`;
  - ~~`readOnlyWidget` change to `readOnlyItem`;~~
  - add `components` to register other;
- v3.1.x:
  - Adjusted the `layout` property of the form field to add `inline`, `labelWidth` properties
  - Changed `onPropertiesChange` to `onSchemaChange` for the default export component
  - ~~Changed `customChild` to `customInner`~~
- v3.0.x:
  - String expression for form values changed from `$form` to `$formvalues`.
  - Added `$store` to string expression to represent an instance of `FormRenderStore`, which can retrieve the form's associated methods and data.
  - If you need to introduce a built-in component (the add/drop button for a list), you need to `import 'react-easy-formrender/lib/css/main.css'`.
- v2.x:
  - Remove the `dependencies` property and replace it with `formvalues` that are automatically injected into the widget component.
  - ~~Changing the api of the `RenderFormChildren` component~~
  - Change the Methods of `FormRenderStore`.
- v1.x:
   - FormRenderStore Methods changed
   - `onValuesChange` optimise
   - ~~Change `component` and `props` to `widget` and `widgetProps` in schema~~
   - ~~Change `render` in schema to `readOnlyWidget` and `readOnlyRender`~~
   - Version matches version 1.1.x of react-easy-formcore

# Default export component

- The atomic components used in the form are fully decoupled from the form Engine, and can be replaced with any ui library component or other custom component with `value` (or set via `valueProp`) and `onChange` interface props before the form is used
- Render the form through the `schema` attribute, It includes three parts: 1. the props of the outermost form container.2.the `FormFieldProps` corresponding to the fields are used to describe the properties of the form field. 3. `props` in FormFieldProps is used to describe the `controls` component
- String expressions are fully supported for simple types of property fields in `schema`

# Path rules involved in the form
Forms are allowed to be nested, so they will involve finding a certain property. The paths follow certain rules

for Example:
- `a[0]` means the first option under the array `a`
- `a[0]b` or `a[0].b` means the `b` attribute of the first option under the array `a`

## install

```bash
npm install react-easy-formrender --save
# 或者
yarn add react-easy-formrender
```

## example

1. First register the basic components(Take the `antd@4.20.2` UI library as an example)
```javascript
// register
import RenderBaseForm, { RenderFormProps } from 'react-easy-formrender';
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

export default function FormRender(props: RenderFormProps) {
  return (
    <RenderBaseForm {...props} controls={{ ...AntdBaseControls, ...props?.controls }} />
  );
}
```
2. import registered components
```javascript
import { Button } from 'antd';
import React, { useState } from 'react';
import RenderForm, {Form, useFormRenderStore } from './form-render';
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
        label: "数组",
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
        label: 'name4',
        required: true,
        // outside: { type: 'col', props: { span: 6 } },
        properties: {
          first: {
            rules: [{ required: true, message: 'first空了' }],
            type: 'Select',
            props: {
              style: { width: '100%' },
              children: [{ type: 'Select.Option', props: { key: 1, value: '1', children: '选项1' } }]
            }
          },
          second: {
            rules: [{ required: true, message: 'second空了' }],
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
        rules: [{ required: true, message: 'name6空了' }],
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

### Form Component Props
- base Attributes：from `Form Props` in [react-easy-formcore](https://github.com/mezhanglei/react-easy-formcore)
- `schema`: Rendering json data in the form of a DSL for a form.
```javascript
export interface SchemaData extends FormProps<FormRenderStore> {
  properties: { [key: string]: FormFieldProps } | FormFieldProps[]
}
```
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
- `inside`: the container of form children.
- `onSchemaChange`: `(newValue: SchemaData) => void;` Callback function when `schema` is changed

### FormFieldProps
1. Properties of form field controls, allowing nesting and array management, where `FormItemProps` are derived from the `props` of the `Form.Item` or `Form.List` components in [react-easy-formcore](https://github.com/mezhanglei/react-easy-formcore).
2. The simple type attribute of the form field fully supports string expressions. for example `hidden: {{$formvalues.xxx === xxx}}` means that a field value of the form is equal to a value, where `$formvalues` represents the form value object
The full props are as follows：
```javascript
export interface BaseFieldProps extends SchemaComponent {
  ignore?: boolean; // ignore current form field
  fieldComponent?: FieldUnionType; // field display component
  inside?: FieldUnionType; // Form field component inner nested components
  outside?: FieldUnionType; // Form field component outside nested components
  readOnly?: boolean; // readonly？
  readOnlyRender?: FieldUnionType | ReactNode; // readonly display component
  typeRender?: any; // form field's control render
}

export interface FormFieldProps extends FormItemProps, BaseFieldProps {
  valueGetter?: string | ((...args: any[]) => any); // output getter
  valueSetter?: string | ((value: any) => any); // input setter
  properties?: { [name: string]: FormFieldProps } | FormFieldProps[]; // Nested form controls Nested objects when they are objects, or collections of arrays when they are array types
}
```

### Description of the components used in the form
  The container components, form controls and buttons used in the form are uniformly described in the same structure.
```javascript
interface SchemaComponent {
  type?: string;
  props?: {
    [key: string]: any;
    children?: any | Array<SchemaComponent>
  };
  hidden?: string | boolean;
}
```

### rules
The `rules` rules in the form control are derived from the `rules` property in [react-easy-formcore](https://github.com/mezhanglei/react-easy-formcore)。

### FormRenderStore Methods
  There are two parts: methods for rendering forms and form's values
1. Methods for rendering forms.
 - `updateItemByPath`: `(path: string, data?: Partial<FormFieldProps>) => void` Update the information corresponding to `path` in schema.
 - `setItemByPath`: `(path: string, data?: Partial<FormFieldProps>) => void` Override set the information corresponding to `path` in schema.
 - `updateNameByPath`: `(path: string, newName?: string) => void` Update the name key of the path.
 - `delItemByPath`: `(path: string) => void` delete the information corresponding to `path` in schema.
 - `addItemByIndex`: `(data: FormFieldProps | FormFieldProps[], index?: number, parent?: string) => void` Add item based on `index` and `parent`.
 - `addAfterByPath`: `(data: FormFieldProps | FormFieldProps[], path: string) => void` Add item after `path`
 - `addBeforeByPath`: `(data: FormFieldProps | FormFieldProps[], path: string) => void` add item before `path`
 - `getItemByPath`: `(path: string) => void` get the information corresponding to `path` in schema.
 - `moveItemByPath`: `(from: { parent?: string, index: number }, to: { parent?: string, index?: number })` move option in the tree from one position to another
 - `setProperties`: `(data?: Partial<FormFieldProps>) => void` set the `properties`.
2. form's values
  Inherits the `FormStore Methods` properties and methods from [react-easy-formcore](https://github.com/mezhanglei/react-easy-formcore)

### Hooks

- `useFormRenderStore(defaultValues)` create FormRenderStore by hook。