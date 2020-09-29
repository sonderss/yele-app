<template>
<view class="pay-wrap m-top-20 p-lr-20 p-tb-20">
    <view v-if="isTitle" class="p-bottom-30 min-border-bottom">支付信息</view>
    <view :class="mTop ? 'm-top-30 pays':'pays'">
        <view class="pay" v-for="item in payM" :key="item.id">
            <min-radio :title="item.name" :icon="$minCommon.getIcon(item.id)" :label="item.id" v-model="payType" />
        </view>
    </view>
</view>
</template>

<script>
export default {
    props: {
        isTitle: {
            type: Boolean,
            default: true
        },
        mTop: {
            type: Boolean,
            default: true
        },
        scene: {
            type: [String, Number],
            default: 0
        }
    },
    data() {
        return {
            payM: [],
            payType: 1
        }
    },
    watch: {
        payType(a) {
            this.$emit('input', a)
        }
    },
    mounted() {
        // if (this.$store.state.status.payMethods.length >= 1) {
        //     this.payM = this.$store.state.status.payMethods
        //     this.payType = this.payM[0].id
        // }
        this.$minApi.getPayMethods({
            scene: this.scene
        }).then(res => {
            this.payM = res.list
            this.payType = this.payM[0].id
        })
    }

}
</script>

<style lang="scss" scoped>
.pay-wrap {
    background: #fff;
    border-radius: 10rpx;

    .pays {
        display: flex;
        // flex-wrap: column;
        // flex-wrap: wrap;
        // align-content: space-between;
        flex-direction: column;

        .pay {
            width: 50%;
        }
    }
}
</style>
