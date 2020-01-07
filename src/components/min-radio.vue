<template>
  <view class="min-checkbox" @click="change">
    <img class="icon" v-if="isMatch" src="/static/images/radio.png" alt="radio">
    <img class="icon" v-else src="/static/images/not-radio.png" alt="radio">
    <image class="img-icon p-left-10" v-if="icon" :src="icon"/>
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
      type: [String, Number],
      required: true
    },
    title: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: [String, Number],
      required: true
    },
    icon: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isMatch () {
      return String(this.value) === String(this.label)
    }
  },
  methods: {
    change () {
      if (this.disabled) return
      this.$emit('input', this.label)
      this.$emit('change', this.label)
    }
  }
}

</script>

<style lang="scss" scoped>
.min-checkbox{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .icon{
    width: 34rpx;
    height: 34rpx;
    border-radius: 50%;
    padding: 5rpx;
    box-sizing: border-box;
  }
  .img-icon{
    width: 44rpx;
    height: 44rpx;
  }
  .text{
    font-size: 28rpx;
    color:#333;
  }
}
</style>
