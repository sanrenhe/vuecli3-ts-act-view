import service from "./service";
import { AxiosRequestConfig } from "axios";
import store from "@/store";

const http = {
    get(url: string, data: any) {
        return service.get(url + "/" + store.env.pid + "/" + store.env.sn, {
            params: data
        });
    },
    post(url: string, data: any) {
        return service.post(
            url + "/" + store.env.pid + "/" + store.env.sn,
            data
        );
    }
};

export default http;
