import { Dictionary } from "vue-router/types/router";

export function success(data: any, message?: string) {
    return {
        code: "",
        data,
        message: message || "成功",
        status: "success"
    };
}
export function fail(res: Dictionary<any>) {
    return {
        code: "",
        message: "失败",
        status: "fail",
        ...res
    };
}

// 函数签名
function promisify(fn: Function): (obj?: Dictionary<any>) => Promise<unknown>;
function promisify(data: any): Promise<unknown>;
// 函数重载 转换Promise对象
function promisify(fn: any) {
    // 直接返回Promise
    if (typeof fn !== "function") {
        return new Promise((resolve, reject) => {
            let res = fn;
            return resolve(res);
            // if (res.status === "success") {
            //     return resolve(res);
            // }
            // return reject(res);
        });
    }
    // 传函数伪柯里化
    return function(obj: Dictionary<any> = {}) {
        return new Promise((resolve, reject) => {
            let res = fn(obj);
            return resolve(res);
            // if (res.status === "success") {
            //     return resolve(res);
            // }
            // return reject(res);
            // let { success, fail } = obj;
            // obj.success = function(res: Dictionary<any>) {
            //     typeof success === "function" && success(res);
            //     //成功
            //     resolve(res);
            // };
            // obj.fail = function(res: Dictionary<any>) {
            //     typeof fail === "function" && fail(res);
            //     //失败
            //     reject(res);
            // };
            // if (typeof obj.complete !== "function") {
            //     obj.complete = function() {};
            // }
            // // 改变obj的success和fail
            // // 在原函数内需要执行回调函数而触发Promise
            // fn(obj);
        });
    };
}
// 增加finally
// Promise.prototype.finally = function(callback: () => void) {
//     let P:any = this.constructor;
//     return this.then(
//         (value: any) => P.resolve(callback()).then(() => value),
//         (reason: any) =>
//             P.resolve(callback()).then(() => {
//                 throw reason;
//             })
//     );
// };

export default promisify;
