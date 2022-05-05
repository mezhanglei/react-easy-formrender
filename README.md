# react-easy-formrender

English | [中文说明](./README_CN.md)

[![Version](https://img.shields.io/badge/version-1.0.0-green)](https://www.npmjs.com/package/react-easy-formrender)

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

## base

```javascript
import React from 'react';
import "./index.less";
import RenderForm, { Form, FormRenderStore, RenderFormChildren }  from 'react-easy-formrender';
import { Button, Checkbox, Input, Radio, Select } from 'antd';

// register components
export const defaultWidgets: { [key: string]: any } = {
    input: Input,
    select: Select,
    radioGroup: Radio.Group,
    radio: Radio,
    option: Select.Option,
    Checkbox: Checkbox
};

class demo extends React.Component {
    store: FormRenderStore<any>;
    constructor(props) {
      super(props);
      this.store = new FormRenderStore();
      this.state = {
      schema: {
        title: '1111',
        className: 'form-wrapper',
        properties: {
          name1: {
            label: "name1",
            widget: 'input',
            required: true,
            readOnly: true,
            readOnlyRender: 1111,
            rules: [{ required: true, message: 'name1空了' }],
            initialValue: 1111,
            // labelAlign: 'vertical',
            col: { span: 6 },
            hidden: '{{$form.name4 == true}}',
            widgetProps: {}
          },
          name2: {
            label: "name2",
            required: true,
            rules: [{ required: true, message: 'name2空了' }],
            col: { span: 6 },
            properties: [{
              widget: 'select',
              required: true,
              rules: [{ required: true, message: 'name2空了' }],
              initialValue: { label: '选项1', value: '1', key: '1' },
              widgetProps: {
                labelInValue: true,
                style: { width: '100%' },
                children: [{ widget: 'option', widgetProps: { key: 1, value: '1', children: '选项1' } }, { widget: 'option', widgetProps: { key: 2, value: '2', children: '选项2' } }]
              }
            }, {
              widget: 'select',
              required: true,
              rules: [{ required: true, message: 'name2空了' }],
              widgetProps: {
                labelInValue: true,
                style: { width: '100%' },
                children: [{ widget: 'option', widgetProps: { key: 1, value: '1', children: '选项1' } }]
              }
            }]
          },
          name3: {
            label: 'name3',
            required: true,
            col: { span: 6 },
            properties: {
              first: {
                rules: [{ required: true, message: 'name3空了' }],
                widget: 'select',
                widgetProps: {
                  style: { width: '100%' },
                  children: [{ widget: 'option', widgetProps: { key: 1, value: '1', children: '选项1' } }]
                }
              },
              second: {
                rules: [{ required: true, message: 'name3空了' }],
                widget: 'select',
                widgetProps: {
                  style: { width: '100%' },
                  children: [{ widget: 'option', widgetProps: { key: 1, value: '1', children: '选项1' } }]
                }
              }
            }
          },
          name4: {
            label: 'name4',
            widget: 'Checkbox',
            required: true,
            valueProp: 'checked',
            col: { span: 6 },
            initialValue: true,
            rules: [{ required: true, message: 'name3空了' }],
            widgetProps: {
              style: { width: '100%' },
              children: '多选框'
            }
          }
        }
      }
    };
  }

    onSubmit = async (e) => {
        e.preventDefault();
        const { error, values } = await this.store.validate();
        console.log(error, values);
    };

    render() {
        return (
            <div>
               {/* <Form store={this.store}>
                    <RenderFormChildren watch={watch} widgets={defaultWidgets} propertiesName="default" properties={this.state.schema?.properties} />
                   </Form> */}
                <RenderForm widgets={defaultWidgets} store={this.store} schema={this.state.schema} />
                <div style={{ marginLeft: '140px' }}>
                    <Button onClick={this.onSubmit}>submit</Button>
                </div>
            </div>
        );
    }
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