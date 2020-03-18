<template>
  <view class="bill-settlement  p-tb-20 p-lr-30">
     <min-cell :card="false">
          <view class="f30 p-tb-25">
             <text>订单信息</text>
          </view>
         <view class="min-border-bottom m-bottom-30" style="height:1rpx"></view>
         <view class="main min-flex min-flex-dir-top min-flex-align-top f28 p-bottom-10">
            <view  class=" m-bottom-20" style="width:100%;display: flex;justify-content: space-between;">
                <text class="f28">订 单 号 ：65798254864346</text>
                <text class="f26">￥600.00 </text>
            </view>
            <view  class="m-bottom-20" style="width:100%;display: flex;justify-content: space-between;">
                <text class="f28">订 单 号 ：65798254864346</text>
                <text class="f26">￥600.00 </text>
            </view>
            <view  class="m-bottom-20" style="width:100%;display: flex;justify-content: space-between;">
                <text class="f28">订 单 号 ：65798254864346</text>
                <text class="f26">￥600.00 </text>
            </view>
            <view class="min-border-bottom" style="height:1rpx"></view>
            <view class="order min-border-top">合计：<text>￥25500</text></view>
          </view>
      </min-cell>
       <view class="pay-wrap m-top-20 p-lr-20 p-tb-20">
        <view class="p-bottom-30 min-border-bottom">支付信息</view>
        <view class="m-top-30 pays">
          <view class="pay">
            <min-radio title="支付宝" icon="/static/images/alipay-pay.png" label="0" v-model="payType"/>
          </view>
          <view class="pay">
            <min-radio title="现金" icon="/static/images/cash-pay.png" label="3" v-model="payType"/>
          </view>
          <view class="pay">
            <min-radio title="微信" icon="/static/images/wx-pay.png" label="1" v-model="payType"/>
          </view>
        </view>
      </view>
       <min-goods-submit leftText="应付" totalAmount="666.00" buttonText="支付"/>
  </view>
</template>
<script>
export default {
  data () {
    return {
      payType: '1'
    }
  }
}
</script>
<style lang="scss" scoped>
.order{
  height: 87rpx;
  width: 100%;
  text-align: right;
  line-height: 87rpx;
  color: #FF0000;
  text{
    font-weight: bold;
    color: #FF0000;
  }
}
.pay-wrap{
    background: #fff;
    border-radius:10rpx;
    .pays{
      display: flex;
      flex-wrap: column;
      flex-wrap: wrap;
      align-content: space-between;
      .pay{
        width: 50%;
      }
    }
  }
</style>
