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
      label: "只读展示",
      required: true,
      readOnly: true,
      readOnlyRender: "只读展示组件",
      initialValue: 1111,
      // outside: { type: 'col', props: { span: 6 } },
      hidden: '{{$formvalues.name6 == true}}',
      type: 'Input',
      props: {}
    },
    name2: {
      label: "输入框",
      required: true,
      // outside: { type: 'col', props: { span: 6 } },
      rules: [{ required: true, message: 'name2空了' }],
      initialValue: 1,
      hidden: '{{$formvalues.name6 == true}}',
      type: 'Input',
      props: {}
    },
    name3: {
      label: "数组name3",
      required: true,
      // outside: { type: 'col', props: { span: 6 } },
      properties: [{
        required: true,
        rules: [{ required: true, message: 'name3[0]空了' }],
        initialValue: { label: '选项1', value: '1', key: '1' },
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
        rules: [{ required: true, message: 'name3[1]空了' }],
        type: 'Select',
        props: {
          labelInValue: true,
          style: { width: '100%' },
          children: [
            { type: 'Select.Option', props: { key: 1, value: '1', children: '选项1' } },
            { type: 'Select.Option', props: { key: 2, value: '2', children: '选项2' } }
          ]
        }
      }]
    },
    name4: {
      label: '对象嵌套',
      required: true,
      // outside: { type: 'col', props: { span: 6 } },
      properties: {
        first: {
          rules: [{ required: true, message: 'name4空了' }],
          type: 'Select',
          props: {
            style: { width: '100%' },
            children: [{ type: 'Select.Option', props: { key: 1, value: '1', children: '选项1' } }]
          }
        },
        second: {
          rules: [{ required: true, message: 'name2空了' }],
          type: 'Select',
          props: {
            style: { width: '100%' },
            children: [{ type: 'Select.Option', props: { key: 1, value: '1', children: '选项1' } }]
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
          { type: 'Select.Option', props: { key: 1, value: 12, children: '一行一列' } },
          { type: 'Select.Option', props: { key: 2, value: 6, children: '一行二列' } },
          { type: 'Select.Option', props: { key: 3, value: 4, children: '一行三列' } }
        ]
      }
    },
    name6: {
      label: 'name6',
      required: true,
      valueProp: 'checked',
      // outside: { type: 'col', props: { span: 6 } },
      initialValue: true,
      rules: [{ required: true, message: 'name5空了' }],
      type: 'Checkbox',
      props: {
        style: { width: '100%' },
        children: '多选框'
      }
    },
  })

  const form = useFormStore();

  const onSubmit = async (e) => {
    e?.preventDefault?.();
    const result = await form.validate();
    console.log(result, 'result');
  };

  return (
    <div>
      <RenderForm form={form} controls={defaultControls} properties={properties} watch={watch} />
      <div style={{ marginLeft: '120px' }}>
        <Button onClick={onSubmit}>submit</Button>
      </div>
    </div>
  );
}
