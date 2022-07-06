import React from 'react';
import "./index.less";
import RenderForm, { Form, FormRenderStore, RenderFormChildren } from '../../src/index';
// import '../../lib/css/main.css';
import { Button, Checkbox, Input, Radio, Select } from 'antd';

// 原子组件
export const defaultWidgets: { [key: string]: any } = {
  input: Input,
  select: Select,
  radioGroup: Radio.Group,
  radio: Radio,
  option: Select.Option,
  Checkbox: Checkbox
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
        properties: {
          name1: {
            label: "name1",
            widget: 'input',
            required: true,
            readOnly: true,
            readOnlyRender: 1111,
            rules: [{ required: true, message: 'name1空了' }],
            initialValue: 1111,
            // layout: 'vertical',
            hidden: '{{$formvalues.name4 == true}}',
            widgetProps: {}
          },
          name2: {
            label: "name2",
            required: true,
            footer: {
              type: 'add', addItem: {
                widget: 'select',
                required: true,
                suffix: { type: 'delete' },
                rules: [{ required: true, message: '空' }],
                initialValue: { label: '选项1', value: '1', key: '1' },
                widgetProps: {
                  labelInValue: true,
                  style: { width: '100%' },
                  children: [{ widget: 'option', widgetProps: { key: 1, value: '1', children: '选项1' } }, { widget: 'option', widgetProps: { key: 2, value: '2', children: '选项2' } }]
                }
              }
            },
            properties: [{
              widget: 'select',
              required: true,
              rules: [{ required: true, message: 'name2[0]空了' }],
              initialValue: { label: '选项1', value: '1', key: '1' },
              suffix: { type: 'delete' },
              widgetProps: {
                labelInValue: true,
                style: { width: '100%' },
                children: [{ widget: 'option', widgetProps: { key: 1, value: '1', children: '选项1' } }, { widget: 'option', widgetProps: { key: 2, value: '2', children: '选项2' } }]
              }
            }, {
              widget: 'select',
              required: true,
              suffix: { type: 'delete' },
              rules: [{ required: true, message: 'name2[1]空了' }],
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
            properties: {
              first: {
                rules: [{ required: true, message: 'name3.first空了' }],
                widget: 'select',
                widgetProps: {
                  style: { width: '100%' },
                  children: [{ widget: 'option', widgetProps: { key: 1, value: '1', children: '选项1' } }]
                }
              },
              second: {
                rules: [{ required: true, message: 'name3.second空了' }],
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
            initialValue: true,
            rules: [{ required: true, message: 'name4空了' }],
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
                    <RenderFormChildren watch={watch} widgets={defaultWidgets} properties={this.state.schema?.properties} />
                </Form> */}
        <RenderForm watch={watch} widgets={defaultWidgets} store={this.store} schema={this.state.schema} />
        <div style={{ marginLeft: '140px' }}>
          <Button onClick={this.onSubmit}>submit</Button>
        </div>
      </div>
    );
  }
}

export default demo;
