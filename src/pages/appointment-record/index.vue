<template>
<view class="appointment-record">
    <view class="top-view">
      <view class="top-v">
        <text>定台时间</text>
        <image class="arro"  src='../../static/images/downarrow24.png' />
      </view>
      <view class="top-v">
        <text class="status end">消费金额</text>
        <image class="arro arrw"  src='../../static/images/downarrow24.png' />
      </view>
    </view>
    <view class="main p-tb-20 m-tb-20 m-lr-30 p-lr-20">
      <view class="item">客户姓名：刘小青</view>
      <view class="item phone">
        <text>联系电话：135 5352 0135</text>
        <view class="image-view">
          <image src='../../static/images/phone.png'/>
        </view>
      </view>
      <view class="item">预约时间：2019-12-19 17:00:00</view>
      <view class="item">预抵时间：2019-12-20 17:00:00</view>
      <view class="item">台位状态：<text class="status confirmed">预约中</text></view>
      <view class="item">消费金额：￥12463.00</view>
      <view class="btm-view min-border-top m-top-20">
        <view class="o">查看订单</view>
        <view class="o">查看账单</view>
      </view>
    </view>

</view>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.top-view {
  background: #fff;
  height: 90rpx;
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
  .top-v {
    display: block;
    width: 50%;
    line-height: 90rpx;
    text-align: center;
    .arro{
      width:18rpx;
      height:13rpx;
      margin-left: 5rpx
    }
    .arrw{
      transform:rotate(-180deg);
    }
  }
}
.main {
  height: auto;
  background: #fff;
  padding-bottom: 0;
  .item {
    margin-bottom: 10rpx;
  }
  .phone{
    display: flex;
    justify-content: space-between;
    .image-view{
      width: 44rpx;
      height: 44rpx;
      image{
        width: 100%;
        height: 100%;
      }
    }
  }
  .btm-view{
    height: 98rpx;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .o{
      width: 142rpx;
      height: 58rpx;
      background:rgba(255,255,255,1);
      border:1px solid rgba(231,231,231,1);
      border-radius:10rpx;
      margin-left: 20rpx;
      text-align: center;
      line-height: 58rpx;
    }
  }
}
.status{
      font-size: 26rpx;
      &.confirmed{
        color: #FF0000
      }
      &.end{
        color: #FF2C00
      }
      &.force{
        color: #0090FF
      }
      &.expired{
        color: #666666
      }
    }

// p-tb-20 p-lr-30
</style>
