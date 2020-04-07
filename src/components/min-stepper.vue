<template>
<view style="display: inline-block;vertical-align: bottom;">
  <view class="min-sunui-stepper">
    <view class="min-less-wrap" :class="{'isAnimation': isAnimation}" :animation="animationLess">
      <image @click.stop="less" :animation="animationLessInner"  class="min-less" src="/static/images/less.png"/>
    </view>
    <!-- <input
      class="min-value" type="number"
      :value="(value > min || !isAnimation) ? stepperCacheNum : ''" @input="iptVal"
      :disabled="true"
    /> -->
    <view class="min-value">{{ (value > min || !isAnimation) ? stepperCacheNum : '' }}{{ unit }}</view>
    <image @click.stop="add" class="min-add" :src="icon"/>
  </view>
</view>
</template>
<!--
*
* 建议min和val一样！
* value/v-model 绑定的值
* max：最大值
* min：最小值
* step：步进值(支持整数和小数,因步骤计算失误会造成精度损失！)
* isAnimation: 是否开启动画
* unit：单位
*
* @change：回调事件
*
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
      type: [String, Number],
      default: 1
    },
    isAnimation: {
      type: Boolean,
      default: true
    },
    unit: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: '/static/images/yellow-add.png'
    }
  },
  created () {
    this.stepperNum = this.value
    this.stepperCacheNum = this.value
  },
  methods: {
    less () {
      if (this.value === Number(this.min)) return
      this.stepperNum <= this.min ? this.stepperNum = this.min : this.stepperNum -= Math.ceil(this.step * 10) / 10
      this.stepperCacheNum = Number(this.stepperNum.toFixed(1))
      this.emit(this.stepperCacheNum)
      this.$emit('input', this.stepperCacheNum)
      if (this.stepperCacheNum === Number(this.min) && this.isAnimation) this.lessAnimation()
    },
    add () {
      if (this.value === Number(this.max)) return
      this.stepperNum >= this.max ? this.stepperNum = this.max : this.stepperNum += Math.ceil(this.step * 10) / 10
      this.stepperCacheNum = Number(this.stepperNum.toFixed(1))
      this.emit(this.stepperCacheNum)
      this.$emit('input', this.stepperCacheNum)
      if (this.stepperCacheNum >= Number(this.step) && this.isAnimation) this.addAnimation()
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
  },
  watch: {
    value (newn, oldn) {
      this.stepperNum = this.value
      this.stepperCacheNum = this.value
      if (newn > oldn) {
        if (this.stepperCacheNum >= Number(this.step) && this.isAnimation) this.addAnimation()
      }
      if (newn < oldn) {
        if (this.stepperCacheNum === Number(this.min) && this.isAnimation) this.lessAnimation()
      }
    }
  }
}
</script>

<style lang="scss">
.min-sunui-stepper {
  display: flex;
  align-items: space-between;
  justify-content: 'top';
  .min-less-wrap{
    &.isAnimation{
      opacity: 0;
      transform: translateX(116rpx);
    }
    .min-less{
      padding: 10rpx;
      width: 40rpx;
      height: 40rpx;
      background: url('/static/images/less.png') no-repeat;
      background-position: center center;
    background-size: 40rpx 40rpx;
    }
  }
  .min-add{
    padding: 10rpx;
    width: 40rpx;
    height: 40rpx;
    // background: url('/static/images/add.png') no-repeat;
    // background-position: center center;
    background-size: 40rpx 40rpx;
  }
  .min-value{
    padding: 10rpx 0;
    width:39rpx;
    height: 40rpx;
    font-size: 26rpx;
    line-height: 44rpx;
    color: #333;
    text-align: center;
  }
}
</style>
