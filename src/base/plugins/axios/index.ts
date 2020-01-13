import { PluginObject } from "vue";
import service from "./service";
import http from "./http";

const Plugin: PluginObject<any> = {
    install: vue => {
        vue.$axios = service;
        vue.$http = http;
        vue.prototype.$axios = service;
        vue.prototype.$http = http;
    }
};

export default Plugin;

// Plugin.install = Vue => {
//     Vue.$axios = service;
//     window.axios = service;
//     Object.defineProperties(Vue.prototype, {
//         $axios: {
//             get() {
//                 return service;
//             }
//         },
//         $http: {
//             get() {
//                 return http;
//             }
//         }
//     });
// };

// export default {
//     install(Vue: VueConstructor) {
//         Vue.prototype.$axios = service;
//         Vue.prototype.$http = http;
//     }
// };
