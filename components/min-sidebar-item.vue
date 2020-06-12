<template>
  <view class="min-sidebar-item" :class="{'min-active': select}" @click="changeVal">
    <view class="min-title">{{ title }}</view>
    <view class="min-label">{{ label }}</view>
  </view>
</template>

<!--
*
* name 与选项卡绑定值 value 对应的标识符
* title 标题
* label 副标题
*
*  -->
<script>
export default {
  props: {
    name: {
      type: [Number, String],
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  },
  computed: {
    select () {
      const value = this.$parent.value
      return String(this.name) === String(value)
    }
  },
  methods: {
    changeVal () {
      this.$parent.changeValue(this.name)
    }
  }
}
</script>

<style lang="scss" scoped>
.min-sidebar-item{
  display: block;
  width: 160rpx;
  padding: 35rpx 30rpx;
  font-size: 28rpx;
  color: #666;
  text-align: center;
  font-weight:500;
  position: relative;
  box-sizing: border-box;
  &.min-active{
    background:rgba(247,247,247,1);
    &::after{
      content: '';
      width: 6rpx;
      height: 50rpx;
      background: #FF0000;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .min-label{
    font-size: 18rpx;
    color: #FF0000;
  }
}
</style>
