<template>
  <view style="background: #fff;">
    <view class="min-goods-item min-border-bottom p-tb-20 p-lr-30">
      <image class="min-goods-icon" src="http://fuss10.elemecdn.com/d/b9/bcab0e8ad97758e65ae5a62b2664ejpeg.jpeg?imageView2/1/w/114/h/114"/>
      <view class="min-goods-content">
        <view class="min-goods-name">{{name}}</view>
        <view class="min-goods-price">￥999</view>
      </view>
      <view class="min-stepper-weap">
        <min-stepper v-model="value"/>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: '无商品'
    }
  },
  data () {
    return {
      value: 0
    }
  }
}

</script>

<style lang="scss" scoped>
.min-goods-item{
  display: flex;
  position: relative;
  .min-goods-icon{
    flex-basis: 80rpx;
    height: 80rpx;
  }
  .min-goods-content{
    flex-grow: 1;
    display: block;
    padding-left: 20rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .min-goods-name{
      font-size: 28rpx;
    }
    .min-goods-price{
      font-size: 24rpx;
      color: #FF0000;
    }
  }
  .min-stepper-weap{
    position: absolute;
    right: 30rpx;
    bottom: 20rpx;
  }
}
</style>
