# react-easy-formrender

English | [中文说明](./README_CN.md)

[![Version](https://img.shields.io/badge/version-0.0.2-green)](https://www.npmjs.com/package/react-easy-formrender)

# Introduction?

High degree of freedom and Lightweight dynamic form solutions, high-end solutions often require only simple design(which is done based on [react-easy-formcore](https://github.com/mezhanglei/react-easy-formcore) development)

# features

- [x] The atomic components used in the form are fully decoupled from the form library, and can be replaced with any ui library component or other custom component with `value` (or set via `valueProp`) and `onChange` interface props before the form is used
- [x] The `schema` consists of three parts, the `Form` container settings, the field corresponding to the form control settings, and the control's own `props` settings, the mental model is simple and it is easy to customize your own forms

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
import RenderFrom, { FormStore } from '../../../src/index';
import { Button, Checkbox, Input, Radio, Select } from 'antd';

// registter components
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
                        decorator: 'Form.List',
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

### Form settings
- base Attributes：The `FormProps` type is derived from `Form Props` in [react-easy-formcore](https://github.com/mezhanglei/react-easy-formcore)
- `properties`: `{name: FormFieldProps, ...}` `name` is the field name of the control, `FormFieldProps` is the control setting
```javascript
interface SchemaData extends FormProps {
    properties: { [key: string]: FormFieldProps }
}
```

### Form field settings
Properties of form field controls, allowing nesting and array management, where `FormItemProps` are derived from the `props` of the `Form.Item` or `Form.List` components in [react-easy-formcore](https://github.com/mezhanglei/react-easy-formcore).
```javascript
interface FormFieldProps extends FormItemProps {
    decorator?: 'Form.Item' | 'Form.List' // Form field component, when set to `Form.List` means array, you need to set `properties` to hold the array of controls, type is array type
    component: string // form component
    props?: { children?: JSX.Element | ChildrenComponent[], [key: string]: any } // The form component's own props property
    hidden?: string | boolean // Show-hidden logic, supporting `boolean` types and string expressions (e.g. `{{path === value}}`, controlling whether the field is shown or hidden based on the result of the expression, $form is formvalues)
    properties?: { [name: string]: FormFieldProps } | FormFieldProps[] // Nested form controls Nested objects when they are objects, or arrays of controls when they are arrays
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