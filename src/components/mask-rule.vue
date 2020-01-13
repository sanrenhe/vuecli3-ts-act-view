<template>
    <mask-slot :show="show">
        <div class="rule">
            <div class="wrap">
                <h2 class="title">活动规则</h2>
                <div class="content">
                    <div v-if="!isEmpty(prizeList)">
                        <div class="sub-title">
                            <span>活动奖品</span>
                        </div>
                        <p class="item"
                           v-for="(item,index) in prizeList"
                           :key="index">
                            {{item.short_name}}
                            <template v-if="item.short_name&&item.name">：</template>
                            {{item.name}}
                        </p>
                    </div>
                    <div class="sub-title">
                        <span>活动时间</span>
                    </div>
                    <p>
                        开始时间：{{formatDate(act.data.start_time,'yyyy年MM月dd日 hh:mm')}}
                        <br>
                        结束时间：{{formatDate(act.data.end_time,'yyyy年MM月dd日 hh:mm')}}
                    </p>
                    <div class="sub-title">
                        <span>活动说明</span>
                    </div>
                    <div class="desc"
                       v-html="act.data.rules"></div>
                </div>
            </div>
            <div class="close"
                 @click="close">
                <div class="ur-close"></div>
            </div>
        </div>
    </mask-slot>
</template>

<script lang="ts">
import { Inject, Prop } from 'vue-property-decorator';

import MixinMask from './mixin-mask.vue'
import Component, { mixins } from 'vue-class-component';
import { Dictionary } from "vue-router/types/router";

@Component
export default class MaskRule extends mixins(MixinMask) {
    @Prop() prizeList!: Dictionary<any>
    @Inject() formatDate!: Function
    @Inject() isEmpty!: Function
}
</script>