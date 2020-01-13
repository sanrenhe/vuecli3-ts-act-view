import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 本地数据
import store, { env } from './store'
// axios
import "./plugins/axios"
// edit消息
import { listenMessage, MessageType, MessageData } from "./plugins/message";
// rem.js计算
import "./plugins/rem";

// v-blank
import "@base/directive";
// 背景图 样式 filter
import "@base/filters";
// vant ui组件
import "./plugins/vant";
// 自定义广告组件 <ad :pos>
import "./plugins/ad";
// console
Vue.config.productionTip = false;
// 通用方法
import { formatDate, isEmpty, createURL, debounce } from "@base/tools";
// mixin 通用数据
Vue.mixin({
  data: () => {
      return {
          // 参数等
          env,
          // 活动数据
          act: store.act,
          // 用户
          user: store.user,
          // 预设
          loaded: false,
      };
  }
});

// 实例
window.VIEW = new Vue({
    data: { ...store },
    router,
    render: h => h(App),
    created() {
        // edit 模式开始监听消息，会发送一条消息给edit标识开始
        listenMessage(this.msgCallback);
    },
    methods: {
        updateStore(data: any, type: MessageType) {
            // edit
            store.edit.status = type;
            store.edit.data = data;
            // act
            store.act.data = data.activity;
            store.act.status = "success";
            // ad
            store.ad.data = data.advert;
            store.ad.status = 1;
        },
        debounceStore: debounce(function(data: any) {
            this.updateStore(data, MessageType.update);
            this.$emit("edit-update");
        }, 500),
        msgCallback(res: MessageData, e: MessageEvent) {
            // _HDCRM_: true, // 标识
            // type: type,
            // data: data
            // 1 listen
            // 2 changed
            // 3 emit root events
            // 3.1 page created reg events on root
            // 3.2 destroyed uninstall events
            // 4 update page
            console.log(res);
            // edit首次发送消息
            if (res.type === MessageType.init) {
                this.updateStore(res.data, res.type);
                this.$emit("edit-init");
                this.$emit("edit-update");
                return;
            }
            // edit数据更新
            if (
                res.type === MessageType.update &&
                store.edit.status !== MessageType.empty
            ) {
                this.debounceStore(res.data);
                return;
            }
            // edit导航
            if (res.type === MessageType.edit) {
                if (res.data.back) {
                    this.$router.back();
                    return;
                }
                if (res.data.url) {
                    this.$router.push(res.data.url);
                    return;
                }
            }
        }
    },
    // 注入一些辅助函数
    provide: {
        // 格式化时间
        formatDate,
        // 判断空对象
        isEmpty,
        // 生成路由地址
        createURL
    }
}).$mount("#app");
