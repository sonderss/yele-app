<template>
<view class="submit-success p-lr-30">
    <image class="icon" src="/static/images/success.png" alt="success" />
    <view class="title">提交成功</view>
    <view class="tips">请尽快电联相关人员审核</view>
    <view class="tips">{{timer}}</view>
    <min-btn class="min-btn" @click="toAdmin">回到台</min-btn>
</view>
</template>

<script>
export default {
    name: 'redsubmit-success',
    navigate: ['navigateTo', 'redirectTo'],
    data() {
        return {
            timer: ''
        }
    },
    mounted() {
        this.timer = this.$minCommon.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
        console.log()
    },
    methods: {
        toAdmin() {
            // this.$minRouter.push({
            //     name: 'platform-admin'
            // })
            this.$minRouter.push({
                name: 'redplatform-detail',
                type: "redirectTo",
                params: {
                    id: this.$parseURL().desk_id,
                    date: this.$store.state.status.date.date
                },
            })
            // uni.navigateBack({
            //     delta: 2
            // });
        }
    }
}
</script>

<style lang="scss">
.submit-success {
    .icon {
        display: block;
        width: 200rpx;
        height: 200rpx;
        margin: 0 auto;
        margin-top: 117rpx;
    }

    .title {
        font-size: 32rpx;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        text-align: center;
        margin-top: 38rpx;
        margin-bottom: 40rpx;
    }

    .tips {
        font-size: 28rpx;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 40rpx;
        text-align: center;
    }

    .min-btn {
        margin-top: 80rpx;
    }
}
</style>
