# react-easy-formrender

English | [中文说明](./README_CN.md)

[![Version](https://img.shields.io/badge/version-0.2.6-green)](https://www.npmjs.com/package/react-easy-formrender)

# Introduction?

High degree of freedom and Lightweight dynamic form Engine, high-end solutions often require only simple design(which is done based on [react-easy-formcore](https://github.com/mezhanglei/react-easy-formcore) development),Two components are provided: (1) the default export component comes with a 'Form' container component for rendering (2) The exported 'renderformchildren' component does not have a 'Form' container, but only provides the rendering of form fields. You can choose according to yourself

# Default export component

- The atomic components used in the form are fully decoupled from the form Engine, and can be replaced with any ui library component or other custom component with `value` (or set via `valueProp`) and `onChange` interface props before the form is used
- Render the form through the `schema` attribute, It includes three parts： (1)the `Form` container settings, (2)the form field settings, (3) form components own `props` settings, the mental model is simple and it is easy to customize your own forms
- The properties of the form field fully support string expressions (except `component`, `readOnly`, `props`, `properties`, `render`)

# RenderFormChildren component

- Rendering a form field through the `properties` property has only two parts: (1) the property setting of the form field, (2) form components own `props` settings, the mental model is simple and it is easy to customize your own forms, Other properties are the same as the default component
```javascript
// properties
SchemaData['properties']
```

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
import RenderForm, { FormStore, Form, RenderFormChildren } from 'react-easy-formrender';
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
    store: FormStore<any>;
    constructor(props) {
        super(props);
        this.store = new FormStore();
        this.state = {
            schema: {
                className: 'form-wrapper',
                properties: {
                    name1: {
                        label: 'name1',
                        component: 'input',
                        required: true,
                        rules: [{ required: true, message: 'name1空了' }],
                        initialValue: 1111,
                        hidden: '{{$form.name4 == true}}',
                        props: {}
                    },
                    name2: {
                        label: 'list',
                        required: true,
                        rules: [{ required: true, message: 'name2空了' }],
                        properties: [{
                            component: 'select',
                            required: true,
                            hidden: '{{$form.name4 == true}}',
                            rules: [{ required: true, message: 'name2空了' }],
                            props: {
                                style: { width: '100%' },
                                children: [{ component: 'option', props: { key: 1, value: '1', children: '选项1' } }]
                            }
                        }, {
                            component: 'select',
                            required: true,
                            rules: [{ required: true, message: 'name2空了' }],
                            props: {
                                style: { width: '100%' },
                                children: [{ component: 'option', props: { key: 1, value: '1', children: '选项1' } }]
                            }
                        }]
                    },
                    name3: {
                        properties: {
                            first: {
                                label: 'name3',
                                required: true,
                                rules: [{ required: true, message: 'name2空了' }],
                                component: 'select',
                                props: {
                                    style: { width: '100%' },
                                    children: [{ component: 'option', props: { key: 1, value: '1', children: '选项1' } }]
                                }
                            }
                        }
                    },
                    name4: {
                        label: 'name4',
                        component: 'Checkbox',
                        required: true,
                        valueProp: 'checked',
                        initialValue: true,
                        rules: [{ required: true, message: 'name3空了' }],
                        props: {
                            style: { width: '100%' },
                            children: 'hidden or show'
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
                    <RenderFormChildren watch={watch} widgets={defaultWidgets} properties={this.state.schema?.properties} />
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
interface SchemaData extends FormProps {
    properties: { [key: string]: FormFieldProps }
}
```
- watch：can listen to changes in the value of any field, for example:
```javascript

// 声明式传值
const watch = {
  'name1': (newValue, oldValue) => {
    // console.log(newValue, oldValue)
  },
  'name2.0': (newValue, oldValue) => {
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
- widgets：register components for form to use
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

### Form field settings
1. Properties of form field controls, allowing nesting and array management, where `FormItemProps` are derived from the `props` of the `Form.Item` or `Form.List` components in [react-easy-formcore](https://github.com/mezhanglei/react-easy-formcore).
2. The properties of the form field fully support string expressions (except `component`, `readOnly`, `props`, `properties`, `render`), for example `hidden` fields show hidden logic, `{{$form.xxx === xxx}}` means that a field value of the form is equal to a value, where `$form` represents the form value object

```javascript
interface FormFieldProps extends FormItemProps {
    component: string // form component，and properties properties cannot co-exist and string expressions are not supported
    readOnly?: boolean // readOnly mode  ，string expressions are not supported
    render?: any // Non-form controls, which override form component in readOnly，string expressions are not supported
    props?: { children?: JSX.Element | ChildrenComponent[], [key: string]: any } // The form component's own props property，string expressions are not supported
    hidden?: string | boolean // Show-hidden logic, supporting `boolean` types and support string expressions
    properties?: { [name: string]: FormFieldProps } | FormFieldProps[] // Nested form controls Nested objects when they are objects, or arrays of controls when they are arrays，string expressions are not supported
}
```

### Form component's own props setting

```javascript
// component props
interface Props {
    children?: JSX.Element | ChildrenComponent[],
    [key: string]: any
}
// component's children。The types are `JSX.Element | ChildrenComponent[]`, which also support nesting
interface ChildrenComponent {
    component: string, // children component
    props: Props // children props
}
```

### rules
The `rules` rules in the form control are derived from the `rules` property in [react-easy-formcore](https://github.com/mezhanglei/react-easy-formcore)。