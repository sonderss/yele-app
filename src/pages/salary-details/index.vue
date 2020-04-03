<template>
  <view class="salary-details p-tb-20 p-lr-30">
    <view class="view_main p-lr-20 m-bottom-20">
          <view class="top_view min-border-bottom">
            <text class="desc">金额</text>
            <text class="money">+33.20</text>
          </view>
          <view class="bottom-view p-bottom-20">
            <view class="m-tb-10 min-flex min-flex-main-between">
              <text class="c">类型</text>
              <text style="text-align:right">提现</text>
            </view>
            <view class="m-tb-10 min-flex min-flex-main-between">
              <text class="c">提现方式</text>
              <text style="text-align:right">支付宝</text>
            </view>
            <view class="m-tb-10 min-flex min-flex-main-between">
              <text class="c">交易流水</text>
              <text style="text-align:right">46892346312643123310</text>
            </view>
            <view class="m-tb-10 min-flex min-flex-main-between">
              <text class="c">支付时间</text>
              <text style="text-align:right">2019-06-09 16:41:25</text>
            </view>
          </view>
    </view>
    <view class="view_main p-lr-20 m-bottom-20 p-bottom-20">
          <view class="p-tb-20 min-border-bottom">
            <text class="desc">工资方案</text>
          </view>
          <view class="bottom-view">
            <view class="m-tb-10 min-flex min-flex-main-between">
              <text class="c">方案名称</text>
              <text style="text-align:right">方案名称1235</text>
            </view>
            <view class="m-tb-10 min-flex min-flex-main-between">
              <text class="c">工资类型</text>
              <text style="text-align:right">固定类型</text>
            </view>
            <view class="m-tb-10 min-flex min-flex-main-between">
              <text class="c">工资</text>
              <text style="text-align:right">$4689</text>
            </view>
            <view class="m-tb-10 min-flex min-flex-main-between">
              <text class="c">结算周期</text>
              <text style="text-align:right">周结</text>
            </view>
          </view>
    </view>
    <view class="jion_view">
      <view class="title min-border-bottom">工资方案</view>
        <view class="m-tb-10 min-flex min-flex-main-between">
              <text style="color:#666">结算周期</text>
              <text style="text-align:right">周结</text>
        </view>
      <view class="method-view min-border-bottom">
        <view class="left">基础提成</view>
        <view class="right">
          <text>订台人提成</text>
          <text>下单人提成</text>
          <text>下线分佣</text>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: 'salary-details',
  navigate: ['navigateTo']
}
</script>
<style lang="scss" scoped>

.view_main{
  width: 100%;
  // height: 385rpx;
  background: #fff;
  border-radius:10rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .top_view{
    width: 100%;
    height: 150rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .desc{
        font-size:28rpx;
        color:#666666;
    }
    .money{
      font-size:60rpx;
      font-weight:bold;
      color:rgba(255,0,0,1);
      text-align: right;
    }
    text{
      width: 50%;
      height: 100%;
      display: block;
      line-height: 150rpx;
    }
  }
  .bottom-view{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex: 1;
    .c{
      color: #666666;
    }
    text{
      width: 50%;
      height: auto;
      display: block;
    }
  }
}
.jion_view {
  width: 100%;
  height: auto;
  background: #fff;
  padding-left: 33rpx;
  padding-right: 40rpx;
  color: rgba(51, 51, 51, 1);
  text {
    color: rgba(51, 51, 51, 1);
  }
  .title {
    width: 100%;
    height: 98rpx;
    line-height: 98rpx;
    .c{
      color: #666;
    }
  }
  .method-view {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 36rpx 0;
    .left {
      width: 50%;
      color: #666666;
    }
    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;

      text {
        display: block;
        margin-bottom: 20rpx;
      }
    }
  }
}

</style>
