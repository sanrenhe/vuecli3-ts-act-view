<template>
    <mask-slot :show="show">
        <div class="nochance"
             :class="status">
            <div class="bg-imgResult">
            </div>
            <div class="content">
                <button class="button-mask"
                        @click="changeStatus"
                        v-if="status!='m-rule'">点击查看</button>
                  <button class="button-mask"
                        @click="close"
                        v-else>返回首页</button>
            </div>
            <div class="closeResult" v-if="status!='m-rule'"
                 @click="close">
                <span class="ur-close"></span>
            </div>
        </div>
    </mask-slot>
</template>

<script lang="ts">
import { Prop } from 'vue-property-decorator';
import MixinMask from './mixin-mask.vue'
import Component, { mixins } from 'vue-class-component';

@Component
export default class MaskPic extends mixins(MixinMask) {
    @Prop() islogin!: number
    get status() {
        if (this.islogin==-1)
            return 'm-rule';

    }
    changeStatus(){
        this.$emit("changeStatus");
    }
}
</script>