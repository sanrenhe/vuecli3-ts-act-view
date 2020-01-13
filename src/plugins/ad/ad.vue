<template>
    <aside class="e-e"
           v-edit-tap="{name:'ad',pos}"
           v-if="curAD && curAD.is_show==1">
        <a :href="curAD.img_link"
           v-edit-disabled>
            <img :src="curAD.img_url"
                 :alt="curAD.img_title">
        </a>
    </aside>
</template>
<script type="text/babel">
import api from "@/api";
export default {
    computed: {
        curAD() {
            let data = this.$root.ad.data;
            if (!data) return null;
            let curAD = data.find(ad => {
                return ad.position == this.pos;
            });
            return curAD;
        },
    },
    props: ['pos'],
    created() {
        // edit模式 不请求
        if (!this.env.pid) return;
        // 1：已有广告数据
        // -1：加载中
        // 0：没有数据
        if (this.$root.ad.status !== 0) return;
        // 标识加载中
        this.$root.ad.status = -1;
        // 获取广告数据
        this.$http.get(api.common.getAdvertList).then(res => {
            if (res.status === 'success') {
                this.$root.ad.data = res.data;
                this.$root.ad.status = 1;
            } else {
                this.$root.ad.status = 0;
            }
        }).catch(err => {
            this.$root.ad.status = 0;
        });
    }
};
</script>