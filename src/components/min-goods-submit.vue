<template>
  <view class="min-goods-submit min-border-top">
    <view class="min-left p-tb-25 p-left-30">
      <min-badge class="min-goods-count" :count="goodsCount" v-if="goodsCount > 0"/>
      <image class="min-icon" v-if="icon" :src="icon" alt="icon"/>
      <text class="f28" v-if="leftText">{{leftText}}</text>
    </view>
    <view class="min-main p-tb-20 p-right-30">
      <view class="min-total f22">
        合计：<text class="min-amount">￥{{totalAmount}}</text>
      </view>
      <view class="f22" v-if="totalLabel">{{totalLabel}}</view>
    </view>
    <view class="min-right" @click="$emit('submit')">
      <view class="min-text">{{buttonText}}</view>
      <view class="min-label" v-if="buttonLabel">{{buttonLabel}}</view>
    </view>
  </view>
</template>

<!--
*
* totalAmount 合计金额
* totalLabel  合计金额下方的文字
* icon        左侧图片链接
* leftText    左侧文字
* goodsCount  商品数量
* buttonText  提交按钮文字
* buttonLabel：提交按钮下方的文字
*
* @submit：按钮点击事件回调
*
*  -->
<script>
export default {
  props: {
    totalAmount: {
      type: [Number, String],
      default: 0.00
    },
    totalLabel: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    leftText: {
      type: String,
      default: ''
    },
    goodsCount: {
      type: [Number, String],
      default: 0
    },
    buttonText: {
      type: String,
      default: '去结算'
    },
    buttonLabel: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.min-goods-submit{
  width: 100vw;
  height: 100rpx;
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  background: #fff;
  .min-left{
    flex-basis: 150rpx;
    line-height: 48rpx;
    position: relative;
    .min-icon{
      width: 48rpx;
      height: 48rpx;
    }
    .min-goods-count{
      position: absolute;
      top: -10rpx;
      left: 78rpx;
    }
  }
  .min-main{
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    .min-total{
      .min-amount{
        font-size: 26rpx;
        color: #FF0000;
        font-weight:400;
      }
    }
  }
  .min-right {
    flex-basis: 200rpx;
    background:rgba(255,224,0,1);
    color: #333;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .min-text{
      font-size: 32rpx;
    }
    .min-label{
      font-size: 22rpx;
    }
  }
}
</style>
