import Vue from "vue";
// 空白占位
Vue.directive("blank", (el, binding) => {
    if (binding.value) {
        el.style.visibility = "hidden";
        el.style.pointerEvents = "none";
        // 可以直接设置高度 px
        // 否则自动填充&nbsp;
        let h: string | number | undefined = binding.arg,
            rpx = Vue.$rpx;
        if (h) {
            el.style.height = +h / rpx + "rem";
        } else {
            rBlank(el);
        }
    }
});

function rBlank(el: Element) {
    if (el.childElementCount === 0) {
        el.innerHTML = "&nbsp;";
        return;
    }
    for (var e of el.children) {
        rBlank(e);
    }
}
