<template>
    <mask-slot :show="show">
        <div class="result"
             :class="{lose:!prize.win,win:prize.win}">
            <div class="bg-imgResult">
                <div class="title"
                     v-if="prize.win">恭喜您</div>
                <div class="title"
                     v-else>很遗憾</div>
            </div>
            <div class="content">
                <div class="prizeInfo">
                    <div class="head">
                        <img v-if="user.status==='success'"
                             :src="user.data.headimgurl" />
                    </div>
                    <div class="tip"
                         v-html="prize.message"></div>
                    <div class="title"
                         v-if="prize.win">{{prize.data.prizename}}!</div>
                    <figure class="prize"
                            v-if="prize.win">
                        <img :src="prize.data.pic_url">
                    </figure>
                    <p v-if="prize.win">好礼已经在路上了咯！</p>
                    <div class="tip2 remain">
                        您还有<span>{{remain}}</span>次抽奖机会
                    </div>
                </div>
                <router-link to="./index"
                             @click.native="close"
                             class="button-mask"
                             v-if="remain>0">再来一次</router-link>
                <router-link to="./index"
                             @click.native="close"
                             class="button-mask"
                             v-else>返回首页</router-link>
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
import { Dictionary } from "vue-router/types/router";
import MixinMask from './mixin-mask.vue'
import Component, { mixins } from 'vue-class-component';

@Component
export default class MaskResult extends mixins(MixinMask) {
    @Prop() prize!: Dictionary<any>
    @Prop() remain!: number

    //  prizename	奖品名称	是	[string]
    //  pic_url	奖品图片	是	[string]
    //  prize_type	奖品类型	是	[string]
    //  prize_desc	奖品描述	是	[string]
    //  win_id	中奖ID	是	[string]
    //  prize_id	奖品ID	是	[string]

}
</script>