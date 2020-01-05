<template>
<view style="display: inline-block;vertical-align: bottom;">
  <view class="min-sunui-stepper">
    <view class="min-less-wrap" :animation="animationLess">
      <view
        @tap="less"
        class="min-less"
        :animation="animationLessInner"
      ></view>
    </view>
    <input
      class="min-value" type="number"
      :value="value > min ? stepperCacheNum : ''" @input="iptVal"
      :disabled="true"
    />
    <view @tap="add" class="min-add"></view>
  </view>
</view>
</template>
<!--
*
* 建议min和val一样！
* value 绑定的value
* max：最大值
* min：最小值
* step：步进值(支持整数和小数,因步骤计算失误会造成精度损失！)
*
*
* @change：回调事件
*
:class="value > min ? 'min-less-inner-enter' : 'min-less-inner-leave'"
:class="value > min ? 'min-less-enter' : 'min-less-leave'"
*  -->
<script>
export default {
  name: 'min-stepper',
  data () {
    return {
      stepperNum: 0,
      stepperCacheNum: 0,
      animationLess: {},
      animationLessInner: {}
    }
  },
  props: {
    value: {
      type: [String, Number],
      default: 0
    },
    min: {
      type: [String, Number],
      default: 0
    },
    max: {
      type: [String, Number],
      default: 999
    },
    step: {
      type: Number,
      default: 1
    }
  },
  created () {
    this.stepperNum = this.value
    this.stepperCacheNum = this.value
  },
  methods: {
    less () {
      this.stepperNum <= this.min ? this.stepperNum = this.min : this.stepperNum -= Math.ceil(this.step * 10) / 10
      this.stepperCacheNum = Number(this.stepperNum.toFixed(1))
      this.emit(this.stepperCacheNum)
      this.$emit('input', this.stepperCacheNum)
      if (this.stepperCacheNum === this.min) this.lessAnimation()
    },
    add () {
      this.stepperNum >= this.max ? this.stepperNum = this.max : this.stepperNum += Math.ceil(this.step * 10) / 10
      this.stepperCacheNum = Number(this.stepperNum.toFixed(1))
      this.emit(this.stepperCacheNum)
      this.$emit('input', this.stepperCacheNum)
      if (this.stepperCacheNum === 1) this.addAnimation()
    },
    emit (val) {
      if (Number(val.toFixed(1)) > this.max) {
        val = this.max
        this.stepperCacheNum = this.max
      }
      if (Number(val.toFixed(1)) < this.min) {
        val = this.min
        this.stepperCacheNum = this.min
      }
      this.$emit('change', val)
    },
    iptVal (e) {
      this.$emit('input', e.target.value)
    },
    lessAnimation () {
      const animation = uni.createAnimation({
        duration: 400,
        transformOrigin: '50% 50% 0',
        timingFunction: 'linear'
      })
      animation.opacity(0).translate(24).step()
      this.animationLess = animation.export()
      animation.rotate(0).step()
      this.animationLessInner = animation.export()
    },
    addAnimation () {
      const animation = uni.createAnimation({
        duration: 400,
        transformOrigin: '50% 50% 0',
        timingFunction: 'linear'
      })
      animation.opacity(1).translateX(0).step()
      this.animationLess = animation.export()
      animation.rotate(-180).step()
      this.animationLessInner = animation.export()
    }
  }
}
</script>

<style lang="scss">
.min-sunui-stepper {
  display: flex;
  align-items: space-between;
  .min-less-wrap{
    opacity: 0;
    transform: translateX(116rpx);
    .min-less{
      height: 0;
      padding: 22rpx 12rpx;
      background:rgba(153,153,153,1);
      border-radius:2px;
      border-radius: 100%;
      &::before{
        content: "";
        display: inline-block;
        width: 20rpx;
        height: 4rpx;
        background:#fff;
        vertical-align: top;
        margin-top: -2rpx;

      }
    }
  }

  .min-add{
    height: 0;
    padding: 22rpx 12rpx;
    background:rgba(255,50,7,1);
    border-radius:2px;
    position: relative;
    border-radius: 100%;
    &::before{
      content: "";
      display: inline-block;
      width: 20rpx;
      height: 4rpx;
      background:#fff;
      vertical-align: top;
      margin-top: -2rpx;
    }
    &::after{
      content: "";
      display: inline-block;
      width: 4rpx;
      height: 20rpx;
      background:#fff;
      vertical-align: top;
      position: absolute;
      top: 13rpx;
      left: 20rpx;
    }
  }
  .min-value{
    width: 73rpx;
    font-size: 26rpx;
    line-height: 44rpx;
    color: #333;
    text-align: center;
  }
}
</style>
