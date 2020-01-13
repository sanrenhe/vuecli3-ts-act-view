import commonApi from "./common";
import drawApi from "./draw";
import helpApi from "./help";

export const apiHost = process.env.VUE_APP_HD_HOST || "";

let _DrawApi: any = drawApi;
for (let k in _DrawApi) {
    _DrawApi[k] = apiHost + _DrawApi[k];
}

let _CommonApi: any = commonApi;
for (let k in _CommonApi) {
    _CommonApi[k] = apiHost + _CommonApi[k];
}

let _HelpApi: any = helpApi;
for (let k in _HelpApi) {
    _HelpApi[k] = apiHost + _HelpApi[k];
}

export default {
    /**
     * 通用
     */
    common: commonApi,
    /**
     * 抽奖相关
     */
    draw: drawApi,
    /**
     * 助力相关
     */
    help: helpApi
};
