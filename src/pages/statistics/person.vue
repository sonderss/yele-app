<template>
  <view class="person p-lr-20 p-tb-20">
    <view class="card p-lr-20 m-bottom-20">

      <view class="main p-tb-20">
        <view>客户姓名：刘小青</view>
        <view>联系电话：13563250000</view>
        <view>汇总周期：是</view>
        <view>预抵时间：2020年02月15日 16:20:00</view>
      </view>
    </view>
    <view class="card p-lr-20 p-bottom-10 m-bottom-20">
      <view class="p-tb-30 min-border-bottom">订单信息</view>
      <view class="main p-tb-20">
        <view>营销人员：刘清清</view>
        <view>预抵时间：2020年02月15日 16:20:00</view>
        <view>营销人员：刘清清</view>
        <view>预抵时间：2020年02月15日 16:20:00</view>
      </view>
      <view class="card-btns min-border-top">
          <view class="btn f26">查看账单</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  onLoad (option) {
    console.log(option)
    switch (option.id) {
      case '0':
        uni.setNavigationBarTitle({
          title: '个人营销业绩汇总'
        })
        break
      case '1':
        uni.setNavigationBarTitle({
          title: '个人营销开台汇总'
        })
        break
      default:
    }
  }
}
</script>

<style lang="scss" scoped>
.card{
    background: #fff;
    border-radius: 10rpx;
    .main{
      view{margin-bottom:10rpx;}

    }
    .card-btns{
      height: 90rpx;
        display: flex;
        justify-content: flex-end;

        align-items: center;

        .btn{
          width:142rpx;
          height:58rpx;
          background:rgba(255,255,255,1);
          border:1rpx solid rgba(231,231,231,1);
          border-radius:10rpx;
          line-height: 58rpx;
          text-align: center;
        }
      }
  }
</style>
