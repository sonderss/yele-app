<template>
  <view class="min-checkbox">
    <view class="icon" :class="{'active': value}" @click="checkbox">
      <img v-show="value" src="/static/images/tick.png" alt="tick">
    </view>
    <view class="text p-left-20">{{label}}</view>
  </view>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number, Boolean],
      default: false
    },
    label: {
      type: [String, Number],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    checkbox () {
      if (this.disabled) return
      this.$emit('input', !this.value)
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
