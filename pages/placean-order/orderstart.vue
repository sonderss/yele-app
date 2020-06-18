<template>
  <view class="giveawayorder p-top-20 p-lr-30">
      <view class="goods-wrap m-top-20 p-lr-20">
        <view class="p-tb-30 min-border-bottom">商品</view>
        <view class="goods-list p-top-10">
          <view class="p-tb-20" v-for="item in list.order_product_list" :key="item.commodity_id">
            <min-goods-item
              :name="item.product_name"
              :price="item.order_price"
              :icon="item.product_img"
              :specification="item.unit_name"
              :value="item.quantity"
            >
            </min-goods-item>
          </view>
        </view>
      </view>

      <view class="card p-lr-20 m-tb-20 p-bottom-20"  >
        <view class="top p-tb-30 min-border-bottom">
          <view>客户信息</view>
          <!-- <view :class="item.product_count === 1 ? 'status confirmed':'status end'">{{list.product_count === 1 ? '待确认': '已取酒'}}</view> -->
        </view>
        <view class="main p-top-20">
          <view class="item">客户姓名：{{list.order_info.client_name }}</view>
          <view class="item">客户手机号：{{list.order_info.client_mobile}}</view>

        </view>
      <!-- <view class="timer min-top-border">{{item.create_time}}</view> -->
      </view>

      <view class="card p-lr-20 m-tb-20 p-bottom-20"  >
        <view class="top p-tb-30 min-border-bottom">
          <view>台位信息</view>
          <!-- <view :class="item.product_count === 1 ? 'status confirmed':'status end'">{{list.product_count === 1 ? '待确认': '已取酒'}}</view> -->
        </view>
        <view class="main p-top-20">
          <view class="item">台号：￥{{list.order_info.desk_name}}</view>
          <view class="item">低消：￥{{list.order_info.minim_charge}}</view>
          <view class="item">当前账单金额：￥{{list.order_info.order_total}}</view>
        </view>
      </view>
      <view style="height:100rpx"></view>
      <min-goods-submit
     leftText="合计"
      :totalAmount='list.order_info.order_total'
     buttonText='确定订单'
     @submit='submit'
     ></min-goods-submit>
    <min-modal ref="test"></min-modal >
  </view>
</template>
<script>
export default {
  name: 'orderstart',
  navigate: ['navigateTo'],
  data () {
    return {
      order_id: '',
      desk_id: '',
      open_status: '',
      list: { order_info: { client_name: '' } },
      params: {}
    }
  },
  onLoad (option) {
    console.log(option)
    this.order_id = option.order_id
    this.desk_id = option.desk_id
    this.open_status = option.open_status
    this.params = option
  },
  methods: {
    // postOrderGet
    submit () {
      // 跳转支付订单页
      this.$minRouter.push({
        name: 'redpay-order',
        type:"redirectTo",
        params: { data: this.params }
      })
    }
  },
  onNavigationBarButtonTap (e) {
    this.$refs.test.handleShow({
      title: e.text,
      content: this.content,
      showCancel: false,
      success: (e) => {
        console.log(e) // 这里拿到的是modalID: "modal"，id: 1
      }
    })
  },
  mounted () {
    console.log('已开台231213232112')
    this.$minApi.previewOrder({ order_id: this.order_id, desk_id: this.desk_id, open_status: this.open_status }).then(res => {
      console.log(res)
      this.list = res
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
.goods-wrap{
    background: #fff;
    margin-bottom: 10rpx;
    .count{
      float: right;
    }
}
.card{
    background: #fff;
    border-radius: 10rpx;
    .top{
      display: flex;
      justify-content: space-between;
    }
    .main{
      .item{
        margin-top: 20rpx;
        font-size: 28rpx;
        &:first-child{
          margin: 0;
        }
      }
    }

    .timer{
      width: 100%;
      height: 76rpx;
      line-height: 76rpx;
      font-size: 24rpx;
      color: #666666
    }
  }
</style>
