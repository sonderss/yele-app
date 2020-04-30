<template>
  <view class="order-detail p-tb-20 p-lr-30">
    <view class="goods-wrap m-top-20 p-lr-20">
      <view class="p-tb-30 min-border-bottom">
        商品
        <view :class="`${$minCommon.getOrderStatus(list.order_status).color }  status`   ">{{$minCommon.getOrderStatus(list.order_status).desc}}</view>
      </view>
      <view class="goods-list p-top-10">
        <view class="p-tb-20" v-for="item in list.order_product_list" :key="item.id">
          <!--已出品-->
          <min-goods-item

            :name="item.product_name"
            :price="item.total"
            :icon="item.product_img"
            :specification="item.sku"
            :value="item.quantity"
          >
          </min-goods-item>
        </view>

      </view>
    </view>
    <view class="card p-lr-20 m-top-20">
      <view class="top p-tb-20 min-border-bottom">
        <view class="title">原订单信息</view>
        <view class="btn">查看原订单</view>
      </view>
      <view class="main p-tb-30">
        <view class="item">原订单号：2019346746842</view>
        <view class="item">订单金额：￥159332.00</view>
        <view class="item">已付金额：￥159332.00</view>
      </view>
    </view>
    <view class="card p-lr-20 m-top-20">
      <view class="top p-tb-30 min-border-bottom">订单信息</view>
      <view class="main p-tb-30">
        <view class="item">订 单 号 ：{{list.order_sn}}</view>
        <view class="item">订单类型：{{list.pay_type === 0 ? '先付' :'后付'}}</view>
        <view class="item">下单人员：{{list.confirm_user_name}}</view>
        <view class="item">下单时间：{{list.create_time}}</view>
        <view class="item">订单金额：￥{{list.order_price}}</view>
        <view class="item">已付金额：￥{{list.pay_price}}</view>
        <view class="item">支付状态：<text :class="$minCommon.getOrderStatus(list.order_status).color">{{ list.pay_status === 0 ?'未付清' : '已付清'}}</text></view>
      </view>
    </view>
    <view class="card p-lr-20 m-top-20" v-if="list.is_signoff === 1">
      <view class="top p-tb-30 min-border-bottom">签折信息</view>
      <view class="main p-tb-30">
        <view class="item">签折方式：{{type[list.order_status]}}</view>
        <view class="item">优惠内容：-----</view>
        <view class="item">优惠金额：￥{{list.discount_price}}</view>
        <view class="item">签折人员：{{list.signoff_user_name}}</view>
      </view>
    </view>
    <view class="card p-lr-20 m-top-20">
      <view class="top p-tb-30 min-border-bottom">客户信息</view>
      <view class="main p-tb-30">
        <view class="item">客户姓名：{{list.client_name}}</view>
        <view class="item">联系电话：{{list.client_mobile}}</view>
      </view>
    </view>
    <view class="card p-lr-20 m-top-20">
      <view class="top p-tb-30 min-border-bottom">台位信息</view>
      <view class="main p-tb-30">
        <view class="item">台&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：{{list.desk_name}}</view>
        <view class="item">分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;组：{{list.desk_group}}</view>
        <view class="item">低&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消：￥{{list.desk_minimum_consume}}</view>
        <view class="item">座&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：{{list.desk_seats }}</view>
      </view>
    </view>
    <min-goods-submit
      @leftClick="leftClick"
      :leftText="leftText"
      @submit="submit"
      :totalAmount="totalAmount"
      :buttonText="buttonText"
      v-if="showSubmit"
    />
     <min-modal ref="show"></min-modal>
      <!-- 支付弹窗 -->
      <min-popup :show='showPayPop' @close="closePayPop" heightSize='500'>
        <view class="p-lr-30">
            <view class="top_view min-border-bottom" >
              <view class="f26">本次支付</view>
              <view class="money">￥{{list.unpay_price}}</view>
            </view>
            <view class="pays m-top-30">
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
           <view class="btn_pay" @click="pay_money">支付</view>
        </view>
      </min-popup>
  </view>
</template>

<script>
// 签折类型（0：全单打折，1：全单优惠，2：单品打折，3：单品优惠）
const type = [
  '全单打折',
  '全单优惠',
  '单品打折',
  '单品优惠'
]
export default {
  name: 'order-detail',
  navigate: ['navigateTo'],
  data () {
    return {
      leftText: '',
      totalAmount: '',
      buttonText: '',
      list: {},
      type,
      showPayPop: false,
      payType: '0',
      showSubmit: false
    }
  },
  onLoad () {
    console.log(this.$parseURL())
    this.$minApi.getOrderDetailDown({
      order_id: this.$parseURL().ordr_id
    }).then(res => {
      console.log(res)
      this.list = res
      if (this.list.order_status === 0) {
        this.leftText = '取消订单'
        this.buttonText = '去支付'
        this.totalAmount = this.list.unpay_price
        this.showSubmit = true
      } else if (this.list.order_status === -1) {
        this.leftText = '应付'
        this.buttonText = '补差价'
        this.totalAmount = this.list.unpay_price
        this.showSubmit = true
      }
    })
  },
  methods: {
    leftClick () {
      if (this.list.order_status !== 0) return false
      // 取消订单
      this.$refs.show.handleShow({
        title: '',
        content: '是否取消该订单?',
        contentCenter: true,
        cancelText: '否',
        confirmText: '是',
        confirmColor: 'red',
        cancelColor: '#0090ff',
        success: (e) => {
          if (e.id === 1) {
            this.$minApi.cancelOrder({
              order_id: this.list.id
            }).then(res => {
              console.log(res)
              if (res.length === 0) {
                this.$showToast('取消成功!')
                setTimeout(() => {
                  this.$minRouter.push({
                    name: 'order-detail',
                    params: { ordr_id: this.list.id }
                  })
                }, 2000)
              }
            })
          }
        }
      })
    },
    // 弹窗
    pay_money () {
      this.$minApi.confirmOrder({
        order_id: this.list.id,
        desk_id: '',
        pay_type: this.$minCommon.getPayMethod(this.payType)
      }).then(res => {
        console.log(res)
      })
    },
    // 支付弹窗
    submit () {
      this.showPayPop = true
    },
    closePayPop () {
      this.showPayPop = false
    },
    goodsDeatil (index) {
      // 跳到商品详情页
      this.$minRouter.push({
        name: 'product-details'
      })
    }
  }
}

</script>

<style lang="scss" scoped>
.order-detail{
  .goods-wrap{
    background: #fff;
    .status{
      float: right;
      &.cancel,&.return{
        color: #333333;
      }
      &.not-produce{
        color: #0090FF;
      }
    }
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
      .title{
        line-height: 60rpx;
      }
      .btn{
        background-color: #FFE000;
        padding: 10rpx 15rpx;
        border-radius: 10rpx;
      }
    }
    .main{
      .item{
        margin-top: 10rpx;
        &:first-child{
          margin: 0;
        }
      }
    }
  }
  .fcolor{
    color: #333333
  }
  .tcolor{
    color: #666666
  }
  .red{
    color: #FF0000
  }
  .green{
    color: #39BA01
  }
  .blue{
    color: #0090FF
  }
  .origin{
    color: #F7601B
  }
  .top_view{
    height: 83rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .money{
      font-weight: bold;
      font-size: 30rpx;
      color: #FF0000;
    }
  }
  .pays{
      display: flex;
      flex-wrap: column;
      flex-wrap: wrap;
      align-content: space-between;
      .pay{
        width: 50%;
      }
  }
  .btn_pay{
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    height:98rpx;
    background:rgba(255,224,1,1);
    line-height: 98rpx;
    text-align: center;
  }
}
</style>
