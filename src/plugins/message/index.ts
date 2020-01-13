import { listenMessage, MessageType, MessageData } from "@base/message";
import Vue from "vue";

const Plugin = {
    install() {
        // 向edit发送第一条消息
        MessageData.postMessage(MessageType.empty);

        $(window).on("scroll", function() {
            // 发送消息
            MessageData.postMessage(MessageType.tapScroll, {
                scroll: { x: window.scrollX, y: window.scrollY }
            });
        });
    }
};

Vue.use(Plugin);

export { listenMessage, MessageType, MessageData };
