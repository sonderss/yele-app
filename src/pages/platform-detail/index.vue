<template>
  <view class="platform-detail p-top-20 p-lr-30">
    <view class="card p-lr-20 m-bottom-20">
      <view class="p-tb-30 min-border-bottom">基本信息</view>
      <view class="main p-tb-20">
        <view class="status">空闲中</view>
        <view>
          台&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：<text class="emp">K112</text>
        </view>
        <view>
          分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;组：卡座
        </view>
        <view>
          低&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消：￥500
        </view>
        <view>
          座&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：4座
        </view>
        <view>
          开台条件：6成低消（￥600）
        </view>
      </view>
    </view>
    <view class="card p-lr-20 p-bottom-10 m-bottom-20">
      <view class="p-tb-30 min-border-bottom">点单信息</view>
      <view class="main p-tb-20">
        <view>
          当前状态：<text style="color: #FF0000;">不满足开台条件</text>
        </view>
        <view>开台订单：￥600（未支付）</view>
        <view class="card-btns">
          <min-btn size="xs">重新下单</min-btn>
          <view class="m-left-20"></view>
          <min-btn size="xs" type="white" border>申请开台</min-btn>
          <view class="m-left-20"></view>
          <min-btn size="xs" type="white" border class="m-left-20">查看订单</min-btn>
        </view>
      </view>
    </view>
    <view class="card p-lr-20 p-bottom-10 m-bottom-20">
      <view class="p-tb-30 min-border-bottom">客户信息</view>
      <view class="main p-tb-20">
        <view>客户姓名：刘小青</view>
        <view>联系电话：13563250000</view>
        <view>
          当天生日：是
        </view>
        <view>预抵时间：2020年02月15日 16:20:00</view>
      </view>
    </view>
    <view class="card p-lr-20 p-bottom-10 m-bottom-20">
      <view class="p-tb-30 min-border-bottom">客户信息</view>
      <view class="main p-tb-20">
        <view>营销人员：刘清清</view>
        <view>预抵时间：2020年02月15日 16:20:00</view>
      </view>
    </view>
    <view class="btns">
      <min-btn>预约</min-btn>
      <min-btn type="white">开台</min-btn>
      <min-btn type="white">存酒</min-btn>
      <min-btn type="white">停用</min-btn>
      <min-btn type="white">历史</min-btn>
    </view>
  </view>
</template>

<script>
export default {
  name: 'platform-detail'
}

</script>

<style lang="scss" scoped>
.platform-detail{
  position: relative;
  padding-bottom: 100rpx;
  .card{
    background: #fff;
    border-radius: 10rpx;
    .main{
      position: relative;
      &>view{
        margin-bottom: 10rpx;
        &:last-child{
          margin: 0;
        }
      }
      .emp{
        display: inline-block;
        font-weight: bold;
        color: #FE0000;
      }
      .status{
        position: absolute;
        top: 20rpx;
        right: 0;
        color: #FE0000;
      }
      .card-btns{
        margin-top: 30rpx !important;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
  .btns{
    width: 100vw;
    display: flex;
    justify-content: space-between;
    position: fixed;
    left: 0;
    bottom: 0;
    background: #f7f7f7;
    padding: 10rpx 30rpx;
  }
}
</style>
