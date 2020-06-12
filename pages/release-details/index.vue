<template>
  <view class="release-details p-tb-20 p-lr-30">
    <view class="view_main p-lr-20 m-bottom-20">
      <view class="top_view min-border-bottom">
        <text class="desc">金额</text>
        <text class="money">+33.20</text>
      </view>
      <view class="bottom-view p-bottom-20">
        <view class="m-tb-10 min-flex min-flex-main-between">
          <text class="c">门店</text>
          <text style="text-align:right">提现</text>
        </view>
        <view class="m-tb-10 min-flex min-flex-main-between">
          <text class="c">结算周期</text>
          <text style="text-align:right">支付宝</text>
        </view>
        <view class="m-tb-10 min-flex min-flex-main-between">
          <text class="c">生成时间</text>
          <text style="text-align:right">46892346312643123310</text>
        </view>
        <view class="m-tb-10 min-flex min-flex-main-between">
          <text class="c">应发金额</text>
          <text style="text-align:right">2019-06-09 16:41:25</text>
        </view>
      </view>
    </view>
    <view class="btm_view">
       <text>查看详情</text>
       <image src="../../static/images/arrow.png"/>
    </view>
  </view>
</template>
<script>
export default {
  name: 'release-details',
  navigate: ['navigateTo']
}
</script>
<style lang="scss" scoped>
.view_main {
  width: 100%;
  // height: 385rpx;
  background: #fff;
  border-radius: 10rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .top_view {
    width: 100%;
    height: 150rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .desc {
      font-size: 28rpx;
      color: #666666;
    }
    .money {
      font-size: 60rpx;
      font-weight: bold;
      color: rgba(255, 0, 0, 1);
      text-align: right;
    }
    text {
      width: 50%;
      height: 100%;
      display: block;
      line-height: 150rpx;
    }
  }
  .bottom-view {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex: 1;
    .c {
      color: #666666;
    }
    text {
      width: 50%;
      height: auto;
      display: block;
    }
  }
}
.btm_view{
  width: 100%;
  height:90rpx;
  background:rgba(255,255,255,1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20rpx;
  text{
    color: #333333;
  }
  image{
    width: 24rpx;
    height: 24rpx;
  }
}
</style>
