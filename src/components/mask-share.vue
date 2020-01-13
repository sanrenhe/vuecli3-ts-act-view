<template>
    <mask-slot :show="show"
               :style="{ backgroundColor:'rgba(0,0,0,.7)'}"
               @click="close">
        <div class="share">
            <div class="img"></div>
            <p class="txt1">点击分享，邀请好友抽奖</p>
            <p class="txt2">{{drawInfo.forward_person_num}}位好友参加即可赢取{{drawInfo.forward_draw_count}}次抽奖机会</p>
            <p class="txt3">快快分享吧！</p>
        </div>
    </mask-slot>
</template>

<script lang="ts">

import MixinMask from './mixin-mask.vue'
import Component, { mixins } from 'vue-class-component';
import controller from '../controller'
import { Dictionary } from "vue-router/types/router";

@Component
export default class MaskShare extends mixins(MixinMask) {

    drawInfo: {} = {}

    created() {
    }
}
</script>