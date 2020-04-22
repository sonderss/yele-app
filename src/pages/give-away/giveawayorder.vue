<template>
  <view class="giveawayorder p-top-20 p-lr-30">
      <view class="goods-wrap m-top-20 p-lr-20">
        <view class="p-tb-30 min-border-bottom">商品</view>
        <view class="goods-list p-top-10">
          <view class="p-tb-20" v-for="item in list.order_product" :key="item.commodity_id">
            <min-goods-item
              :name="item.commodity_name"
              :price="item.commodity_price"
              :icon="item.commodity_img"
              :specification="item.commodity_detail_name"
              :value="item.commodity_quantity"
            >
            </min-goods-item>
          </view>
        </view>
      </view>

      <view class="card p-lr-20 m-tb-20 p-bottom-20"  >
        <view class="top p-tb-30 min-border-bottom">
          <view>订单信息</view>
          <!-- <view :class="item.product_count === 1 ? 'status confirmed':'status end'">{{list.product_count === 1 ? '待确认': '已取酒'}}</view> -->
        </view>
        <view class="main p-top-20">
          <view class="item">台号：{{list.order_info.desk_name}}</view>
          <view class="item">低消：{{list.order_info.minim_charge}}</view>
          <view class="item">账单金额：￥{{list.order_info.bill_price}}</view>
          <view class="item">客户姓名：{{list.order_info.client_name}}</view>
          <view class="item">联系方式：{{list.order_info.client_mobile}}</view>
          <view class="item">订单号：{{list.order_info.order_sn}}</view>
          <view class="item">开台时间：{{list.order_info.create_time}}</view>

        </view>
      <!-- <view class="timer min-top-border">{{item.create_time}}</view> -->
      </view>

      <view class="card p-lr-20 m-tb-20 p-bottom-20"  >
        <view class="top p-tb-30 min-border-bottom">
          <view>赠送额度</view>
          <!-- <view :class="item.product_count === 1 ? 'status confirmed':'status end'">{{list.product_count === 1 ? '待确认': '已取酒'}}</view> -->
        </view>
        <view class="main p-top-20">
          <view class="item">可用额度：￥{{list.presentation_quota.available_credit}}</view>
          <view class="item">本次使用：￥{{list.presentation_quota.used_credit}}</view>
          <view class="item">剩余额度：￥{{list.presentation_quota.remaining_credit}}</view>
        </view>
      </view>
      <view style="height:100rpx"></view>
      <min-goods-submit
     leftText="应付赠送额度"
      :totalAmount='list.payable_credit'
     buttonText='确定赠送'
     @submit='submit'
     ></min-goods-submit>
    <min-modal ref="test"></min-modal >
  </view>
</template>
<script>
export default {
  name: 'giveawayorder',
  navigate: ['navigateTo'],
  data () {
    return {
      order_id: '',
      content: '',
      list: { order_info: { desk_name: '' }, presentation_quota: { available_credit: '' } }
    }
  },
  onLoad (option) {
    // console.log(option)
    this.order_id = option.order_id
    // console.log(this.$store.state.goods.giveAwayInfo)
    const res = this.$store.state.goods.giveAwayInfo
    this.content = `
          1. 当前台消费金额￥${res.consumption_amount}，根据赠送方案，可赠送的商品金额为￥${res.presentation_limit}。<br />
          2. 当前用户的赠送额度为￥${res.personal_remaining_quota}，不能超过此额度。<br />
      `
  },
  methods: {
    // postOrderGet
    submit () {
      console.log(this.order_id)
      this.$minApi.postOrderGet({ order_id: this.order_id }).then(res => {
        console.log(2131312321)
        if (res.length === 0) {
          this.$showToast('赠送成功')
          setTimeout(() => {
            this.$minRouter.push({
              name: 'platform-admin'
            })
          }, 2000)
        }
        // eslint-disable-next-line handle-callback-err
      }).catch(err => {
        setTimeout(() => {
          this.$minRouter.push({
            name: 'platform-admin'
          })
        }, 2000)
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
    this.$minApi.gerOrderList({ order_id: this.order_id }).then(res => {
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
