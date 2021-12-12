/**
 * aop包装函数：在目标函数前面或后面添加可以执行的方法
 * 使用方式:
 * const aop = new AopFactory(fn);
 * const aopBeforeFn = aop.addBefore(() => coonsole.log('在目标前面执行'))
 * const aopAfterFn = aop.addAfter(() => coonsole.log('在目标后面执行'))
 * 使用aopBeforeFn或aopAfterFn替代原函数fn
 */
export declare class AopFactory {
    private originFun;
    private beforeFun?;
    private afterFun?;
    constructor(originFun: Function);
    init(originFun: Function): (...args: any[]) => any;
    addBefore(fn: (...args: any[]) => boolean | undefined): Function | null;
    addAfter(fn: (...args: any[]) => void): Function | null;
}
