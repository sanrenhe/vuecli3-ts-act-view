import baseApi, { apiHost } from "@base/api";

const api = {
    acceptInfo: apiHost + "/activity/wheeletc/acceptInfo",
    getWinInfo: apiHost + "/activity/wheeletc/getWinInfo",
    behavior: apiHost + "/activity/ccbtj/behavior"
};

export default {
    ...baseApi,
    act: api
};
