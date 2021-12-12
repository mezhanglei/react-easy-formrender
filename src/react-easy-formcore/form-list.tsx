import React, { cloneElement, CSSProperties, useContext } from 'react'
import { FormRule } from './form-store';
import { formListPath } from './form';
import { FormOptionsContext } from './form-options-context';
import classnames from 'classnames';
import { classes } from './form-item';

export interface FormListProps {
  label?: string
  name?: string
  children?: React.ReactNode
  rules?: FormRule[]
  path?: string;
  initialValue?: any[]
  className?: string
  style?: CSSProperties
}

export const FormList = React.forwardRef((props: FormListProps, ref) => {
  const {
    name,
    children,
    rules,
    path,
    initialValue,
    label,
    className,
    style,
    ...restProps
  } = props

  const currentPath = path ? `${path}.${name}` : `${name}`;
  const options = useContext(FormOptionsContext)
  const { inline, compact, required, labelWidth, labelAlign, gutter } = {
    ...options,
    ...restProps
  }

  if (currentPath && !formListPath?.includes(currentPath)) {
    formListPath.push(currentPath)
  }

  const childs = React.Children.map(children, (child: any, index) => {
    const childRules = (rules || [])?.concat(child?.props?.rules)?.filter((rule) => !!rule);
    return child && cloneElement(child, {
      path: currentPath,
      name: `${index}`,
      rules: childRules,
      initialValue: initialValue?.[index],
    });
  });

  const cls = classnames(
    classes.field,
    inline ? classes.inline : '',
    compact ? classes.compact : '',
    required ? classes.required : '',
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
        {childs}
      </div>
    </div>
  )
})

FormList.displayName = 'FormList';
