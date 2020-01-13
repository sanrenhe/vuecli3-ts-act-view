import Vue from "vue";
// 空白占位
Vue.directive("long-tap", {
    bind(el, binding) {
        el.addEventListener("touchstart", () => {
            touchstartHandler(binding.value);
        });
        el.addEventListener("touchmove", touchmoveHandler);
        el.addEventListener("touchend", touchendHandler);
    }
});

let touchFlag = 0;

function touchstartHandler(callback: any) {
    clearTimeout(touchFlag); //清除定时器
    touchFlag = 0;
    touchFlag = setTimeout(() => {
        if (typeof callback === "function") callback();
    }, 600); //这里设置定时
}
//手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
function touchendHandler() {
    clearTimeout(touchFlag);
    // if (touchFlag != 0) {
    //这里写要执行的内容（尤如onclick事件）
    // }
}
//如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
function touchmoveHandler() {
    clearTimeout(touchFlag); //清除定时器
    touchFlag = 0;
}
