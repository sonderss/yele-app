<template>
  <view style="display: inline-block;vertical-align: bottom;">
    <!-- <view class="min-sunui-stepper">
      <view class="min-less-wrap">
        <view
          @tap="less"
          class="min-less"
        ></view>
      </view>
      <input
        class="min-value" type="number"
        :value="value > min ? stepperCacheNum : ''" @input="iptVal"
        :disabled="true"
      />
      <view @tap="add" class="min-add"></view>
    </view> -->
    <view :animation="animationLess" style="background:red;height:100rpx;width:100rpx">111</view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      animationLess: {}
    }
  },
  created () {
    var animation = uni.createAnimation({
      duration: 400,
      timingFunction: 'ease'
    })
    this.animation = animation
    this.animationLess = animation.export()

    setTimeout(() => {
      console.log(1111111)
      animation.translate(30).step()
      this.animationLess = animation.export()
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.min-sunui-stepper {
  display: flex;
  align-items: space-between;
  .min-less-wrap{
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
