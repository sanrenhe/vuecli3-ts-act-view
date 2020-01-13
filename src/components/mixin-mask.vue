<script lang="ts">

import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import MaskSlot from './mask-slot.vue';


@Component({
    components: {
        MaskSlot
    },
})
export default class MixinMask extends Vue {
    @Prop({ default: false }) show!: boolean;
    scrollX = 0;
    scrollY = 0;
    @Watch('show')
    restoreScroll(show: boolean) {
        if (show) {
            this.scrollY = window.scrollY;
            this.scrollX = window.scrollX;
        } else {
            window.scroll(this.scrollX, this.scrollY);
        }
    }
    // 关闭层
    close(args?: any) {
        this.$emit("update:show", false);
        this.$emit("close", args);
    }
}

</script>
