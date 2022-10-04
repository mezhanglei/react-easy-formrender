import React from 'react';
import "./index.less";
import RenderForm, { Form, FormRenderStore, RenderFormChildren } from '../../src/index';
// import '../../lib/css/main.css';
import { Button, Checkbox, Col, Input, Radio, Row, Select } from 'antd';

// 原子组件
export const defaultControls: { [key: string]: any } = {
  "Input": Input,
  "Radio.Group": Radio.Group,
  "Radio": Radio,
  "Select": Select, // 选择控件
  "Select.Option": Select.Option, // 选择的选项
  "Checkbox": Checkbox
};

const watch = {
  'name1': (newValue, oldValue) => {
    console.log(newValue, oldValue)
  },
  'name2[0]': (newValue, oldValue) => {
    console.log(newValue, oldValue)
  },
  'name3': (newValue, oldValue) => {
    console.log(newValue, oldValue)
  }
}

class demo extends React.Component {
  store: FormRenderStore<any>;
  constructor(props) {
    super(props);
    this.store = new FormRenderStore();
    this.state = {
      schema: {
        title: '1111',
        className: 'form-wrapper',
        inside: {
          type: 'row'
        },
        properties: {
          name1: {
            label: "name1",
            outside: { type: 'col', props: { span: 12 } },
            required: true,
            readOnly: true,
            readOnlyRender: 1111,
            rules: [{ required: true, message: 'name1空了' }],
            initialValue: 1111,
            // layout: 'vertical',
            hidden: '{{$formvalues.name5 == true}}',
            type: 'Input',
            props: {}
          },
          name2: {
            label: "name2",
            required: true,
            outside: { type: 'col', props: { span: 12 } },
            footer: {
              type: 'add',
              props: {
                item: {
                  type: 'Select',
                  required: true,
                  suffix: { type: 'delete' },
                  rules: [{ required: true, message: '空' }],
                  initialValue: { label: '选项1', value: '1', key: '1' },
                  props: {
                    labelInValue: true,
                    style: { width: '100%' },
                    children: [
                      { type: 'Select.Option', props: { key: 1, value: '1', children: '选项1' } },
                      { type: 'Select.Option', props: { key: 2, value: '2', children: '选项2' } }
                    ]
                  }
                }
              }
            },
            properties: [{
              required: true,
              rules: [{ required: true, message: 'name2[0]空了' }],
              initialValue: { label: '选项1', value: '1', key: '1' },
              suffix: { type: 'delete' },
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
              suffix: { type: 'delete' },
              rules: [{ required: true, message: 'name2[1]空了' }],
              type: 'Select',
              props: {
                labelInValue: true,
                style: { width: '100%' },
                children: [
                  { type: 'Select.Option', props: { key: 1, value: '1', children: '选项1' } }
                ]
              }
            }]
          },
          name3: {
            label: 'name3',
            required: true,
            outside: { type: 'col', props: { span: 12 } },
            properties: {
              first: {
                rules: [{ required: true, message: 'name3.first空了' }],
                type: 'Select',
                props: {
                  style: { width: '100%' },
                  children: [{ type: 'Select.Option', props: { key: 1, value: '1', children: '选项1' } }]
                }
              },
              second: {
                rules: [{ required: true, message: 'name3.second空了' }],
                type: 'Select',
                props: {
                  style: { width: '100%' },
                  children: [{ type: 'Select.Option', props: { key: 1, value: '1', children: '选项1' } }]
                }
              }
            }
          },
          name4: {
            label: 'name4',
            outside: { type: 'col', props: { span: 12 } },
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
          name5: {
            label: 'name5',
            outside: { type: 'col', props: { span: 12 } },
            required: true,
            valueProp: 'checked',
            initialValue: true,
            rules: [{ required: true, message: 'name4空了' }],
            type: 'Checkbox',
            props: {
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
                    <RenderFormChildren watch={watch} controls={defaultControls} properties={this.state.schema?.properties} />
                </Form> */}
        <RenderForm components={{ row: Row, col: Col }} watch={watch} controls={defaultControls} store={this.store} schema={this.state.schema} />
        <div style={{ marginLeft: '140px' }}>
          <Button onClick={this.onSubmit}>submit</Button>
        </div>
      </div>
    );
  }
}

export default demo;
