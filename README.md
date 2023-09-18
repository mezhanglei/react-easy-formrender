# react-easy-formrender

English | [中文说明](./README_CN.md)

[![Version](https://img.shields.io/badge/version-8.0.23-green)](https://www.npmjs.com/package/react-easy-formrender)

# Introduction?

High degree of freedom and Lightweight dynamic form Engine, high-end solutions often require only simple design(which is done based on [react-easy-formcore](https://github.com/mezhanglei/react-easy-formcore) development).

- Component Registration: Registered form components need to match the `value`/`onChange` (or other field) pass-through in order to work properly.
- Component description: `properties` supports object or array type rendering, Supports adding nested object fields via the `properties` property.
- Component rendering: `Form` component handles form values, `RenderFormChildren` component handles form rendering, one `Form` component can support multiple `RenderFormChildren` components rendering internally.
- Component linkage: All form properties can support string expressions to describe linkage conditions (except `properties`).

# version log
- v8.x
  - Update the underlying components to `react-easy-formcore` at least version 5.x.
  - Rendering data source `properties` rendering method changed, divided into nested nodes and control nodes, where nested nodes no longer carry form field components, only control nodes carry form field components by default
  - ~~`store`~~ changed to `formrender`,
- v7.x
  - 7.0.0 Remove ~~`controls`~~ property, keep `components` property to register all global components.
- v6.x
  - 6.2.17 ~~`fieldComponent`~~ change to `component`，The `component` property can be set to `null`. and update `FormRenderStore` methods. ~~`addItemByIndex`, `addAfterByPath`, `addBeforeByPath`~~ removed;
  - 6.2.7 When the default component `RenderForm` reports an error in the `form` tag in the nested case, you can set `tagName` to be replaced by another tag.
  - 6.2.5 Enhancing and adjusting the usage of string expressions, and adding a new description of how to use string expressions in this document.
  - 6.2 adapt the underlying `react-easy-formcore` library to path systems above `4.x`, fix the `useFormValues` bug.
  - The component is split into `Form` and `RenderFormChildren` components, the `Form` component handles the form values, the `RenderFormChildren` renders the form based on the information provided, a `Form` component can wrap multiple `RenderFormChildren` components, if multiple ` RenderFormChildren` components have the same properties as each other, the later will override the previous
  - ~~`schema`~~ properties are flattened, so you need to use `properties` to render the form instead, and ~~`onSchemaChange`~~ needs to be replaced with `onPropertiesChange`
- v5.x:
  This update completes the decoupling of the form display component from the form value related logic. basic version.
  - The underlying library `react-easy-formcore` is updated, you need to remove the old package and install the new version
  - ~~`readOnlyItem` is deprecated~~, only `readOnlyRender` is kept
- v4.x:
  v4.x and previous versions mostly adjust some method naming and parameter passing changes.
  - Deprecate fixed container properties ~~`col`~~ and ~~`customInner`~~, add custom containers `inside` and `outside`;
  - ~~`widgets`~~ to ~~`controls`~~ , ~~`widget`~~ and ~~`widgetProps`~~ to `type` and `props`;
  - ~~`readOnlyWidget` to `readOnlyItem`;~~
- v3.1.x:
  - Adjust the `layout` property of form fields, add `inline`, `labelWidth` properties
  - ~~Adjust `onPropertiesChange` of default export component to `onSchemaChange`~~
  - ~~Adjust `customChild` to `customInner`~~
- v3.0.x:
  - ~~String expressions representing form values changed from `$form` to `$formvalues`~~
  - ~~Add `$store` to the string expression to represent an instance of `FormRenderStore`, which can get the form related methods and data~~
  - If you need to introduce a built-in component (add/remove buttons for lists), you need to `import 'react-easy-formrender/lib/css/main.css'`.
- v2.x:
  - ~~remove the `dependencies` property~~ and instead inject the form values `formvalues` to the widget component automatically.
  - ~~change api of `RenderFormChildren` component~~
- v1.x:
  - Change the method of the form component
  - ~~Change `component` and `props` in schema to `widget` and `widgetProps`~~
  - ~~change `render` in schema to `readOnlyWidget` and `readOnlyRender`~~
  - Version matching react-easy-formcore version 1.1.x or higher

## install

```bash
npm install react-easy-formrender --save
# or
yarn add react-easy-formrender
```

## example

### 1.First register the basic components(Take the `antd@4.20.2` UI library as an example)
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
### 2.import registered components
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
          label: "list[0]",
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
          label: "list[1]",
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
            label: "first",
            rules: [{ required: true, message: 'first empty' }],
            type: 'Select',
            props: {
              style: { width: '100%' },
              children: [{ type: 'Select.Option', props: { key: 1, value: '1', children: 'option1' } }]
            }
          },
          second: {
            label: "second",
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

### multiple RenderFormChildren demo
  The form engine also supports multiple `RenderFormChildren` components to render and then the `Form` component to handle the form values in a unified manner.
 - `useFormStore`: hook to provide a class for form value processing. provided by the default component itself, or passed in by external props.
 - `useFormRenderStore`: hook to provide a class for form rendering, provided by the default component itself, or passed in by external props.
```javascript
import React, { useState } from 'react';
import RenderForm, { RenderFormChildren, Form, useFormStore, useFormRenderStore } from './form-render';
import { Button } from 'antd';
export default function Demo(props) {
  
  const properties1 = {
    part1: {
      label: "part1input",
      rules: [{ required: true, message: 'empty' }],
      initialValue: 1,
      type: 'Input',
      props: {}
    },
  }

  const properties2 = {
    part2: {
      label: "part2input",
      rules: [{ required: true, message: 'empty' }],
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
### 4. Array data
support render `array`
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
    ]

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
        watch={watch} />
      <div style={{ marginLeft: '120px' }}>
        <Button onClick={onSubmit}>submit</Button>
      </div>
    </div>
  );
}
```

## API

### RenderFormChildren's props
Properties of the form rendering component:
- `properties`: `{ [name: string]: FormNodeProps } | FormNodeProps[]` Rendering json data in the form of a DSL for a form.
- `watch`：can listen to changes in the value of any field, for example:
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
      immediate: true
  }
  ...
  <RenderForm watch={watch} />
}
```
- `components`：register other component for form to use.
- `options`： `GenerateFormNodeProps | ((params: GenerateFormNodeProps) => any)` Information about the parameters passed to the form node component. Lower priority than the form node's own parameters
- `renderList`: function that provides custom rendering List.
- `renderItem`: function that provides custom render item.
- `onPropertiesChange`: `(newValue: ProertiesData) => void;` Callback function when `properties` is changed
- `formrender`: The form class responsible for rendering. Created with `useFormRenderStore()`.
- `uneval`: Do not execute string expressions in the form.
- `expressionImports`: External variables to be introduced in the string expression.

### Form's Props
from [react-easy-formcore](https://github.com/mezhanglei/react-easy-formcore)
- 6.2.7 When the default component `RenderForm` reports an error in the `form` tag in the nested case, you can set `tagName` to be replaced by another tag.

### FormRenderStore Methods
  Only responsible for the rendering of the form
 - `updateItemByPath`: `(data?: any, path?: string, attributeName?: string) => void` Update the node corresponding to path `path`, if updating specific attributes in the node then `attributeName` parameter is required
 - `setItemByPath`: `(data?: any, path?: string, attributeName?: string) => void` Set the node corresponding to path `path`, or `attributeName` if setting specific attributes in the node
 - `updateNameByPath`: `(newName?: string, path: string) => void` Update the name key of the specified path
 - `delItemByPath`: `(path?: string, attributeName?: string) => void` Deletes the node corresponding to path `path`, or the `attributeName` parameter if the specific attribute in the node is deleted
 - `insertItemByIndex`: `(data: InsertItemType, index?: number, parent?: { path?: string, attributeName?: string }) => void` Add options based on the serial number and parent node path
 - `getItemByPath`: `(path?: string, attributeName?: string) => void` Get the node corresponding to path `path`, or `attributeName` if it is a specific attribute in the node
 - `moveItemByPath`: `(from: { parent?: string, index: number }, to: { parent?: string, index?: number })` Swap options in the tree from one location to another
 - `setProperties`: `(data?: Partial<FormNodeProps>) => void` Set `properties`.

### Hooks

- `useFormRenderStore()`: create `new FormRenderStore()` by hook.
- `useFormStore(defaultValues)`: create `new FormStore()` by hook.

## Other

### properties
Each item in the `properties` property is a form node, and the nodes are divided into nested nodes and control nodes.
- Nested nodes:
  Nodes with `properties` property describe which component the node is by the `type` and `props` fields, and do not carry form field components.
- Control nodes:
  Nodes without the `properties` property carry a form field component by default, providing some of the functionality of a form field. the default form field properties are inherited from the `Form.Item` or the `Form.List` component in [react-easy-formcore](https://github.com/mezhanglei/react-easy-formcore).
```javascript
// `name3` is Nested nodes，but not set component，`first` and `second` is Control nodes with form fields component。
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
- formNode type
```javascript
// form component
export interface FormComponent {
  type?: string;
  props?: any & { children?: any | Array<FormComponent> };
  hidden?: string | boolean;
}
export type UnionComponent<P> =
  | React.ComponentType<P>
  | React.ForwardRefExoticComponent<P>
  | React.FC<P>
  | keyof React.ReactHTML;
export type CustomUnionType = FormComponent | Array<FormComponent> | UnionComponent<any> | Function | ReactNode
// The type of nodes in the form tree
export interface FormNodeProps extends FormItemProps, FormComponent {
  hidden?: string | boolean;
  ignore?: boolean; // Mark the current field as a non-form field
  inside?: CustomUnionType; // FormNode inner nested components
  outside?: CustomUnionType; // FormNode outside nested components
  readOnly?: boolean; // readonly？
  readOnlyRender?: CustomUnionType | ReactNode; // form field's component render
  typeRender?: any; // form field's component render
  properties?: { [name: string]: FormNodeProps } | FormNodeProps[]; // Nested form components Nested objects when they are objects, or collections of arrays when they are array types
}
```

### Property Passing
 - The properties of the form node are set globally:
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

  // first way
  <RenderForm
    options={{
      layout: 'vertical', // Attributes of a node
      props: { disabled: true } // Properties of the component rendered by the 'type' field in the node
    }}
  />
  // second way was only sets the properties of the form field component (Form.Item).
  // <Form form={form} layout="vertical">
  //   <RenderFormChildren
  //     properties={properties1}
  //   />
  // </Form>
```
 - Contextual information received by any component registered in the form:
 ```javascript
export interface GeneratePrams<T = {}> {
  name?: string; // Form fields of the node where the component is located
  path?: string; // The rendering path of the node where the component is located
  parent?: { name?: string; path?: string, field?: T & GenerateFormNodeProps; }; // Information about the parent node of the component
  field?: T & GenerateFormNodeProps; // Information about the node where the component is located
  formrender?: FormRenderStore;
  form?: FormStore;
};
```

### Path rules involved in the form
Forms are allowed to be nested, so they will involve finding a certain property. The paths follow certain rules

for Example:
- `a[0]` means the first option under the array `a`
- `a.b` denotes the `b` attribute of the `a` object
- `a[0].b` means the `b` attribute of the first option under the array `a`

### Expression Usage
 All property fields in form nodes except `properties` can support string expressions for linkage
 1. Quick use: Computational expressions wrapping target property values with `{{` and `}}`
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
      rules: '{{[{ required: formvalues && formvalues.name1 === true, message: "name2 is empty" }]}}',
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
      rules: [{ required: '{{formvalues && formvalues.name1 === true}}', message: "name2 is empty" }],
      initialValue: 1,
      type: 'Input',
      props: {}
    },
  }
```
 2. Rules for using string expressions
  - A string has and can have only one pair of `{{` and `}}`.
  - In addition to the three built-in variables (`form`(equal `useFormStore()`), `formrender`(equal `useFormRenderStore()`), `formvalues`(form value object)), external variables can be introduced via `expressionImports`, and then referenced directly within the string expression and then refer to the variable name directly within the string expression.
  - Starting from 6.2.5, it is recommended to leave out the `$` symbol. It removed in 7.x versions.
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
