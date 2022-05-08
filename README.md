# react-easy-formrender

English | [中文说明](./README_CN.md)

[![Version](https://img.shields.io/badge/version-1.0.1-green)](https://www.npmjs.com/package/react-easy-formrender)

# Introduction?

High degree of freedom and Lightweight dynamic form Engine, high-end solutions often require only simple design(which is done based on [react-easy-formcore](https://github.com/mezhanglei/react-easy-formcore) development),Two components are provided: (1) the default export component comes with a 'Form' container component for rendering, is Full form component (2) The exported `RenderFormChildren` component does not have a `Form` container, but only provides the rendering of form fields. need to be used with the `Form` container component to have full form functionality.

# version log
- v1.0.0:
   - Change `component` and `props` to `widget` and `widgetProps` in schema
   - Change `render` in schema to `readOnlyWidget` and `readOnlyRender`
   - Version matches version 1.1.x of react-easy-formcore

# Default export component

- The atomic components used in the form are fully decoupled from the form Engine, and can be replaced with any ui library component or other custom component with `value` (or set via `valueProp`) and `onChange` interface props before the form is used
- Render the form through the `schema` attribute, It includes three parts： (1)the `Form` container settings, (2)the form field settings, (3) form components own `widgetProps` settings, the mental model is simple and it is easy to customize your own forms
- String expressions are fully supported for simple types of property fields in `schema`

# RenderFormChildren component

- Rendering a form field through the `properties` property has only two parts: (1) the property setting of the form field, (2) form components own `widgetProps` settings.
- More than one of these components may be used, and the `propertiesName` property tag must be set.Default name `default`

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

export const AntdBaseWidgets = {
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
    <RenderBaseForm {...props} widgets={{ ...AntdBaseWidgets, ...props?.widgets }} />
  );
}
```
2. import registered components
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
        hidden: '{{$form.name5 == true}}',
        widgetProps: {}
      },
      name2: {
        label: "输入框",
        widget: 'Input',
        required: true,
        // col: { span: 6 },
        rules: [{ required: true, message: 'name1空了' }],
        initialValue: 1,
        hidden: '{{$form.name5 == true}}',
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
        label: 'name4',
        widget: 'Checkbox',
        required: true,
        valueProp: 'checked',
        // col: { span: 6 },
        initialValue: true,
        rules: [{ required: true, message: 'name3空了' }],
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

### Form Component Props
- base Attributes：from `Form Props` in [react-easy-formcore](https://github.com/mezhanglei/react-easy-formcore)
- shema: form render data
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
- `widgets`：register components for form to use
```javascript
import { Button, Checkbox, Input, Radio, Select } from 'antd';

  ...

// register components
const defaultWidgets: { [key: string]: any } = {
    input: Input,
    select: Select,
    radioGroup: Radio.Group,
    radio: Radio,
    option: Select.Option,
    Checkbox: Checkbox
};

  ...
  
  <RenderForm widgets={defaultWidgets} />
}
```
- `onPropertiesChange`: `(propertiesName: string, newProperties: SchemaData['properties'])=>void` Callback function when `properties` of `schema` is changed

### Form field settings
1. Properties of form field controls, allowing nesting and array management, where `FormItemProps` are derived from the `props` of the `Form.Item` or `Form.List` components in [react-easy-formcore](https://github.com/mezhanglei/react-easy-formcore).
2. The simple type attribute of the form field fully supports string expressions. for example `hidden: {{$form.xxx === xxx}}` means that a field value of the form is equal to a value, where `$form` represents the form value object

```javascript
export interface FormFieldProps extends FormItemProps {
  readOnly?: boolean;
  readOnlyWidget?: string; // Only one of the components in read-only mode, need register in `widgets`,and readOnlyRender, can be active, with readOnlyRender having the highest priority.
  readOnlyRender?: any; // Only one of the components in read-only mode, and readOnlyWidget, can be active, with readOnlyRender having the highest priority.
  widget?: string; // The string represented by the form control, and the properties property cannot both exist
  widgetProps?: { children?: JSX.Element | Array<{ widget: string, widgetProps: FormFieldProps['widgetProps'] }>, [key: string]: any }; // widget props
  hidden?: string | boolean; // show or hidden
  properties?: { [name: string]: FormFieldProps } | FormFieldProps[]; // Nested form controls Nested objects when they are objects, or collections of arrays when they are array types
}
```

### widget's own props setting

```javascript
interface widgetProps?: { 
  children?: JSX.Element |
  Array<{ widget: string, widgetProps: FormFieldProps['widgetProps'] }>, [key: string]: any };
}
```

### rules
The `rules` rules in the form control are derived from the `rules` property in [react-easy-formcore](https://github.com/mezhanglei/react-easy-formcore)。

### FormRenderStore Methods
  There are two parts: methods for rendering forms and methods for form controls
1. Methods for rendering forms. (Example of the path rule: `a.b[0]`, representing the 0th item of the b array of properties under the a property)
 - updatePropertiesByPath: `(path: string, data?: Partial<FormFieldProps>, propertiesName = "default") => void` updates the `propertiesName` of the specified `propertiesName` according to the path path properties`;
 - setPropertiesByPath: `(path: string, data?: Partial<FormFieldProps>, propertiesName = "default") => void` Override the ` properties` of the specified `propertiesName` according to the path path. properties`. 2;
2. Methods for form controls
  Inherits the `FormStore Methods` properties and methods from [react-easy-formcore](https://github.com/mezhanglei/react-easy-formcore)

Translated with www.DeepL.com/Translator (free version)

### Hooks

- `useFormRenderStore(defaultValues)` create FormRenderStore by hook。