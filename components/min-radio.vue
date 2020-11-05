<template>
<view class="min-checkbox" @click="change">
    <image class="icon" :style="{width:size+'rpx',height:size+ 'rpx'}" v-if="isMatch" :src="active" alt="radio" />
    <image class="icon" :style="{width:size+'rpx',height:size+ 'rpx'}" v-else :src="no_active" alt="radio" />
    <image class="img-icon p-left-10" v-if="icon" :src="icon" />
    <view class="text p-left-10">{{ title }}</view>
    <slot></slot>
</view>
</template>

<!--
*
* value/v-model 绑定值
* title 标题
* label 匹配的value
* disabled 是否禁用
*
* @change：绑定值变化时触发的事件
*
*  -->

<script>
export default {
    props: {
        value: {
            type: [String, Number, Boolean],
            required: true
        },
        title: {
            type: [String, Number],
            default: ''
        },
        label: {
            type: [String, Number, Boolean],
            required: true
        },
        icon: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        active: {
            type: String,
            default: '/static/images/radio.png'
        },
        size: {
            type: String,
            default: '40'
        },
        no_active: {
            type: String,
            default: '/static/images/not-radio.png'
        }
    },
    computed: {
        isMatch() {
            return String(this.value) === String(this.label)
        }
    },
    methods: {
        change() {
            if (this.disabled) return
            this.$emit('input', this.label)
            this.$emit('change', this.label)
        }
    }
}
</script>

<style lang="scss" scoped>
.min-checkbox {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .icon {
        width: 40rpx;
        height: 40rpx;
        border-radius: 50%;
        padding: 5rpx;
        box-sizing: border-box;
    }

    .img-icon {
        width: 64rpx;
        height: 64rpx;
    }

    .text {
        font-size: 28rpx;
        color: #333;
    }
}
</style>
