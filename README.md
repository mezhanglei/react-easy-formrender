# react-easy-formrender

English | [中文说明](./README_CN.md)

[![Version](https://img.shields.io/badge/version-0.2.0-green)](https://www.npmjs.com/package/react-easy-formrender)

# Introduction?

High degree of freedom and Lightweight dynamic form Engine, high-end solutions often require only simple design(which is done based on [react-easy-formcore](https://github.com/mezhanglei/react-easy-formcore) development)

# features

- [x] The atomic components used in the form are fully decoupled from the form Engine, and can be replaced with any ui library component or other custom component with `value` (or set via `valueProp`) and `onChange` interface props before the form is used
- [x] The `schema` consists of three parts： the `Form` container settings, the form field settings, and form components own `props` settings, the mental model is simple and it is easy to customize your own forms
- [x] The properties of the form field fully support string expressions (except `component`, `readOnly`, `props`, `properties`, `render`)

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
import RenderFrom, { FormStore } from 'react-easy-formrender';
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
                <RenderFrom widgets={defaultWidgets} store={this.store} schema={this.state.schema} />
                <div style={{ marginLeft: '140px' }}>
                    <Button onClick={this.onSubmit}>submit</Button>
                </div>
            </div>
        );
    }
}
```

### Listening for form values
watch attribute: can listen to changes in the value of any field, for example:
```javascript
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
      immediate: true // Immediately
  }
  ...
  <RenderFrom watch={watch} />
}
```

### Form settings
- base Attributes：The `FormProps` type is derived from `Form Props` in [react-easy-formcore](https://github.com/mezhanglei/react-easy-formcore)
- `properties`: `{name: FormFieldProps, ...}` `name` is the field name of the control, `FormFieldProps` is the form field setting
```javascript
interface SchemaData extends FormProps {
    properties: { [key: string]: FormFieldProps }
}
```

### Form field settings
1. Properties of form field controls, allowing nesting and array management, where `FormItemProps` are derived from the `props` of the `Form.Item` or `Form.List` components in [react-easy-formcore](https://github.com/mezhanglei/react-easy-formcore).
2. The properties of the form field fully support string expressions (except `component`, `readOnly`, `props`, `properties`, `render`), for example `hidden` fields show hidden logic, `{{$form.field path === a value}}` means that a field value of the form is equal to a value, where `$form` represents the form value object

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