# react-easy-formrender

[English](./README.md) | 中文说明

[![Version](https://img.shields.io/badge/version-0.1.0-green)](https://www.npmjs.com/package/react-easy-formrender)

# 适用场景

高自由度、轻量级动态表单解决方案，高端的方案往往只需要简单的设计(该方案基于[react-easy-formcore](https://github.com/mezhanglei/react-easy-formcore)开发完成)

# features

- [x] 表单中用的原子组件和表单库完全解耦，在使用表单前可以更换为任意具有`value`(或通过`valueProp`设置)和`onChange`接口props的ui库组件或自定义的其他组件
- [x] `schema`包括三个部分，`Form`容器设置，字段对应的表单控件设置，以及控件自身的`props`设置，心智模型简单，很轻松定制属于自己的表单

# Matters
注意：在使用之前需要先引入css样式文件，例：`import 'react-easy-formrender/css/main.css'`;

## 安装

```bash
npm install react-easy-formrender --save
# 或者
yarn add react-easy-formrender
```

## 基本使用

```javascript
import React from 'react';
import "./index.less";
import RenderFrom, { FormStore } from '../../../src/index';
import { Button, Checkbox, Input, Radio, Select } from 'antd';
import 'react-easy-formrender/css/main.css';

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

### Form容器设置
- 基础属性：`FormProps`类型来自[react-easy-formcore](https://github.com/mezhanglei/react-easy-formcore)中的`Form Props`.
- `properties`: `{name: FormFieldProps, ...}` `name`为控件字段名，`FormFieldProps`为控件设置
```javascript
interface SchemaData extends FormProps {
    properties: { [key: string]: FormFieldProps }
}
```

### 表单域控件设置
表单域控件的属性，可以实现嵌套和数组管理，其中的`FormItemProps`来自[react-easy-formcore](https://github.com/mezhanglei/react-easy-formcore)中的`Form.Item`或`Form.List`组件的`props`。
```javascript
interface FormFieldProps extends FormItemProps {
    component: string // 表单控件代表的字符串
    render?: any // 非表单控件，会覆盖表单控件(component等属性)
    props?: { children?: JSX.Element | ChildrenComponent[], [key: string]: any } // 表单控件自有的props属性
    hidden?: string | boolean // 显示隐藏的逻辑，支持`boolean`类型和字符串表达式(如`{{$form.字段路径 === 某个值}}`,根据表达式结果控制该字段显示或者隐藏, $form表示表单值的对象)
    properties?: { [name: string]: FormFieldProps } | FormFieldProps[] // 嵌套的表单控件 为对象时表示对象嵌套，为数组类型时表示数组集合
}
```

### 表单控件自身的`props`设置

```javascript
// 控件自有props设置
interface Props { 
    children?: JSX.Element | ChildrenComponent[],
    [key: string]: any
}
// 表单控件自己的`children`。类型有`JSX.Element | ChildrenComponent[]`,同样支持嵌套
interface ChildrenComponent {
    component: string, // children组件代表的字符串
    props: Props // children组件自有的props属性
}
```

### rules
表单控件中的`rules`规则来自于[react-easy-formcore](https://github.com/mezhanglei/react-easy-formcore)中的`rules`属性。