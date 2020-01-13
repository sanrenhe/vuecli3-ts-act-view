import Vue from "vue";
import { MessageData, MessageType } from "../message";
import store from "../store";
// 传递编辑数据
Vue.directive("edit-tap", {
    bind(el, binding) {
        if (store.env.pid) return;
        let value = binding.value || {};
        if (typeof value !== "object" || Array.isArray(value)) {
            throw new Error("binding value 格式错误");
        }
        value.name = value.name || binding.arg;
        $(el)
            .on("mouseover", function() {
                // 发送消息
                MessageData.postMessage(MessageType.tapHover, {
                    offset: getOffset(el),
                    scroll: { x: window.scrollX, y: window.scrollY },
                    ...value
                });
                return false;
            })
            .on("click", function() {
                // 发送消息
                MessageData.postMessage(MessageType.tapClick, {
                    offset: getOffset(el),
                    scroll: { x: window.scrollX, y: window.scrollY },
                    ...value
                });
                return false;
            });
    }
});

function getOffset(el: HTMLElement) {
    let $el = $(el);
    let offset = $el.offset() as JQuery.Coordinates;
    return {
        w: el.offsetWidth,
        h: el.offsetHeight,
        x: offset.left,
        y: offset.top
    };
}
