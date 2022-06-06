import { deepClone } from "./object";

export const arraySwap = <T = any>(arr: T[], preIndex: number, nextIndex: number) => {
  const clone = deepClone(arr);
  if (preIndex > nextIndex) {
    clone.splice(nextIndex, 0, arr[preIndex]);
    clone.splice(preIndex + 1, 1)
  } else if (preIndex < nextIndex) {
    clone.splice(nextIndex + 1, 0, arr[preIndex]);
    clone.splice(preIndex, 1)
  }
  return clone;
};
