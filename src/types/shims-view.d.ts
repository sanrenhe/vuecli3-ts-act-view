/// <reference types="jquery" />

import { VueConstructor } from "vue";
import { AxiosInstance } from "axios";
declare global {
    interface Window {
        axios: AxiosInstance;
        http: any;
        [key: string]: any;
        VIEW: any;
    }
}
declare module "vue/types/vue" {
    interface Vue {
        $axios: AxiosInstance;
        $http: any;
        $rpx: number;
        [key: string]: any;
    }
    interface VueConstructor {
        $axios: AxiosInstance;
        $http: any;
        $rpx: number;
        [key: string]: any;
    }
}

import { Toast } from "vant/types/toast";
import { Dictionary } from "vue-router/types/router";
declare module "vue/types/vue" {
    interface Vue {
        // $message: ElMessage;
        // $modal: any;
        $toast: Toast;
        env: {
            pid: string;
            sn: string;
            VUE_APP_IMG_HOST: string;
            VUE_APP_HD_HOST: string;
        };
        act: {
            status: string;
            data: Dictionary<any>;
        };
        auth: {
            code: string;
            show: boolean;
        };
        edit: {
            status: string;
            data: Dictionary<any>;
        };
        user: {
            [key: string]: any;
        };
        loaded: boolean;
    }
}
