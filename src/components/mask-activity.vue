<template>
    <mask-slot :show="show">
        <div class="act"
             :class="status">
            <!-- not-start no-chance -->
            <div class="bg-imgResult">
                <div class="title">很抱歉</div>
            </div>
            <div class="content">
                <!-- <h2 class="title"
                    v-if="status==='end'">活动已结束</h2>
                <h2 class="title"
                    v-if="status==='not-start'">活动未开始</h2> -->
                <!-- <h2 class="title"
                    v-if="status==='no-chance'">机会已用完</h2> -->
                <p class="desc"
                    v-if="status=='not-login'">点击下方“立即报名”按钮才<br/>能赢取转盘机会，快去报名吧！</p>
                <p class="desc"
                   v-if="status==='end'">很抱歉活动已结束！</p>
                <p class="desc"
                   v-if="status==='not-start'">活动还未开始，敬请期待！</p>
                <p class="desc"
                   v-if="status==='no-chance'">您本周的抽奖机会<br />已用完</p>
                <div class="img">
                </div>
                <!-- <button class="button-mask"
                        @click="close"
                        v-if="status=='no-chance'">继续努力</button>
                <button class="button-mask"
                        v-else
                        @click="close">我知道了</button> -->
            </div>
            <div class="closeResult"
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
export default class MaskActivity extends mixins(MixinMask) {
    @Prop() remain!: number
    get status() {
        if (this.$data.act.data.activity_status === 'has_end')
            return 'end';
        if (this.$data.act.data.activity_status === 'no_start')
            return 'not-start';
       
        if (this.remain <= 0)
            return 'no-chance';
    }
}
</script>