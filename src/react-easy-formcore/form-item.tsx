import React, { cloneElement, isValidElement, useCallback, useContext, useState, useEffect, CSSProperties } from 'react'

import { FormStoreContext } from './form-store-context'
import { useFieldChange } from './use-field-change'
import { FormOptions, FormOptionsContext } from './form-options-context'
import { getValuePropName, getValueFromEvent } from './utils/utils'
import { FormRule } from './form-store'
import classnames from 'classnames';
import { AopFactory } from './utils/function-aop'

export interface FormItemProps extends FormOptions {
  className?: string
  label?: string
  name?: string
  valueProp?: string | ((type: any) => string)
  valueGetter?: (...args: any[]) => any
  suffix?: React.ReactNode
  children?: React.ReactNode
  rules?: FormRule[]
  style?: CSSProperties
  path?: string
  initialValue?: any
}

const prefixCls = 'rh-form-field';
export const classes = {
  field: prefixCls,
  inline: `${prefixCls}--inline`,
  compact: `${prefixCls}--compact`,
  required: `${prefixCls}--required`,
  error: `${prefixCls}--error`,

  header: `${prefixCls}__header`,
  container: `${prefixCls}__container`,
  control: `${prefixCls}__control`,
  message: `${prefixCls}__message`,
  footer: `${prefixCls}__footer`
}

export const FormItem = React.forwardRef((props: FormItemProps, ref) => {
  const {
    className,
    label,
    name,
    valueProp = 'value',
    valueGetter = getValueFromEvent,
    suffix,
    children,
    rules,
    style,
    path,
    initialValue,
    ...restProps
  } = props

  const currentPath = path && name ? `${path}.${name}` : name;
  const store = useContext(FormStoreContext)
  const options = useContext(FormOptionsContext)
  const [value, setValue] = useState(currentPath && store ? store.getFieldValue(currentPath) : undefined)
  const [error, setError] = useState(currentPath && store ? store.getFieldError(currentPath) : undefined)

  // onChange监听
  const onChange = useCallback(
    (...args: any[]) => {
      const value = valueGetter(...args);
      if (currentPath && store) {
        // 设置值
        store.setFieldValue(currentPath, value);
        // onFormChange事件
        options?.onFormChange && options?.onFormChange({ name: currentPath, value: value });
      }
    },
    [currentPath, store, valueGetter]
  )

  const aopOnchange = new AopFactory(onChange);

  // 监听数据变化的回调函数
  useFieldChange({
    store,
    name: currentPath,
    rules,
    // 监听FormStore中的value变化
    onChange: () => {
      const value = store!.getFieldValue(currentPath!);
      setValue(value);
    },
    // 监听错误变化
    onError: () => {
      const error = store!.getFieldError(currentPath!);
      setError(error);
    }
  })

  useEffect(() => {
    if (!currentPath || !store) return;
    if (initialValue !== undefined) {
      store.setFieldValue(currentPath, initialValue, true);
      setValue(initialValue);
    }
    return () => {
      store.setFieldValue(currentPath, undefined, true);
      setValue(undefined);
    }
  }, [currentPath, store, initialValue]);

  const { inline, compact, required, labelWidth, labelAlign, gutter, errorClassName = 'error' } = {
    ...options,
    ...restProps
  }

  // 最底层才会绑定value和onChange
  const bindChild = (child: any) => {
    if (!isValidElement(child) || !store) return;
    if (currentPath) {
      const valuePropName = getValuePropName(valueProp, child && child.type);
      const childProps = child?.props as any;
      const { onChange, className } = childProps || {};
      // 对onChange方法进行aop包装，在后面添加子元素自身的onChange事件
      const aopAfterFn = aopOnchange.addAfter(onChange);

      const newChildProps = { className: classnames(className, error && errorClassName), [valuePropName]: value, onChange: aopAfterFn }
      return cloneElement(child, newChildProps)
    } else {
      return child;
    }
  }

  const childs = React.Children.map(children, (child: any) => {
    const displayName = child?.type?.displayName;
    if (['FormItem', 'FormList']?.includes(displayName)) {
      return child && cloneElement(child, {
        path: currentPath
      })
    } else {
      return bindChild(child);
    }
  });

  const cls = classnames(
    classes.field,
    inline ? classes.inline : '',
    compact ? classes.compact : '',
    required ? classes.required : '',
    error ? classes.error : '',
    className ? className : ''
  )

  const headerStyle = {
    width: labelWidth,
    marginRight: gutter,
    textAlign: labelAlign
  }

  return (
    <div ref={ref} className={cls} style={style}>
      {label !== undefined && (
        <div className={classes.header} style={headerStyle}>
          {label}
        </div>
      )}
      <div className={classes.container}>
        <div className={classes.control}>{childs}</div>
        <div className={classes.message}>{error}</div>
      </div>
      {suffix !== undefined && <div className={classes.footer}>{suffix}</div>}
    </div>
  )
})

FormItem.displayName = 'FormItem';
