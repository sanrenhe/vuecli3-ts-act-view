<template>
    <aside class="ur-mask"
           v-if="show"
           @click="click">
        <slot></slot>
    </aside>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class MaskSlot extends Vue {
    @Prop() private show!: boolean;
    click() {
        this.$emit('click');
    }
}
</script>