<template>
    <mask-slot :show="act.data.activity_white_status == 2"
               :style="{ backgroundColor:'rgba(0,0,0,.7)'}">

        <div class="act no-chance">
            <div class="bg-imgResult">
                <div class="title">很遗憾</div>
            </div>
            <div class="content">
                <div class="black-list">
                    <p class="text">{{act.data.templet_set.no_white_text}}</p>
                </div>
            </div>
        </div>
       
    </mask-slot>
</template>

<script lang="ts">

import MixinMask from './mixin-mask.vue'
import Component, { mixins } from 'vue-class-component';

@Component
export default class MaskBlackList extends mixins(MixinMask) {
}
</script>