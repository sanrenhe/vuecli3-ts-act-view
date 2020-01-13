<template>
    <div>
        <router-view />
    </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Inject } from 'vue-property-decorator';
import ViewBase from './base'

@Component
export default class Index extends ViewBase {

}
</script>
<style lang='scss'>
@import "./css/style.scss";
</style>
