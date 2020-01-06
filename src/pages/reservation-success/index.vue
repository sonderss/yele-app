<template>
  <view class="reserve-success p-lr-30">
    <image class="icon" src="/static/images/success.png" alt="success" />
    <view class="title">预定成功</view>
    <view class="tips">记得提醒客户准时到店哦</view>
    <view class="card p-tb-30 p-lr-30">
      <view class="f28">预定台号：<text>T3547</text></view>
      <view class="f28">客户姓名：可乐加冰</view>
      <view class="f28">联系电话：15016584603</view>
    </view>
    <view class="btns">
      <min-btn>继续订台</min-btn>
      <min-btn type="white">返回首页</min-btn>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style lang="scss">
.reserve-success{
  .icon{
    display: block;
    width: 200rpx;
    height: 200rpx;
    margin: 0 auto;
    margin-top: 117rpx;
  }
  .title{
    font-size:32rpx;
    font-weight:bold;
    color:#333333;
    text-align: center;
    margin-top: 38rpx;
  }
  .tips{
    font-size:28rpx;
    font-weight:400;
    color:#666666;
    text-align: center;
    margin-top: 40rpx;
  }
  .card{
    background: #FFF;
    border-radius: 10rpx;
    margin-top: 40rpx;
    view{
      margin-bottom: 10rpx;
      &:last-child{
        margin: 0;
      }
    }
    text{
      color: #FF0000;
    }
  }
  .btns{
    display: flex;
    justify-content: space-between;
    margin-top: 40rpx;
    .min-btn{
      width: 330rpx;
      margin: 0;
    }
  }
}

</style>
