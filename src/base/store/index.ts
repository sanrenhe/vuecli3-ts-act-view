const store = {
    // 广告数据
    ad: {
        status: <string | number>0, // 0 1完成 -1加载
        data: <any>null
    },
    // 运行时参数
    env: {
        pid: "",
        sn: "",
        err: "",
        ...process.env
    },
    auth: {
        code: "",
        show: false
    },
    // 活动接口数据ActivityInfo
    act: {
        status: <string | number>"",
        data: <any>null
    },
    // 编辑时的数据
    edit: {
        status: <string | number>"",
        data: <any>null
    },
    // 用户信息
    user: {
        data: <any>null,
        status: <string | number>""
    }
};

export default store;
