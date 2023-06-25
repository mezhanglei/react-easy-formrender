import React, { useContext, useEffect, useMemo, useState } from 'react';
import { FormNodeProps, RenderFormChildrenProps, GeneratePrams, CustomUnionType, PropertiesData, GenerateFormNodeProps, CustomRenderType } from './types';
import { defaultComponents } from './components';
import { Form, FormOptionsContext, FormStore, FormStoreContext, ItemCoreProps, joinFormPath } from 'react-easy-formcore';
import { isEqual } from './utils/object';
import 'react-easy-formcore/lib/css/main.css';
import "./icons/index.js";
import { matchExpression } from './utils/utils';
import { useFormRenderStore } from './use-formrender';
import { isEmpty } from './utils/type';

// 表单元素渲染
export default function RenderFormChildren(props: RenderFormChildrenProps) {

  const [fieldPropsMap, setFieldPropsMap] = useState<Partial<FormNodeProps>>({});
  const [properties, setProperties] = useState<PropertiesData>({});

  const {
    uneval,
    components,
    watch,
    onPropertiesChange,
    renderItem,
    renderList,
    inside,
    properties: propsProperties,
    formrender,
    expressionImports = {},
    options,
    evalPropNames = ['props', 'rules'],
  } = props;

  const formOptions = useContext(FormOptionsContext);
  const form = useContext<FormStore>(FormStoreContext);
  const { onValuesChange } = formOptions;
  const formRenderStore = formrender || useFormRenderStore();
  formRenderStore.registry('components', Object.assign({}, defaultComponents, components));

  const valuesCallback: ItemCoreProps['onValuesChange'] = (...args) => {
    onValuesChange && onValuesChange(...args)
    handleFieldProps();
  }

  // 从formRenderStore中订阅更新properties
  useEffect(() => {
    if (!formRenderStore) return
    const uninstall = formRenderStore.subscribeProperties((newValue, oldValue) => {
      setProperties(newValue);
      if (!isEqual(newValue, oldValue)) {
        onPropertiesChange && onPropertiesChange(newValue, oldValue)
      }
    })
    return uninstall;
  }, [formRenderStore, onPropertiesChange]);

  useEffect(() => {
    return () => {
      form?.unsubscribeFormGlobal();
    }
  }, []);

  // 从props中更新properties
  useEffect(() => {
    if (!formRenderStore) return;
    formRenderStore.setProperties(propsProperties);
  }, [propsProperties]);

  // 订阅监听函数
  useMemo(() => {
    if (!form || !watch) return;
    return Object.entries(watch)?.map(([key, watcher]) => {
      // 函数形式
      if (typeof watcher === 'function') {
        form?.subscribeFormGlobal(key, watcher)
        // 对象形式
      } else if (typeof watcher === 'object') {
        if (typeof watcher.handler === 'function') {
          form?.subscribeFormGlobal(key, watcher.handler);
        }
        if (watcher.immediate) {
          watcher.handler(form?.getFieldValue(key), form?.getLastValue(key));
        }
      }
    });
  }, [form, watch]);

  // 变化时更新
  useEffect(() => {
    if (!properties) return;
    handleFieldProps();
  }, [properties]);

  // 递归检测对象
  const evalAttr = (val: Object | Array<any>): any => {
    if (val instanceof Array) {
      return val.map((item) => {
        return evalAttr(item);
      });
    } else if (typeof val === 'object') {
      return Object.fromEntries(
        Object.entries(val || {})?.map(
          ([propsKey, propsItem]) => {
            return [propsKey, evalAttr(propsItem)]
          }
        )
      );
    } else {
      const generateItem = evalExpression(val, uneval);
      return generateItem;
    }
  }

  // 递归遍历处理表单域的字符串表达式并存储解析后的信息
  const handleFieldProps = () => {
    if (typeof properties !== 'object') return;
    const fieldPropsMap = {};
    // 遍历处理对象树中的非properties字段
    const deepHandle = (formNode: FormNodeProps, path: string) => {
      for (const propsKey of Object.keys(formNode || {})) {
        if (typeof propsKey === 'string') {
          if (propsKey !== 'properties') {
            const propsValue = formNode[propsKey];
            let result = propsValue;
            const matchStr = matchExpression(propsValue);
            if (matchStr) {
              result = evalExpression(propsValue, uneval);
            } else if (evalPropNames.includes(propsKey)) {
              result = evalAttr(propsValue);
            }
            const propsPath = joinFormPath(path, propsKey);
            fieldPropsMap[propsPath] = result;
          } else {
            const childProperties = formNode[propsKey];
            if (childProperties) {
              for (const childKey of Object.keys(childProperties)) {
                const childField = childProperties[childKey];
                const childName = childKey;
                if (typeof childName === 'number' || typeof childName === 'string') {
                  const childPath = joinFormPath(path, childName) as string;
                  deepHandle(childField, childPath);
                }
              }
            }
          }
        }
      }
    };

    for (const key of Object.keys(properties)) {
      const childField = properties[key];
      const childName = key;
      if (typeof key === 'string') {
        deepHandle(childField, childName);
      }
    }
    setFieldPropsMap(fieldPropsMap);
  }

  // 遍历对象获取
  const getValueFromObject = (val?: Partial<FormNodeProps>, generateVal?: Partial<GenerateFormNodeProps>) => {
    return Object.fromEntries(
      Object.entries(val || {})?.map(
        ([propsKey, propsItem]) => {
          const matchStr = matchExpression(propsItem);
          const generateItem = generateVal?.[propsKey];
          if (generateItem !== undefined) {
            return [propsKey, generateItem]
          }
          if (matchStr) {
            return [propsKey]
          };
          return [propsKey, propsItem]
        }
      )
    );
  }

  // 获取计算表达式之后的结果
  const getEvalFieldProps = (field: FormNodeProps, path?: string) => {
    if (!path || isEmpty(field)) return;
    return Object.fromEntries(
      Object.entries(field || {})?.map(
        ([propsKey, propsValue]) => {
          const propsPath = joinFormPath(path, propsKey);
          const generateValue = propsPath && fieldPropsMap[propsPath];
          const matchStr = matchExpression(propsValue);
          if (generateValue !== undefined) {
            return [propsKey, generateValue]
          }
          if (matchStr) {
            return [propsKey]
          };
          if (propsKey === 'props') {
            return [propsKey, getValueFromObject(propsValue, generateValue)]
          }
          return [propsKey, propsValue];
        }
      )
    );
  }

  // 值兼容字符串表达式
  const evalExpression = (value?: string | boolean, uneval?: boolean): any => {
    if (uneval) return value;
    if (typeof value === 'string') {
      const matchStr = matchExpression(value)
      if (matchStr) {
        const importsKeys = ['form', 'formrender', 'formvalues'].concat(Object.keys(expressionImports))
        const importsValues = Object.values(expressionImports);
        const target = matchStr?.replace(/\{\{|\}\}/g, '');
        const actionStr = "return " + target;
        // 函数最后一个参数为函数体，前面均为传入的变量名
        const action = new Function(...importsKeys, actionStr);
        const result = action(form, formRenderStore, form && form.getFieldValue() || {}, ...importsValues);
        return evalExpression(result, uneval);
      } else {
        return value;
      }
    } else {
      return value;
    }
  }

  const ignoreTag = { "data-type": "ignore" }
  // 目标套上其他组件
  const withSide = (children: any, side?: CustomUnionType, render?: CustomRenderType, commonProps?: GeneratePrams) => {
    const keyProps = { key: commonProps?.path, };
    const childs = typeof render === 'function' ? render?.(Object.assign({ children }, commonProps, keyProps)) : (React.isValidElement(children) ? React.cloneElement(children, keyProps) : children);
    const sideInstance = side && formRenderStore.componentInstance(side, Object.assign({}, commonProps, ignoreTag));
    const childsWithSide = React.isValidElement(sideInstance) ? React.cloneElement(sideInstance, Object.assign({ children: childs }, keyProps)) : childs;
    return childsWithSide;
  }

  // 生成子元素
  const generateChild = (name: string, path: string, field: GenerateFormNodeProps, parent?: GeneratePrams['parent']) => {
    if (field?.hidden === true || !field) return;
    const mergeOptions = Object.assign({}, typeof options === 'function' ? options(field) : options, formOptions);
    const mergeField = Object.assign({}, mergeOptions, field, { props: Object.assign({}, mergeOptions?.props, field?.props) })
    const commonParams = {
      name,
      path,
      field: mergeField,
      parent,
      form: form,
      formrender: formRenderStore
    }; // 公共参数
    const {
      readOnlyRender,
      hidden,
      props,
      type,
      typeRender,
      properties,
      footer,
      suffix,
      component,
      inside,
      outside,
      ...restField
    } = mergeField;
    // 是否有子节点
    const haveProperties = typeof properties === 'object';
    // 当前节点是否为只读
    const isReadOnly = restField?.readOnly === true;
    const footerInstance = formRenderStore.componentInstance(footer, commonParams);
    const suffixInstance = formRenderStore.componentInstance(suffix, commonParams);
    // 只读显示组件
    const readOnlyWidget = formRenderStore.componentInstance(readOnlyRender, commonParams);
    // 当前节点组件
    const fieldWidget = formRenderStore.componentInstance(typeRender || { type, props }, commonParams);
    // 节点的子组件
    const nestChildren = renderChildren(properties, inside, commonParams)
    const childs = haveProperties ?
      (React.isValidElement(fieldWidget) ? React.cloneElement(fieldWidget, { children: nestChildren, key: path, } as any) : nestChildren)
      : fieldWidget;
    const childsWithReadOnly = isReadOnly ? readOnlyWidget : childs;
    const fieldProps = Object.assign({
      key: path,
      name: name,
      onValuesChange: valuesCallback,
      footer: footerInstance,
      suffix: suffixInstance,
      component: component !== undefined ? formRenderStore.componentParse(component) : undefined,
    }, restField);
    // 没有子属性则节点为表单控件, 增加Form.Item表单域收集表单值
    const result = haveProperties ? childsWithReadOnly : (
      <Form.Item {...fieldProps}>
        {childsWithReadOnly}
      </Form.Item>
    );
    return withSide(result, outside, renderItem, commonParams)
  }

  // 渲染children
  const renderChildren = (properties: FormNodeProps['properties'], inside: CustomUnionType | undefined, current: GeneratePrams): any => {
    const { name, path, field } = current || {};
    const childs = Object.entries(properties || {})?.map(([key, childField], index: number) => {
      if (typeof key === 'string' || typeof key === 'number') {
        const joinPath = joinFormPath(path, key);
        const generateField = getEvalFieldProps(childField, joinPath);
        const joinName = generateField?.ignore === true ? name : joinFormPath(name, key);
        if (generateField) {
          generateField['index'] = index;
          return generateChild(joinName, joinPath, generateField, { name, path, field });
        }
      }
    });
    return withSide(childs, inside, renderList, current)
  }

  return renderChildren(properties, inside, { formrender: formRenderStore, form: form });
}

RenderFormChildren.displayName = 'Form.Children';
