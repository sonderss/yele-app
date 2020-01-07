<template>
  <view class="open-success p-lr-30">
    <image class="icon" src="/static/images/success.png" alt="success" />
    <view class="title">开台成功</view>
    <view class="card f28 p-tb-30 p-lr-30">
      <view>预定台号：<text>T3547</text></view>
      <view>客户姓名：可乐加冰</view>
      <view>联系电话：15016584603</view>
    </view>
    <view class="btns">
      <min-btn>回到台</min-btn>
      <min-btn type="white">返回首页</min-btn>
    </view>
  </view>
</template>

<script>
export default {
  name: 'open-success',
  data () {
    return {

    }
  }
}
</script>

<style lang="scss">
.open-success{
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
      color:rgba(51,51,51,1);
      text-align: center;
      margin-top: 38rpx;
    }
  .card{
    background: #FFF;
    border-radius: 10rpx;
    margin-top: 105rpx;
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
