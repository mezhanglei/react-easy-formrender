import { copy } from 'copy-anything';
import compare from 'react-fast-compare';
import { isEmpty, isObject } from './type';

export function deepClone<T = any>(value: T) {
  return copy(value);
}

// 判断两个值是否相等
export function isEqual(a: any, b: any) {
  return compare(a, b);
}

// 深度合并两个对象
export const deepMergeObject = function (obj1: any, obj2: any) {
  const obj1Type = Object.prototype.toString.call(obj1);
  const obj2Type = Object.prototype.toString.call(obj2);
  if (isEmpty(obj1)) return obj2;
  if (obj1Type !== obj2Type) return obj1;
  const cloneObj = deepClone(obj1);
  for (let key in obj2) {
    if (isObject(cloneObj[key])) {
      cloneObj[key] = deepMergeObject(cloneObj[key], obj2[key]);
    } else {
      cloneObj[key] = obj2[key];
    }
  }
  return cloneObj;
};
