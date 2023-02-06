import React, { useState } from 'react';
import "./index.less";
import RenderForm, { useFormStore } from '../../src/index';
// import '../../lib/css/main.css';
import { Button, Checkbox, Input, Radio, Select } from 'antd';

// 原子组件
export const defaultControls: { [key: string]: any } = {
  "Input": Input,
  "Radio.Group": Radio.Group,
  "Radio": Radio,
  "Select": Select, // 选择控件
  "Select.Option": Select.Option, // 选择的选项
  "Checkbox": Checkbox
};

export default function Demo(props) {

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

  const [properties, setProperties] = useState({
    name1: {
      label: "readonly",
      readOnly: true,
      readOnlyRender: "readonly component",
      initialValue: 1111,
      // outside: { type: 'col', props: { span: 6 } },
      hidden: '{{$formvalues.name6 == true}}',
      type: 'Input',
      props: {}
    },
    name2: {
      label: "input",
      // outside: { type: 'col', props: { span: 6 } },
      rules: [{ required: true, message: 'input empty' }],
      initialValue: 1,
      hidden: '{{$formvalues.name6 == true}}',
      type: 'Input',
      props: {}
    },
    name3: {
      label: "list",
      tooltip: '111',
      // outside: { type: 'col', props: { span: 6 } },
      properties: [{
        rules: [{ required: true, message: 'list[0]空了' }],
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
      label: 'object',
      // outside: { type: 'col', props: { span: 6 } },
      properties: {
        first: {
          rules: [{ required: true, message: 'object empty' }],
          type: 'Select',
          props: {
            style: { width: '100%' },
            children: [{ type: 'Select.Option', props: { key: 1, value: '1', children: 'option1' } }]
          }
        },
        second: {
          rules: [{ required: true, message: 'name2空了' }],
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
      // outside: { type: 'col', props: { span: 6 } },
      initialValue: true,
      rules: [{ required: true, message: 'checkbox empty' }],
      type: 'Checkbox',
      props: {
        style: { width: '100%' },
        children: 'option'
      }
    },
  })

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
        // store={formRenderStore}
        properties={properties}
        controls={defaultControls}
        watch={watch} />
      <div style={{ marginLeft: '120px' }}>
        <Button onClick={onSubmit}>submit</Button>
      </div>
    </div>
  );
}
