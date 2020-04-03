<template>
  <view class="reserve-success p-lr-30">
    <image class="icon" src="/static/images/success.png" alt="success" />
    <view class="title">预定成功</view>
    <view class="tips">记得提醒客户准时到店哦</view>
    <view class="card f28 p-tb-30 p-lr-30">
      <view>预定台号：<text>{{data.desk_name}}</text></view>
      <view>客户姓名：{{data.client_name}}</view>
      <view>联系电话：{{data.client_mobile}}</view>
      <view>预抵时间：{{data.arrival_time}}</view>

    </view>
    <view class="btns">
      <min-btn @click="goOn">继续订台</min-btn>
      <min-btn type="white" @click="backIndex">返回首页</min-btn>
    </view>
  </view>
</template>

<script>
export default {
  name: 'reserve-success',
  navigate: ['navigateTo'],
  data () {
    return {
      data: {}
    }
  },
  onLoad (option) {
    const date = new Date(JSON.parse(option.data).arrival_time * 1000)
    const day = this.$minCommon.getDay(date.getDay())

    let time = this.$minCommon.formatDate(date, 'yyyy/MM/dd hh:mm')
    this.data = JSON.parse(option.data)
    time = time + ' ' + day
    this.data.arrival_time = time
  },
  methods: {
    goOn () {
      this.$minRouter.push({
        name: 'platform-admin'
      })
    },
    backIndex () {
      this.$minRouter.push({
        name: 'index'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
    text{
      color: #FF0000;
    }
    view{
      margin-bottom: 10rpx;
      &:last-child{
        margin: 0;
      }
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
