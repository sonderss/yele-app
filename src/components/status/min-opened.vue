<template>
  <view class="platform-detail">
    <view class="card p-lr-20 m-bottom-20">
      <view class="p-tb-30 min-border-bottom">基本信息</view>
      <view class="main p-tb-20">
        <view class="status">已开台</view>
        <view>
          台&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：
          <text class="emp">K112</text>
        </view>
        <view>分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;组：卡座</view>
        <view>低&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消：￥500</view>
        <view>座&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：4座</view>
        <view>开台条件：6成低消（￥600）</view>
      </view>
    </view>
    <view class="card p-lr-20 p-bottom-10 m-bottom-20">
      <view class="p-tb-30 min-border-bottom">客户信息</view>
      <view class="main p-tb-20">
        <view>客户姓名：刘小青</view>
        <view>联系电话：13563250000</view>
        <view>当天生日：是</view>
        <view>预抵时间：2020年02月15日 16:20:00</view>
      </view>
    </view>
     <view class="card p-lr-20 m-bottom-20">
      <view class="top p-tb-30 min-border-bottom">
        <view>订单信息</view>
      </view>
      <view class="main1 p-top-20">
        <view class="item">客户姓名：刘小青</view>
        <view class="item">联系电话：135 5352 0135</view>
        <view class="item">存酒数量：12356</view>
      </view>
      <view class="min-top-border"></view>
      <view class="timer min-top-border">待付合计：1000</view>
    </view>
    <view class="card p-lr-20 p-bottom-10 m-bottom-20" style="margin-bottom:200rpx">
      <view class="p-tb-30 min-border-bottom">操作信息</view>
      <view class="main p-tb-20">
        <view>营销人员：刘清清</view>
        <view>预抵时间：2020年02月15日 16:20:00</view>
      </view>
    </view>
    <view class="btns1">
      <min-btn class="btn1" @click="book">预约</min-btn>
      <min-btn type="white" class="btn1">转台</min-btn>
      <min-btn type="white" class="btn1">取酒</min-btn>
      <min-btn type="white" class="btn1">下单</min-btn>
      <min-btn type="white" class="btn1">清台</min-btn>
      <min-btn type="white" class="btn1">账单</min-btn>
      <min-btn type="white" class="btn1">订单</min-btn>
      <min-btn type="white" class="btn1">存酒</min-btn>
      <min-btn type="white" class="btn1" @click="goGetHistory">历史</min-btn>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    id: Number
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    goGetHistory () {
      this.$minRouter.push({
        name: 'platform-history',
        params: { id: this.id }
      })
    },
    // 预约
    book () {
      this.$minRouter.push({
        name: 'order-make',
        params: { id: this.id }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
