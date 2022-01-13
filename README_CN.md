# react-easy-formrender

[English](./README.md) | 中文说明

[![Version](https://img.shields.io/badge/version-0.2.1-green)](https://www.npmjs.com/package/react-easy-formrender)

# 适用场景

高自由度、轻量级动态表单引擎，高端的方案往往只需要简单的设计(该方案基于[react-easy-formcore](https://github.com/mezhanglei/react-easy-formcore)开发完成)

# features

- [x] 原子组件和表单引擎完全解耦，在使用表单前可以更换为任意具有`value`(或通过`valueProp`设置)和`onChange`接口`props`的ui库控件或自定义的其他控件
- [x] `schema`包括三个部分：`Form`容器属性设置，表单域的属性设置，以及表单域内的控件自身的`props`设置，心智模型简单，很轻松定制属于自己的表单。
- [x] `schema`中关于表单域的属性字段已全面支持字符串表达式（除了`component`,`readOnly`,`props`,`properties`,`render`）

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

### 表单容器的props
- 基础属性：来自[react-easy-formcore](https://github.com/mezhanglei/react-easy-formcore)中的`Form Props`.
- watch属性：可以监听任意字段的值的变化，例如：
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
      immediate: true // 立即监听
  }
  ...
  <RenderFrom watch={watch} />
}

....

// schema方式传值
interface SchemaData extends FormProps {
    properties: { [key: string]: FormFieldProps }
}
```

### 表单域属性设置
1. 表单域的属性，可以实现嵌套和数组管理，其中的`FormItemProps`来自[react-easy-formcore](https://github.com/mezhanglei/react-easy-formcore)中的`Form.Item`或`Form.List`组件的`props`。
2. 表单域的属性全面支持字符串表达式（除了`component`,`readOnly`,`props`,`properties`,`render`），例如`hidden`字段显示隐藏的逻辑，`{{$form.字段路径 === 某个值}}`表示表单的某个字段值等于某个值时隐藏，其中`$form`表示表单值对象
```javascript
interface FormFieldProps extends FormItemProps {
    component: string // 表单控件代表的字符串，和properties属性不能同时存在，不支持字符串表达式
    readOnly?: boolean | string // 是否为只读模式, 不支持字符串表达式
    render?: any // 非表单控件, 在readOnly只读模式下才会覆盖表单控件，不支持字符串表达式
    props?: { children?: JSX.Element | ChildrenComponent[], [key: string]: any } // 表单控件自有的props属性, 不支持字符串表达式
    hidden?: string | boolean // 显示隐藏的逻辑，支持字符串表达式
    properties?: { [name: string]: FormFieldProps } | FormFieldProps[] // 嵌套的表单控件 为对象时表示对象嵌套，为数组类型时表示数组集合， 不支持字符串表达式
}
```

### 表单域内的控件自身的`props`设置

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