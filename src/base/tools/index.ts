// 类型定义
import { Dictionary, Route } from "vue-router/types/router";
// store数据 不是vuex
import store from "../store";

export function cloneJSON(obj: any) {
    return JSON.parse(JSON.stringify(obj));
}

export function swapItems(arr: Array<any>, index1: number, index2: number) {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr;
}

export function uuid(len: number, radix: number) {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
        ""
    );
    var uuid = [],
        i: number;
    radix = radix || chars.length;

    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
    } else {
        // rfc4122, version 4 form
        var r: number;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
        uuid[14] = "4";

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | (Math.random() * 16);
                uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
            }
        }
    }

    return uuid.join("");
}

// 格式化时间
export function formatDate(date?: Date | number | string, fmt?: string) {
    if (null == date) return "";
    let fData: Date;
    if (isNaN(date as number)) {
        // 字符串或者Date
        fData = new Date(date);
    } else if (date.toString().length === 10) {
        // 秒
        fData = new Date((date as number) * 1000);
    } else {
        // 毫秒
        fData = new Date(+date);
    }
    // 转换失败
    if (isNaN(fData.getTime())) {
        return date;
    }
    // 默认返回秒
    if (!fmt) {
        return parseInt((fData.getTime() / 1000).toString());
    }
    // 返回毫秒
    if (fmt === "time") {
        return fData.getTime();
    }
    // 格式化
    var o: Dictionary<any> = {
        "M+": fData.getMonth() + 1, //month
        "d+": fData.getDate(),
        "h+": fData.getHours(),
        "m+": fData.getMinutes(), //minutes
        "s+": fData.getSeconds()
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(
            RegExp.$1,
            (fData.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length == 1
                    ? o[k]
                    : ("00" + o[k]).substr(("" + o[k]).length)
            );
    return fmt;
}
// 判断空对象
export function isEmpty(obj: Array<any> | Dictionary<any>) {
    if (!obj) return true;
    for (let k in obj) {
        return false;
    }
    return true;
}
// 生成路由地址
export function createURL(name: string = "") {
    let env = store.env;
    if (!env.sn) return "/";
    return "/" + (env.pid || "e") + "/" + env.sn + "/" + name;
}
// 获取随机数
export function random(min: number, max: number) {
    return parseInt((Math.random() * (max - min + 1)).toString()) + min;
}

// 获取url参数+hash串
export function getSubPath(route:Route){
    let url = "?";
    for (let key in route.query) {
        url += key + "=" + route.query[key] + "&";
    }
    url = url.substr(0, url.length - 1);
    url += route.hash;
    return url;
}

import other from "./other.js";
// 节流
export const throttle = other.throttle;
// 防抖 执行一次
export const debounce = other.debounce;
// 转blob
export const dataURLtoBlob = other.dataURLtoBlob;
