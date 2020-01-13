/**
 * 微信分享
 */

// import wx from "weixin-js-sdk";

// import $ from "jquery";
// if (window.wx === undefined) {
//     $.ajax({
//         url: "//res2.wx.qq.com/open/js/jweixin-1.4.0.js",
//         dataType: "script",
//         cache: true
//     });
// }

export default wxShare;


let ios_href;
const is_ios = (/\(i[^;]+;( U;)? CPU.+Mac OS X/.test(navigator.userAgent));

function wxShare(options) {
    if (window.wx === undefined) {
        return;
    }
    if (!/MicroMessenger/i.test(window.navigator.userAgent)) {
        return;
    }
    this.configUrl =
        "https://wx.kerlala.com/api/wechat/jssdk/wxd52048ac75a8da45/?callback=jsonp&jssdk=1"; // 获取微信jssdk授权参数
    this.share = {
        title: "", // 分享标题
        desc: "", // 分享描述
        link: "", // 分享链接
        imgUrl: "" // 分享缩略图
    };
    this.jsApiList = [
        "updateAppMessageShareData",
        "updateTimelineShareData",
        "onMenuShareAppMessage",
        "onMenuShareTimeline"
    ];
    this.isInit = false;
    // 路由守卫获取到的是上一个页面的
    this.href = location.href;
    $.extend(this, options);

    // 首次赋值
    if (!ios_href && is_ios) {
        ios_href = location.href;
    }
    // ios环境签名
    if (ios_href) {
        this.href = ios_href;
    }

    this.init();
    return this;
}

wxShare.prototype = {
    init() {
        if (!this.isInit) {
            this.wxInit();
        } else {
            this.update();
        }
    },
    wxInit() {
        $.ajax({
            url: this.configUrl,
            type: "GET",
            data: {
                url: this.href
            },
            dataType: "jsonp",
            success: (res) => {
                if (res.error_code == 0) {
                    wx.config({
                        debug: false,
                        appId: res.data.appid,
                        timestamp: res.data.timestamp,
                        nonceStr: res.data.noncestr,
                        signature: res.data.signature,
                        jsApiList: this.jsApiList
                    });
                    wx.ready(() => {
                        this.update();
                    });
                } else {
                    console.log(res.error_msg);
                }
            },
            complete: () => {
                this.isInit = true;
            }
        });
    },
    update() {
        wx.updateAppMessageShareData({
            ...this.share,
            fail: (err) => {
                wx.onMenuShareAppMessage(this.share)
            }
        });
        wx.updateTimelineShareData({
            ...this.share,
            fail: (err) => {
                wx.onMenuShareTimeline(this.share)
            }
        });
        wx.error(err => {
            console.warn(err);
        });
    }
};
