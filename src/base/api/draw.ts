export default {
    /**
     * @name 抽奖组件统计信息
     * @param null
     * @type GET
     */
    getTongjiData: "/Component/draw/getTongjiData",
    /**
     * @name 获取奖品信息
     * @param prize_id 奖品ID
     * @type GET
     */
    getPrizeInfo: "/Component/draw/getPrizeInfo",
    /**
     * @name 获取奖品列表
     * @param null
     * @type GET
     */
    getPrizeList: "/Component/draw/getPrizeList",
    /**
     * @name 获取中奖列表
     * @param null
     * @type GET
     */
    getWinList: "/Component/draw/getWinList",
    /**
     * @name 获取我的中奖列表
     * @param null
     * @type GET
     */
    getMyWinList: "/Component/draw/getMyWinList",
    /**
     * @name 获取中奖信息
     * @param win_id 中奖ID
     * @type GET
     */
    getWinInfo: "/Component/draw/getWinInfo",
    /**
     * @name 用户抽奖
     * @param null
     * @type POST
     */
    commonDrawPrize: "/Component/draw/commonDrawPrize",
    /**
     * @name 用户抽奖组件信息
     */
    getUserExtInfo: "/Component/draw/getUserExtInfo",
    /**
     * @name 用户领奖（废弃）
     * @param
     *      name 姓名
     *      phone 电话
     *      address 地址
     *      idcard 身份证
     *      winid 中奖ID
     * @type POST
     */
    acceptWinPrize: "/Component/draw/acceptWinPrize",

    // 领取红包 winId
    acceptMoneyPrize:'/Component/draw/acceptMoneyPrize',
    /**
     * @name 领取实物
     * @param
     *      name 姓名
     *      phone 电话
     *      address 地址
     *      idcard 身份证
     *      winId 中奖ID
     * @type POST
     */
    acceptSwPrize:'/Component/draw/acceptSwPrize',
    /**
     * @name 获取活动抽奖配置信息
     * @type GET
     */
    getDrawInfo:'/Component/draw/getInfo',
    // 获取活动奖品每天发放进度
    getDayGrantLevel:'/Component/draw/getDayGrantLevel',
};
