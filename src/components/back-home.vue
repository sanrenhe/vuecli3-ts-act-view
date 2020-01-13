<template>
    <router-link :to="createURL()"
                 class="fix-to-home">返回首页</router-link>
</template>



<script lang="ts">

import { Component, Vue, Inject } from 'vue-property-decorator';

@Component
export default class BackHome extends Vue {
    @Inject() createURL!: Function
}
</script>
