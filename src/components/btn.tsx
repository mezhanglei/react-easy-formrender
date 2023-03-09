import React, { CSSProperties } from 'react';
import classnames from 'classnames';
import './btn.less';
import { GenerateFieldProps, GeneratePrams } from '../types';
import Button from './button';
import { joinFormPath } from 'react-easy-formcore';
import Icon from "./icon";
import { isEmpty } from 'src/utils/type';

export interface DeleteBtnProps extends GeneratePrams<any> {
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
}
export const DeleteBtn: React.FC<DeleteBtnProps> = (props) => {

  const {
    name,
    field,
    parent,
    store,
    form,
    className,
    ...restProps
  } = props;

  const currentPath = isEmpty(name) ? undefined : joinFormPath(parent, name);
  const deleteItem = () => {
    currentPath && form?.setFieldValue(currentPath, undefined, false);
    currentPath && store?.delItemByPath(currentPath);
  }

  const cls = classnames('icon-delete', className)
  return <Icon name="delete" onClick={deleteItem} className={cls} {...restProps} />
}

export interface AddBtnProps extends GeneratePrams<any> {
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
  item?: GenerateFieldProps;
}
export const AddBtn: React.FC<AddBtnProps> = (props) => {

  const {
    name,
    field,
    parent,
    store,
    form,
    item,
    className,
    children,
    ...restProps
  } = props;

  const currentPath = isEmpty(name) ? undefined : joinFormPath(parent, name);

  const addNewItem = () => {
    const properties = field?.properties;
    const nextIndex = typeof properties === 'object' && Object?.keys(properties)?.length || 0;
    if (item && currentPath) {
      store?.addItemByIndex(item, nextIndex, currentPath);
    }
    props?.onClick && props?.onClick();
  }

  return (
    <Button className={className} {...restProps} onClick={addNewItem}>
      {children ? children : '新增一条'}
    </Button>
  );
}
