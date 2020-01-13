import { Component, Vue } from "vue-property-decorator";

// 类型别名
type regFns = Array<Function | string>;
declare var $: any;
@Component({})
export default class ViewBase extends Vue {
    // 转换参数
    private fnarrify(arr: regFns) {
        const fn = () => {
            for (let k of arr) {
                if (typeof k === "string") {
                    (<Function>this[k])();
                    continue;
                }
                (<Function>k)();
            }
        };
        if (this.$data.env.pid) {
            return fn();
        }
        return fn;
    }

    // edit模式的数据初始事件
    regEditInit(arr: regFns) {
        const fn = this.fnarrify(arr);
        if (!fn) return;

        if (this.$data.act.status === "success") {
            return fn();
        }

        this.$root.$off("edit-init");
        this.$root.$on("edit-init", fn);
    }
    // edit模式的数据更新事件
    regEditUpdate(arr: regFns) {
        const fn = this.fnarrify(arr);
        if (!fn) return;

        this.$root.$off("edit-update");
        this.$root.$on("edit-update", fn);

        if (this.$data.act.status === "success") {
            this.$root.$emit("edit-update");
        }
    }
}
