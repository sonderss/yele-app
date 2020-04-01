<template>
  <view class="withdrawaldetails p-tb-20 p-lr-30">
     <view class="view_main p-lr-20">
        <view class="top_view min-border-bottom">
          <text class="desc">金额</text>
          <text class="money">+33.20</text>
        </view>
        <view class="bottom-view">
          <view class="main min-flex min-flex-main-between">
             <text class="c">类型</text>
             <text style="text-align:right">提现</text>
          </view>
          <view class="main min-flex min-flex-main-between">
             <text class="c">提现方式</text>
             <text style="text-align:right">支付宝</text>
          </view>
          <view class="main min-flex min-flex-main-between">
             <text class="c">交易流水</text>
             <text style="text-align:right">46892346312643123310</text>
          </view>
          <view class="main min-flex min-flex-main-between">
             <text class="c">支付时间</text>
             <text style="text-align:right">2019-06-09 16:41:25</text>
          </view>
        </view>
     </view>
  </view>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
.withdrawaldetails{
    .view_main{
      width: 100%;
      height: 385rpx;
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
           color:rgba(102,102,102,1);
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
}
</style>
