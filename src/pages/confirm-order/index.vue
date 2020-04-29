<template>
  <view class="confirm-order">
    <view class="p-top-20 p-lr-30" style="padding-bottom: 66rpx;">
      <view class="platform-info f28 p-lr-20 p-tb-20">
        <view>台位抵消：￥{{list.order_info.minim_charge}}</view>
        <view>开台条件：<text class="emp">{{list.order_info.minimum_percent}}成低消 {{`(${list.order_info.desk_open_minimum})`}}</text></view>
        <view>订单金额：￥{{list.order_info.order_price}}</view>
        <view>达成状态：{{list.order_info.is_can_open === 0 ? "未达成开台条件":"达成开台条件"}}</view>
      </view>
      <view class="goods-wrap m-top-20 p-lr-20">
        <view class="p-tb-30 min-border-bottom">商品</view>
        <view class="goods-list p-top-10">
          <view class="p-tb-20" v-for="item in list.order_product_list" :key="item.id">
            <min-goods-item
              :name="item.product_name"
              :price="item.unit_price"
              :icon="item.oproduct_img"
              :specification="item.sku"
              :value="item.quantity"
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
           <view class="pay">
            <min-radio title="刷卡" icon="/static/images/card-pay.png" label="2" v-model="payType"/>
          </view>
          <view class="pay">
            <min-radio title="后付款" icon="/static/images/later-pay.png" label="4" v-model="payType"/>
          </view>
        </view>
      </view>
    </view>
    <min-goods-submit  @submit="submit" :leftText="'￥'+totalAmount"  leftTextDesc="应付：" leftTextColor="red" leftTextWidth='350rpx'  :buttonText="buttonText"/>
  </view>
</template>

<script>
export default {
  name: 'confirm-order',
  navigate: ['navigateTo'],
  data () {
    return {
      payType: '0',
      list: { order_info: { minim_charge: '' } },
      buttonText: '',
      totalAmount: '',
      payMethod: 'alipay_scan_code'
    }
  },
  watch: {
    payType (a) {
      if (a === '0') {
        this.payMethod = 'alipay_scan_code'
      } else if (a === '3') {
        // cash
        this.payMethod = 'cash'
      } else if (a === '1') {
        // wechat_scan_code
        this.payMethod = 'wechat_scan_code'
      } else if (a === '2') {
        // credit_card
        this.payMethod = 'credit_card'
      } else if (a === '4') {
        // postpay
        this.payMethod = 'postpay'
      }
    }
  },
  methods: {
    submit () {
      console.log(this.payMethod)
      if (this.list.order_info.is_can_open === 1) {
        this.$minApi.confirmOrder({
          order_id: this.$parseURL().order_id,
          pay_type: this.payMethod,
          desk_id: this.$parseURL().desk_id
        }).then(res => {
          console.log(res)
          if (res.length === 0) {
            this.$showToast('开台成功！！！')
            this.$store.dispatch('goods/setOrderSelArr', [])
            setTimeout(() => {
              this.$minRouter.push({
                name: 'open-success',
                params: {
                  client_mobile: this.list.order_info.client_mobile,
                  client_name: this.list.order_info.client_name,
                  desk_id: this.list.order_info.desk_id,
                  desk_name: this.list.order_info.desk_name
                }
              })
            }, 2000)
          }
        })
      } else {
        // 申请开台
        console.log(this.$parseURL())
        this.$minRouter.push({
          name: 'apply-open',
          params: { desk_id: this.$parseURL().desk_id, order_id: this.$parseURL().order_id, open_status: 0 }
        })
      }
    }
  },
  mounted () {
    console.log('订单ID', this.$parseURL())
    this.$minApi.previewOrder({
      order_id: this.$parseURL().order_id,
      desk_id: this.$parseURL().desk_id,
      open_status: this.$parseURL().open_status
    }).then(res => {
      this.list = res
      this.totalAmount = this.list.order_info.payable_price
      if (this.list.order_info.is_can_open === 1) {
        this.buttonText = '支付并开台'
      } else {
        this.buttonText = '申请开台'
      }
      console.log(this.list)
      // eslint-disable-next-line handle-callback-err
    }).catch(err => {
      setTimeout(() => {
        this.$minRouter.push({
          name: 'platform-admin'
        })
      }, 2000)
    })
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
