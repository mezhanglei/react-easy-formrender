import { isEmpty } from "./type";

/**
 * 顺序执行数组中的函数或promise，返回对应的结果数组
 */
 export const asyncSequentialExe = (queues: any[], forbidFn?: Function) => {

    // 包装成Promise
    const promiseWrapper = (x: Promise<any> | ((...rest: any[]) => any)) => {
        if (x instanceof Promise) { // if promise just return it
            return x;
        }
        if (typeof x === 'function') {
            // if function is not async this will turn its result into a promise
            // if it is async this will await for the result
            return (async () => await x())();
        }
        return Promise.resolve(x)
    }

    // 异步队列顺序执行，可以根据条件是否终止执行
    const results: any[] = [];
    return queues?.reduce((lastPromise, currentPromise, index) => {
        return lastPromise?.then(async (res: any) => {
            if(res === null) return;
            results.push(res);
            const valid = await forbidFn?.(res, results, index);
            if (valid) {
                return null;
            } else {
                return promiseWrapper(currentPromise)
            }
        });
    }, promiseWrapper(queues?.[0])).then((res: any) => Promise.resolve([...results, res]?.filter((val) => !isEmpty(val))));
};