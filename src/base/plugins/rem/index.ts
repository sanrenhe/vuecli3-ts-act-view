import { VueConstructor } from "vue";
import store from "../../store";

const baseSize = 100;
function setRem(rpx?: number) {
    const scale = document.documentElement.clientWidth / 375;
    document.documentElement.style.fontSize =
        (rpx || baseSize) * scale + "px";
}

export default {
    install(vue: VueConstructor, options: { px: number; [key: string]: any }) {
        const px = options.px;
        // root px 通过vue访问
        vue.$rpx = vue.prototype.$rpx = px;
        setRem(px);
        setTimeout(() => {
            setRem(px);
        }, 1000);
        window.addEventListener("resize", () => {
            setRem(px);
        });
        // 编辑区隐藏滚动条
        if (!store.env.pid) {
            document.documentElement.classList.add("hidden-scrollbar");
        }
    }
};
