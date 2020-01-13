import { Dictionary } from "vue-router/types/router";
import Vue from "vue";

export function bgImgFilter(img: string) {
    if (img) img = `url(${img})`;
    return {
        backgroundImage: img
    };
}

export function styleFilter(styles: Dictionary<any>) {
    let img = styles.backgroundImage;
    if (img) img = `url(${img})`;
    return {
        ...styles,
        backgroundImage: img
    };
}

// 背景图
Vue.filter("bgImgFilter", bgImgFilter);
Vue.filter("styleFilter", styleFilter);
