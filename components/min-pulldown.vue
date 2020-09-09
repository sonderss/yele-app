<template>
<view class="pull_down m-bottom-30">
    <view v-if="isFlag" class="s-pull-up-wrap m-bottom-30">
        <view :class="loading ? 's-pull-loading-icon s-pull-loading-rotate' : '' "></view>
        <view class="f24">{{desc}}</view>
    </view>
</view>
</template>

<script>
export default {
    props: {
        isFlag: {
            type: Boolean,
            default: false
        },
        desc: {
            type: String,
            default: "加载中"
        },
        loading: {
            type: Boolean,
            default: true
        }
    }
};
</script>

<style lang="scss" scoped>
.s-pull-up-wrap {
    width: 100%;
    height: 50rpx;
    display: flex;
    justify-content: center;
    align-items: center;

    /* 旋转loading */
    .s-pull-loading-icon {
        width: 30rpx;
        height: 30rpx;
        display: inline-block;
        vertical-align: middle;
        border-radius: 50%;
        border: 2rpx solid #969799;
        border-bottom-color: transparent;
        box-sizing: border-box;

        &:first-child {
            margin-right: 16rpx;
        }
    }

    /* 旋转动画 */
    .s-pull-loading-rotate {
        animation: s-pull-loading-rotate 0.6s linear infinite;
    }

    @keyframes s-pull-loading-rotate {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
}
</style>
