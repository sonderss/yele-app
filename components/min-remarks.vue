<template>
<view class="min-remarks">
    <view class="reason-wrap m-top-20 p-lr-20 p-tb-20">
        <view class="p-bottom-30" :style="{textAlign:textAlign}">{{title}}</view>
        <textarea class="reason" style="font-weight:400" :maxlength='maxlength' :placeholder="placeholder" placeholder-style="fontSize:'28rpx',color:'#999',font-weight:400" @input='input' @click="click" @blur="blur" />
    </view>
</view>
</template>

<script>
export default {
    props: {
        value: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: '备注'
        },
        placeholder: {
            type: String,
            default: '请输入备注信息...'
        },
        textAlign: {
            type: String,
            default: 'left'
        },
        color: {
            type: String,
            default: ''
        },
        maxlength: {
            type: [String, Number],
            default: '140'
        }
    },
    methods: {
        input(e) {
            this.$emit('input', e.detail.value)
        },
        click() {
            this.$emit('click')
        },
        blur() {
            this.$emit('blur')
        }
    }
}
</script>

<style lang="scss" scoped>
.reason-wrap {
    background: #fff;
    border-radius: 10rpx;

    .reason {
        width: 100%;
        height: 200rpx;
        background: #f7f7f7;
        padding: 20rpx;
        border-radius: 10rpx;
        box-sizing: border-box;
        overflow: auto;
    }
}
</style>
