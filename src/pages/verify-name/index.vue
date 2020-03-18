<template>
  <view class="verify-name">
    <view class="tips">实名认证后才能使用提现功能</view>
    <view class="p-lr-30 p-top-25">
      <view class="p-lr-30">手机号码</view>
      <view class="f26 assist-text p-lr-30 p-tb-30 min-border-bottom">未绑定</view>
    </view>
    <view class="p-lr-30 p-top-25">
      <view class="p-lr-30">身份证号码</view>
      <view class="f26 assist-text p-lr-30 p-tb-30 min-border-bottom">未认证</view>
    </view>
    <view class="btn-wrap">
      <min-btn>去认证</min-btn>
    </view>
  </view>
</template>

<script>
export default {
  name: 'verify-name'
}
</script>

<style lang="scss" scoped>
.verify-name{
  .tips{
    padding: 18rpx 32rpx;
    color: #FF0000;
    background: #F0D0D0;
    font-size: 24rpx;
  }
  .btn-wrap{
    margin-top: 80rpx;
  }
}
</style>
