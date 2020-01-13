/**
 * 函数节流
 * 限制频率
 *
 * @export
 * @param {function} 函数
 * @param {number} 时间
 * @returns
 */
function throttle(action, delay) {
    var last = 0;
    return function () {
        var curr = +new Date();
        if (curr - last > delay) {
            action.apply(this, arguments);
            last = curr;
        }
    };
}

/**
 * 函数去抖
 * 只执行一次
 *
 * @export
 * @param {function} 函数
 * @param {number} 时间
 * @returns {function}
 */
function debounce(action, idle) {
    var last;
    return function () {
        var ctx = this,
            args = arguments;
        clearTimeout(last);
        last = setTimeout(function () {
            action.apply(ctx, args);
        }, idle);
    };
}

/**
 * @description: Base64字符串转二进制
 * @param {type}
 * @return:
 */
function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {
        type: mime
    });
}


export default {
    throttle,
    debounce,
    dataURLtoBlob
}
