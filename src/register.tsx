import { ListItem } from './list-item/base';
import { Form } from 'react-easy-formcore';

// 表单域组件
export const defaultFields: { [key: string]: any } = {
    'Form.Item': Form.Item,
    'Form.List': Form.List,
    'List.Item': ListItem
};
