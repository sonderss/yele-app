<template>
<view class="min-modal min-modal-flex" :class="{'min-modal-show': isShow}" @touchmove.stop.prevent="()=>{}">
    <view class="min-modal-mask" @touchmove.stop="()=>{}"></view>
    <view class="test">123</view>
</view>
</template>

<script>
export default {
    name: 'min-modal',
    props: {
        isShow: false
    },
    created() {
        this.show = this.isShow
    },
    data() {
        return {
            show: false
        }
    },
    methods: {
        handleHide() {
            this.show = false
        }
    }
}
</script>

<style lang="scss" scoped>
.min-modal-flex {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
}

.min-modal,
.min-modal-mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}

.min-modal {
    z-index: 1000;
    visibility: hidden;
}

.min-modal-show {
    visibility: visible;
}

.min-modal-mask {
    background: rgba(0, 0, 0, 0.5);
}

.test {
    color: green;
    z-index: 999;
    width: 90vw;
    height: 90vh;
    background: red;
    padding: 20rpx;
    margin: 40rpx;
}
</style>
