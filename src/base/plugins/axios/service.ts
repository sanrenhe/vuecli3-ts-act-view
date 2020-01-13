import axios from "axios";
import { Toast } from "vant";
import store from "@/store";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


// 创建axios实例
const service = axios.create({
    baseURL: "",
    withCredentials: true, // 是否携带cookie信息
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    headers: {
        "X-Requested-With": "XMLHttpRequest"
    }
    // baseURL: process.env.baseURL || process.env.apiUrl || ""
    // timeout: 60 * 1000, // Timeout
});

service.defaults.headers.post["Content-Type"] = "application/json";

// request拦截器
service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        Promise.reject(error);
    }
);

// respone拦截器
service.interceptors.response.use(
    response => {
        if (
            response.data.status === "fail" &&
            (response.data.code === 1401 || response.data.code === 1402)
        ) {
            store.auth.code = response.data.code;
            store.auth.show = true;
            store.act.data.is_oauth = false;
        }
        return response.data;
    },
    errors => {
        const error = errors.response;
        if (!error) return Promise.reject(error);
        if (error.status == 302 || error.status == 401) {
            Toast("授权中...");
            window.setTimeout(() => {
                window.location.reload();
            }, 1500);
        }
        if (error.status == 500) {
            Toast.fail("网络错误");
        }
        return Promise.reject(error);
    }
);

export default service;
