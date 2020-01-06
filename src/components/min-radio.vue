<template>
  <view class="min-checkbox">
    <view class="icon" :class="{'active': String(value) === String(label)}" @click="change">
      <img v-show="value" src="/static/images/tick.png" alt="tick">
    </view>
    <view class="text p-left-20">{{ title }}</view>
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
    disabled: {
      type: Boolean,
      default: false
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
  .icon{
    width: 40rpx;
    height: 40rpx;
    display: inline-block;
    vertical-align: middle;
    border-radius: 50%;
    padding: 5rpx;
    box-sizing: border-box;
    border: 1px solid #CACAD0;
    img{
      width: 100%;
      height: 100%;
    }
    &.active{
      background: #FF2C00;
      border: none;
    }
  }
  .text{
    display: inline-block;
    vertical-align: middle;
    font-size: 28rpx;
    color:#333;
  }
}
</style>
