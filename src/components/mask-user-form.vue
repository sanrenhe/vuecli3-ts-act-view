<template>
    <mask-slot :show="show">
        <div class="prize-form">
            <div class="title">领奖信息</div>
            <div class="detail"
                 v-edit-disabled>
                <div class="item user">
                    <input class="input"
                           type="text"
                           name="name"
                           v-model="userInfo.name"
                           @blur="toTop"
                           placeholder="请填写您的姓名">
                </div>
                <div class="item phone">
                    <input class="input"
                           type="tel"
                           name="phone"
                           v-model="userInfo.phone"
                           @blur="toTop"
                           placeholder="请填写您的手机号码">
                </div>
                <div class="item address">
                    <input class="input"
                           type="text"
                           name="address"
                           v-model="userInfo.address"
                           @blur="toTop"
                           placeholder="请填写收货地址">
                </div>
            </div>
            <div class="close"
                 @click="close">
                <span class="ur-close"></span>
            </div>
        </div>
    </mask-slot>
</template>

<script lang="ts">

import MixinMask from './mixin-mask.vue'
import Component, { mixins } from 'vue-class-component';
import api from '../api'
import { Prop } from 'vue-property-decorator';
import { Dictionary } from "vue-router/types/router";
import controller from '../controller';

@Component
export default class MaskUserForm extends mixins(MixinMask) {
    // 领奖用户信息
    @Prop()
    userInfo!: Dictionary<any>

    private disabled = false;

    toTop() {
        setTimeout(function () {
            //滚动到顶部
            window.scrollTo(0, 0);
        }, 100);
    }
}
</script>