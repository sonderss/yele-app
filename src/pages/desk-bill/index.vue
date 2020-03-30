<template>
  <view class="desk-bill  p-tb-20 p-lr-30">
     <min-cell :card="false">
          <view class="f30 p-tb-25 top-view">
             <text>账单汇总</text>
             <text :class=" data.pay_status === 0 ? 'top-view status'  : 'top-view  status-al' ">{{data.pay_status === 0 ? "未结清":"已结清"}}</text>
          </view>
          <view class="min-border-bottom" style="height:1rpx"></view>
          <view class=" min-flex min-flex-dir-top min-flex-align-top f28 p-bottom-10">
            <text class="m-bottom-10 m-top-20  f28">订单金额：￥{{data.bill_price}}</text>
            <text class="m-bottom-10  f28">优惠合计：￥{{data.discount_price}}</text>
            <text class="m-bottom-10  f28">应付金额：￥{{data.receivable_price}}</text>
            <text class="m-bottom-10  f28">已付金额：￥{{data.pay_price}}</text>
            <text class="m-bottom-10  f28">待付金额：￥{{data.unpay_price}}</text>
          </view>
      </min-cell>
      <view class="mid-view p-lr-20">
        <text class="m" @click="changeMenu(index)" :class="menuIndex === index ?  'active' : ''" v-for="(item,index) in title" :key="index">{{item}}</text>
      </view>
      <min-cell :card="false" class="m-top-20">
          <view class="f30  top-view1">
             <view class="left-view">
                <text>未结订单</text>
                <text class="status f26">待付金额：￥666298.00</text>
             </view>
             <text class="btn f26">结算</text>
          </view>
          <view class="min-border-bottom" style="height:1rpx"></view>
          <view class="main min-flex min-flex-dir-top min-flex-align-top f28 p-bottom-10">
            <view  class="m-bottom-10 m-top-20" style="width:100%;display: flex;justify-content: space-between;">
                <text class="f28">订 单 号 ：65798254864346</text>
                <text class="f26">订单详情>> </text>
            </view>
            <text class="m-bottom-10 f28">订单金额：￥56463.00</text>
            <text class="m-bottom-10 f28">应付金额：￥159332.00</text>
            <text class="m-bottom-10 f28">待付金额：￥159332.00</text>
          </view>
          <view class="min-border-bottom" style="height:1rpx"></view>
          <view class="main min-flex min-flex-dir-top min-flex-align-top f28 p-bottom-10">
             <view  class="m-bottom-10 m-top-20" style="width:100%;display: flex;justify-content: space-between;">
                <text class="f28">订 单 号 ：65798254864346</text>
                <text class="f26">订单详情>> </text>
            </view>
            <text class="m-bottom-10  f28">订单金额：￥56463.00</text>
            <text class="m-bottom-10  f28">应付金额：￥159332.00</text>
            <text class="m-bottom-10  f28">待付金额：￥159332.00</text>
          </view>
      </min-cell>
       <min-cell :card="false" class="m-top-20">
          <view class="f30  top-view1">
             <view class="left-view">
                <text>已结订单</text>
                <text class="status-al f26">合计：￥666298.00</text>
             </view>
             <!-- <text class="btn f26">结算</text> -->
          </view>
          <view class="min-border-bottom" style="height:1rpx"></view>
          <view class="main min-flex min-flex-dir-top min-flex-align-top f28 p-bottom-10">
            <view  class="m-bottom-10 m-top-20" style="width:100%;display: flex;justify-content: space-between;">
                <text class="f28">订 单 号 ：65798254864346</text>
                <text class="f26">订单详情>> </text>
            </view>
            <text class="m-bottom-10  f28">订单金额：￥56463.00</text>
            <text class="m-bottom-10  f28">应付金额：￥159332.00</text>
            <text class="m-bottom-10  f28">已付金额：￥159332.00</text>
            <!-- <text class="m-bottom-10">待付金额：￥159332.00</text> -->
          </view>

      </min-cell>
  </view>
</template>

<script>
export default {
  name: 'desk-bill',
  navigate: ['navigateTo'],
  data () {
    return {
      title: ['门店订单', '平台订单'],
      menuIndex: 0,
      data: {}
    }
  },
  methods: {
    changeMenu (n) {
      this.menuIndex = n
    }
  },
  onLoad () {
    this.$minApi.billAllin({
      opening_id: 4,
      desk_id: 12
    }).then(res => {
      this.data = res
      console.log(this.data)
    })
  }
}
</script>

<style lang="scss" scoped>
.top-view{
  display: flex;
  justify-content: space-between;
  &.status{
    color: #FF0000;
  }
  &.status-al{
    color: #666666;
  }
}
.mid-view{
  width: 100%;
  height: 80rpx;
  text{
    font-size: 36rpx;
    font-weight:bold;
    color:#666666;
    line-height:80rpx;
    height: 80rpx;
    display: block;
    float: left;
  }
  .m{
    margin-right: 77rpx;
  }
  .active{
    color: #333333;
    position: relative;
  }
  .active::after{
      content: '';
      width: 80rpx;
      height: 6rpx;
      background: #FFE001;
      position: absolute;
      bottom: 0;
      left: 15%;
  }
}
.top-view1{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100rpx;
  .status{
    color: #FF0000;
  }
  .status-al{
    color: #666666;
  }
  .btn{
    width:108rpx;
    height:48rpx;
    background:rgba(255,224,1,1);
    border-radius:10rpx;
    text-align: center;
    line-height: 48rpx;
  }
  .left-view{
    display: flex;
    flex-direction: column;
  }

}

</style>
