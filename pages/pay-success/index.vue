<template>
  <view class="reserve-success p-lr-30 p-tb-30">
    <image class="icon" src="/static/images/success.png" alt="success" />
    <view class="title">{{list.pay_type ? '下单成功' : '支付成功'}} </view>
    <view class="card f28 p-tb-30 p-lr-30">
      <view>台号：<text>{{list.desk_name}}</text></view>
      <view>客户姓名：{{list.client_name}}</view>
      <view>联系电话：{{list.client_mobile}}</view>
      <view>订单号：{{list.order_sn}}</view>
      <view>订单金额：￥{{list.order_total}}</view>
      <view>已付金额：{{list.pay_price}}</view>
      <view>付款类型：{{list.pay_type ? '后付款':'先付款'}}</view>
      <view>支付方式：{{method[list.payment_id]}}</view>
      <view v-if="!list.pay_type">支付时间：{{$minCommon.formatDate(new Date(list.pay_time*1000),'yyyy-MM-dd hh:mm:ss') }}</view>


    </view>
    <view class="btns">
      <min-btn @click="goOn">回到台</min-btn>
      <min-btn type="white" @click="backIndex">返回首页</min-btn>
    </view>
  </view>
</template>

<script>
// （1：支付宝扫码，2：微信扫码，3：现金支付，4：刷卡支付，5：后付款）
const method = ['暂无','支付宝扫码','微信扫码','现金支付','刷卡支付','后付款']
export default {
  name: 'redpay-success',
  navigate: ['navigateTo',"redirectTo"],
  data () {
    return {
      list: {},
      method
    }
  },
  onLoad (option) {
    console.log(this.$parseURL())
    console.log(this.$store.state.status.date);
    this.$minApi.getPayStatus({
      order_id:this.$parseURL().id
    }).then(res=>{
      console.log(res)
      this.list = res
    })

  },
  methods: {
    goOn () {
    
      this.$minRouter.push({
        name:"redplatform-detail",
        type:"redirectTo",
        params:{id:this.$store.state.status.date.id,date:this.$store.state.status.date.date}
      })
    },
    backIndex () {
      uni.reLaunch({
          url: '../index/index'
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
