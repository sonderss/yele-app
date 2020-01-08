<template>
  <view class="platform-history p-top-20 p-lr-30">
    <view class="card p-lr-20 p-top-30 m-bottom-20">
      <view class="main p-bottom-30">
        <view>客户姓名：刘大芒</view>
        <view>联系电话：135 5352 0135</view>
        <view>营销人员：刘刘刘</view>
        <view>应付金额：￥568693.00</view>
        <view>已付金额：￥12463.00</view>
      </view>
      <view class="footer min-border-top p-tb-20">
        <view class="amount">待付金额：￥666.00</view>
        <view class="btns">
          <min-btn size="xs" type="white" border>查看订单</min-btn>
          <min-btn size="xs" type="white" border class="m-left-20">查看账单</min-btn>
        </view>
      </view>
    </view>
    <view class="card p-lr-20 p-top-30 m-bottom-20">
      <view class="main p-bottom-30">
        <view>客户姓名：刘大芒</view>
        <view>联系电话：135 5352 0135</view>
        <view>营销人员：刘刘刘</view>
        <view>应付金额：￥568693.00</view>
        <view>已付金额：￥12463.00</view>
      </view>
      <view class="footer min-border-top p-tb-20">
        <view class="tips">已结清</view>
        <view class="btns">
          <min-btn size="xs" type="white" border>查看订单</min-btn>
          <min-btn size="xs" type="white" border class="m-left-20">查看账单</min-btn>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'platform-history'
}

</script>

<style lang="scss" scoped>
.platform-history{
  .card{
    background: #fff;
    border-radius: 10rpx;
    .main{
      &>view{
        margin-bottom: 10rpx;
        &:last-child{
          margin: 0;
        }
      }
    }
    .footer{
      display: flex;
      justify-content: space-between;
      .amount{
        color: #FF0000;
        font-size: 24rpx;
        line-height: 68rpx;
        font-weight: bold;
      }
      .tips{
        line-height: 68rpx;
        font-size: 24rpx;
      }
      .btns{
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>
