export function debounce(fn: any, time: number = 500): any {
  let timeout: any = null;
  return function (...args: any[]) {
    if (timeout !== null) clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn?.(...args);
    }, time);
  };
};
