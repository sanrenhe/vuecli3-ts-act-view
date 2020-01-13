import Vue from "vue";
import store from "../store";
// 空白占位
Vue.directive("edit-disabled", {
    bind(el, binding) {
        if (!store.env.pid) {
            el.style.pointerEvents = "none";
        }
    }
});
