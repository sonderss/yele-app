<template>
  <view class="platform-detail p-top-20 p-lr-30">
    <view class="card p-lr-20 m-bottom-20">
      <view class="p-tb-30 min-border-bottom">基本信息</view>
      <view class="main p-tb-20">
        <view class="status">空闲中</view>
        <view><view class="justify">台 号</view>：<view class="emp">K112</view></view>
        <view><view class="justify">分 组</view>：卡座</view>
        <view><view class="justify">低 消</view>：￥500</view>
        <view><view class="justify">座 位</view>：4座</view>
        <view><view class="justify">开台条件</view>：6成低消（￥600）</view>
      </view>
    </view>
    <view class="card p-lr-20">
      <view class="p-tb-30 min-border-bottom">基本信息</view>
      <view class="main p-tb-20">
        <view class="status">空闲中</view>
        <view><view class="justify">台号</view>：<view class="emp">K112</view></view>
        <view><view class="justify">分组</view>：卡座</view>
        <view><view class="justify">低消</view>：￥500</view>
        <view><view class="justify">座位</view>：4座</view>
        <view><view class="justify">开台条件</view>：6成低消（￥600）</view>
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
      .justify{
        display: inline-block;
        width: 130rpx;
        height: 40rpx;
        text-align: justify;
        text-align-last: justify;
        &:after {
          content: '';
          height:0;
          width: 100%;
          display: inline-block;
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
    }
  }
  .btns{
    width: 100vw;
    display: flex;
    justify-content: space-between;
    position: fixed;
    left: 0;
    bottom: 10rpx;
    padding: 0 30rpx;
  }
}
</style>
