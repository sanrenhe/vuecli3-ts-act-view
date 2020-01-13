import store, { env } from "../store";
import api from "../api";
import promisify, { success } from "@base/tools/promisify";

import Vue from "vue";
import { Dictionary } from "vue-router/types/router";
import AV from 'leancloud-storage';

// 以下没有edit模式

// 获取活动信息
export function getActivityInfo(options?: Dictionary<any>) {
    // 这个比较特殊一点 edit的时候就不调用了 查看main.ts
    AV.init({
        appId: "TBk0Vh6PATq4y8t7Mnl0FSkP-gzGzoHsz",
        appKey: "4jfp4zUMcMMMmUhMfzLaNNlm",
        serverURLs: "https://tbk0vh6p.lc-cn-n1-shared.com"
    });

    return new Promise((resolve, reject) => {
        let query = new AV.Query('ActEditData');
        query.get('5e15457f21460d006a625edb').then((todo: Dictionary<any>) => {
            resolve(todo._serverData);
        });
    })
}

export default {
    getActivityInfo
};
