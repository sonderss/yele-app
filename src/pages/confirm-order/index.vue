<template>
  <view class="confirm-order">
    <view class="p-top-20 p-lr-30" style="padding-bottom: 66rpx;">
      <view class="platform-info f28 p-lr-20 p-tb-20">
        <view>台位抵消：￥1000</view>
        <view>开台条件：<text class="emp">6成低消 (￥600 )</text></view>
        <view>达成状态：未达成开台条件</view>
      </view>
      <view class="goods-wrap m-top-20 p-lr-20">
        <view class="p-tb-30 min-border-bottom">商品</view>
        <view class="goods-list p-top-10">
          <view class="p-tb-20" v-for="index in 3" :key="index">
            <min-goods-item
              name="2020年元旦百威兄弟套餐12瓶2020"
              price="2380.00"
              icon="/static/images/goods.png"
              specification="罐装*250ml*规格9/瓶"
              :value="3"
            >
            </min-goods-item>
          </view>
        </view>
      </view>
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
    </view>
    <min-goods-submit leftText="已选" totalAmount="666.00" buttonText="申请开台"/>
  </view>
</template>

<script>
export default {
  name: 'confirm-order',
  data () {
    return {
      payType: '1'
    }
  }
}
</script>

<style lang="scss" scoped>
.confirm-order{
  padding-bottom: 120rpx;
  .platform-info{
    border-radius:10px;
    background:#ffe4e4;
    .emp{
      color: #FF0000;
      font-weight: bold;
    }
  }
  .goods-wrap{
    background: #fff;
    margin-bottom: 10rpx;
    .count{
      float: right;
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
}
</style>
